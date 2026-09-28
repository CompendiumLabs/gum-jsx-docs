import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Element, Evaluator, layout_element, render_element, render_svg } from '@gum-jsx/core'
import * as math from '@gum-jsx/math'
import * as maps from '@gum-jsx/maps'
import type { BenchmarkSetup } from './runner'

const directory = fileURLToPath(new URL('../../demos/', import.meta.url))
// Discover paths only here; --list never reads or evaluates demo source.
const files = [...new Bun.Glob('**/*.jsx').scanSync({ cwd: directory })].sort()
assert.ok(files.length, 'No JSX demos found')

export const cases: Record<string, BenchmarkSetup> = {}

for (const file of files) {
  const name = file.replace(/\.jsx$/, '')
  const prepare = () => {
    const source = readFileSync(`${directory}/${file}`, 'utf8')
    const evaluator = new Evaluator({ scope: { ...math, ...maps } })
    const evaluate = (): Element => {
      const element = evaluator.evaluate(source, { name: file })
      if (!(element instanceof Element)) throw new Error(`${file}: expected an element`)
      return element
    }
    return { evaluate }
  }

  cases[`demos/evaluate/${name}`] = () => {
    const { evaluate } = prepare()
    evaluate()
    return evaluate
  }
  cases[`demos/layout/${name}`] = () => {
    const { evaluate } = prepare(), element = evaluate(), fonts = math.createMathFonts()
    layout_element(element, { fonts })
    // Every operation creates a new pass; the source tree and font provider are reused.
    return () => layout_element(element, { fonts }).fragment
  }
  cases[`demos/svg/${name}`] = () => {
    const { evaluate } = prepare(), fonts = math.createMathFonts()
    const { fragment, svg } = render_element(evaluate(), { fonts })
    assert.ok(svg.startsWith('<svg ') && fragment.size.width > 0 && fragment.size.height > 0)
    assert.ok(!/NaN|Infinity/.test(svg), `${file}: nonfinite geometry`)
    return () => render_svg(fragment)
  }
  cases[`demos/render/${name}`] = () => {
    const { evaluate } = prepare(), fonts = math.createMathFonts()
    render_element(evaluate(), { fonts })
    return () => render_element(evaluate(), { fonts })
  }
}
