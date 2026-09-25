import { expect, test } from 'bun:test'
import { Evaluator, render_element } from '@gum-jsx/core'
import * as maps from '@gum-jsx/maps'
import { getGallery } from '../src'

const gallery = getGallery()
const examples = gallery.cats.maps
if (!examples?.length) throw new Error('The gallery must include a maps category')

for (const name of examples) {
  test(`maps/${name} renders with only the public plugin exports`, () => {
    const evaluator = new Evaluator({ scope: maps })
    const code = gallery.code[name]
    const result = render_element(evaluator.evaluate(code, { name }))
    expect(result.kind).toBe('svg')
    if (result.kind !== 'svg') return
    expect(result.size.width).toBeGreaterThan(0)
    expect(result.size.height).toBeGreaterThan(0)
    expect(result.svg).toContain('<path ')
    expect(result.svg).not.toMatch(/NaN|Infinity/)
  })
}
