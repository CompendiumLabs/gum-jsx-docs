import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import * as core from 'gum-jsx-core'
import * as math from 'gum-jsx-math'
import { elementsDir, topicsDir, packageRoot, listElements, listTopics,
  getElements, getTopics, prepareElementPage, prepareTopicPage } from '../src'

// A content smoke check, not a separate CLI or layout test suite.
// Only checked-in, trusted JSX is evaluated; evaluate() is not a sandbox.
const elements = getElements()
const topics = getTopics()
const entries = [
  ...listElements().map(entry => ({ ...entry, dir: elementsDir, collection: elements })),
  ...listTopics().map(entry => ({ ...entry, dir: topicsDir, collection: topics })),
]
const commonOnlyElements = new Set(['Spacer', 'Span'])
const bindings = { ...core, ...math }

for (const [name, value] of Object.entries(bindings)) {
  if (name === 'MathElement') continue // Abstract base; documented with custom math sources.
  if (typeof value === 'function' && value.prototype instanceof core.Element) {
    assert.ok(elements.tags.includes(name), `Missing element reference for ${name}`)
  }
}
for (const name of elements.tags) {
  const value = bindings[name as keyof typeof bindings]
  assert.ok(typeof value === 'function' && value.prototype instanceof core.Element,
    `${name} belongs in topics because it is not an Element`)
}
for (const name of topics.tags) {
  const value = bindings[name as keyof typeof bindings]
  assert.ok(!(typeof value === 'function' && value.prototype instanceof core.Element),
    `${name} belongs in elements because it is an Element`)
}

function checkLinks(file: string): void {
  const markdown = readFileSync(file, 'utf8')
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1]!
    if (/^(?:[a-z]+:|#)/i.test(target)) continue
    assert.ok(!target.startsWith('/'), `${file}: use a relative link, not a future viewer route: ${target}`)
    const path = decodeURIComponent(target.split('#')[0]!)
    assert.ok(existsSync(resolve(dirname(file), path)), `${file}: broken link to ${target}`)
  }
}

function checkPropertyValues(file: string, markdown: string): void {
  let table = false
  for (const line of markdown.split('\n')) {
    if (/^\| (?:Property|Direct child prop) \| Default \| Meaning \|$/.test(line)) {
      table = true
      continue
    }
    if (!table) continue
    if (!line.startsWith('|')) { table = false; continue; }
    const value = line.split('|')[2]?.trim() ?? ''
    if (/^-+$/.test(value)) continue
    const prose = value.replace(/`[^`]*`/g, '')
    assert.doesNotMatch(prose, /(?:^|[\s/,])(?:true|false|-?\d+(?:\.\d+)?)(?=$|[\s/,])|\b(?:px|em)\(|"[^"]*"/,
      `${file}: format literal default values as code: ${value}`)
    assert.doesNotMatch(value,
      /`"(?:none|black|white|gray|blue|red|green|yellow|purple|lightgray|darkgray|slate)"`/,
      `${file}: write predefined constants without string quotes: ${value}`)
  }
}

checkLinks(join(packageRoot, 'README.md'))
let drawings = 0
const fonts = math.createMathFonts()
const pass = new core.LayoutPass({ fonts: { value: fonts, version: fonts.version } })
for (const { name, title, dir, collection } of entries) {
  const code = collection.code[name]!
  const text = collection.text[name]!
  const file = join(dir, 'code', name + '.jsx')
  if (dir === elementsDir && !commonOnlyElements.has(name)) {
    const table = text.search(/^\| Property \| Default \| Meaning \|$/m)
    const textFile = join(dir, 'text', name + '.md')
    assert.ok(table >= 0, `${textFile}: element-specific props need a property table`)
    assert.ok(text.slice(0, table).split('\n').length <= 24,
      `${textFile}: put the property table near the top of the page`)
  }
  if (dir === elementsDir) checkPropertyValues(join(dir, 'text', name + '.md'), text)
  assert.ok(code.startsWith('// '), `${file}: describe the example on its first line`)
  if (!(dir === topicsDir && name === 'Colors')) {
    assert.doesNotMatch(code, /#[\da-f]{3,8}\b/i,
      `${file}: use the shared color constants instead of hard-coded hex colors`)
    assert.doesNotMatch(code,
      /(["'])(?:none|black|white|gray|blue|red|green|yellow|purple|lightgray|darkgray|slate)\1/,
      `${file}: use shared color constants without string quotes`)
  }
  checkLinks(join(dir, 'text', name + '.md'))
  const element = core.evaluate(code, { name: file, scope: math })
  assert.ok(element instanceof core.Svg, `${file}: examples should include their viewport`)
  const fragment = pass.layout(element)
  assert.ok(fragment.size.width > 0 && fragment.size.height > 0, `${file}: empty viewport`)
  const svg = core.render_svg(fragment, { title, id_prefix: name })
  assert.ok(svg.startsWith('<svg ') && svg.endsWith('</svg>'), `${file}: invalid SVG envelope`)
  assert.ok(!/NaN|Infinity/.test(svg), `${file}: nonfinite geometry`)
  assert.ok(/<(?:path|rect|ellipse)\b/.test(svg), `${file}: no drawing`)
  const page = dir === elementsDir ? prepareElementPage(text, code) : prepareTopicPage(text, code)
  assert.ok(page.includes(code) && page.includes('# ' + title), `${file}: incomplete prepared page`)
  drawings++
  console.log(`ok - ${dir === elementsDir ? 'elements' : 'topics'}/${name}: ${fragment.size.width} × ${fragment.size.height}`)
}

// Notice unindexed Markdown at the collection root rather than silently omitting it.
for (const dir of [elementsDir, topicsDir]) {
  assert.ok(!readdirSync(dir).some(file => file.endsWith('.md')), `${dir}: put pages in text/`)
}
console.log(`${elements.tags.length} elements and ${topics.tags.length} topics checked; ${drawings} examples rendered.`)
