import { afterAll, expect, test } from 'bun:test'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { delimiter, dirname, join } from 'node:path'
import * as core from '@gum-jsx/core'
import * as math from '@gum-jsx/math'
import { buildSkillFiles, getElements, getGuides, getGallery, packageRoot, promptDir } from '../src'

const scratch = mkdtempSync(join(tmpdir(), 'gum-jsx-skill-test-'))
afterAll(() => rmSync(scratch, { recursive: true, force: true }))
const files = buildSkillFiles()
const cliPrompt = readFileSync(join(promptDir, 'cli.md'), 'utf8')
// The CLI guide's first JSX block is a declaration-only shared prelude; the
// second is a slide that consumes it. Exercise them together as documented.
const deckExamples = [...cliPrompt.matchAll(/^```jsx\n([\s\S]*?)^```/gm)].map(match => match[1])
const [deckPrelude, deckSlide] = deckExamples
const deckManifest = JSON.parse(/^```json\n([\s\S]*?)^```/m.exec(cliPrompt)![1])

function links(markdown: string): string[] {
  const prose = markdown.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '')
  return [...prose.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)].map(match => match[1])
}

test('the skill includes every element, guide, and gallery page exactly once with unmodified JSX', () => {
  const elements = getElements(), guides = getGuides(), gallery = getGallery()
  expect(files.size).toBe(4 + guides.tags.length
    + Object.keys(elements.cats).length + Object.keys(gallery.cats).length)
  expect(files.size).toBeLessThanOrEqual(200)
  for (const [kind, collection] of [['elements', elements], ['guides', guides], ['gallery', gallery]] as const) {
    const index = files.get(`references/${kind}.md`)
    expect(index).toBeDefined()
    for (const name of collection.tags) {
      const category = kind === 'guides' ? name
        : Object.entries(collection.cats).find(([, names]) => names.includes(name))![0]
      const page = files.get(`references/${kind}/${category}.md`)
      expect(page).toBeDefined()
      expect(page).toContain('```jsx\n' + collection.code[name] + '\n```')
      expect(page).not.toContain('*Category*:')
      expect(page).not.toContain('description:')
      expect(index).toContain(` — ${collection.descriptions[name]}`)
      if (kind !== 'guides') {
        expect(page).toContain(`<a id="${name}"></a>`)
        expect(page).toContain(`<a id="${name}-example"></a>`)
        expect(page!.split(`<a id="${name}"></a>`)).toHaveLength(2)
      }
    }
  }
  expect(files.has('references/elements/special.md')).toBe(true)
  expect(files.has('references/guides/sizing.md')).toBe(true)
  expect(files.has('references/gallery/math.md')).toBe(true)
  expect(files.has('references/gallery/maps.md')).toBe(true)
})

test('all packaged references are reachable from SKILL.md without leaving the skill', () => {
  const visited = new Set<string>()
  const pending = ['SKILL.md']
  while (pending.length) {
    const file = pending.pop()!
    if (visited.has(file)) continue
    visited.add(file)
    const markdown = files.get(file)
    expect(markdown).toBeDefined()
    for (const target of links(markdown!)) {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target)) continue
      const [path, anchor] = target.split('#')
      const destination = path ? join(dirname(file), decodeURIComponent(path)) : file
      expect(files.has(destination)).toBe(true)
      if (anchor && destination.startsWith('references/guides/')) {
        expect(files.get(destination)!.toLowerCase()).toContain(`## ${anchor.replace(/-/g, ' ')}`)
      } else if (anchor) {
        expect(files.get(destination)).toContain(`id="${anchor}"`)
      }
      pending.push(destination)
    }
  }
  expect([...visited].sort()).toEqual([...files.keys()].sort())
  // Former links into gala/code now lead to the source embedded in each page.
  expect(links(files.get('references/gallery/networks.md')!)).toContain('networks.md#transformer-example')
  expect(links(files.get('references/guides/cli.md')!)).toContain(
    'https://github.com/CompendiumLabs/gum-jsx-pdf/blob/master/README.md')
})

test('every complete JSX example in the maintained prompts renders with the current API', () => {
  const fonts = math.createMathFonts()
  const pass = new core.LayoutPass({ fonts: { value: fonts, version: fonts.version } })
  const canvas = { width: 640, height: 480 }
  let examples = 0
  for (const file of readdirSync(promptDir).filter(file => file.endsWith('.md'))) {
    const markdown = readFileSync(join(promptDir, file), 'utf8')
    let scope: Record<string, unknown> = { ...math }
    for (const match of markdown.matchAll(/^```jsx\n([\s\S]*?)^```/gm)) {
      if (file === 'cli.md' && match[1] === deckPrelude) {
        expect(deckExamples).toHaveLength(2)
        const prelude = core.evaluate_prelude(match[1], { name: 'prelude.jsx', scope })
        expect(typeof prelude.Card).toBe('function')
        scope = { ...scope, ...prelude }
        continue
      }
      const element = core.evaluate(match[1], { name: `${file}:${examples}`, scope })
      expect(element).toBeInstanceOf(core.Element)
      const fragment = pass.layout(core.make_viewport(element), core.make_request({
        width: core.available(canvas.width), height: core.available(canvas.height),
      }))
      expect(fragment.size.width).toBeGreaterThan(0)
      expect(fragment.size.height).toBeGreaterThan(0)
      const svg = core.render_svg(fragment)
      expect(svg).toStartWith('<svg ')
      expect(svg).not.toMatch(/NaN|Infinity/)
      expect(svg).toMatch(/<(?:path|rect|ellipse)\b/)
      examples++
    }
  }
  expect(examples).toBeGreaterThan(0)
})

test('documented gum commands render files from outside the workspace', () => {
  const output = join(scratch, 'global commands')
  mkdirSync(output)
  const intro = readFileSync(join(promptDir, 'intro.md'), 'utf8')
  const source = /^```jsx\n([\s\S]*?)^```/m.exec(intro)![1]
  writeFileSync(join(output, 'figure.jsx'), source)
  const slides = join(output, 'slides')
  mkdirSync(slides)
  writeFileSync(join(slides, 'index.json'), JSON.stringify(deckManifest))
  writeFileSync(join(slides, deckManifest.prelude), deckPrelude)
  for (const file of deckManifest.slides) {
    writeFileSync(join(slides, file), deckSlide)
  }
  // Setup is documented separately; tests use installed workspace executables.
  const commands = [...cliPrompt.matchAll(/^```sh\n([\s\S]*?)^```/gm)]
    .map(match => match[1]).filter(code => !code.includes('bun install'))
  expect(commands.length).toBeGreaterThan(0)
  // Use the workspace's installed executables without changing the user's
  // global installation. The documented commands run with only PATH setup.
  const result = spawnSync('sh', ['-eu', '-c', commands.join('\n')], {
    cwd: output, encoding: 'utf8', env: { ...process.env,
      PATH: [join(packageRoot, '../node_modules/.bin'), dirname(process.execPath), process.env.PATH]
        .filter(Boolean).join(delimiter) },
  })
  expect(result.status, result.stderr).toBe(0)
  expect(readFileSync(join(output, 'figure.svg'), 'utf8')).toStartWith('<svg ')
  expect([...readFileSync(join(output, 'figure.png')).subarray(0, 8)])
    .toEqual([137, 80, 78, 71, 13, 10, 26, 10])
  const fragment = JSON.parse(readFileSync(join(output, 'figure.json'), 'utf8'))
  expect(fragment.size.width).toBeGreaterThan(0)
  expect(fragment.size.height).toBeGreaterThan(0)
  const stats = result.stderr.trim().split('\n').map(line => JSON.parse(line))
  expect(stats).toHaveLength(1)
  for (const entry of stats) expect(entry.layouts).toBeGreaterThan(0)
  for (const file of ['figure.pdf', 'talk.pdf']) {
    expect(readFileSync(join(output, file)).subarray(0, 5).toString()).toBe('%PDF-')
  }
})
