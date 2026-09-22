import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import * as core from 'gum-jsx-core'
import * as math from 'gum-jsx-math'
import { elementsDir, topicsDir, packageRoot, listElements, listTopics,
  getElements, getTopics, getGuides, getGallery, prepareElementPage, prepareTopicPage } from '../src'

// Render examples at their design sizes and in resized and bounded previews.
// Only checked-in, trusted JSX is evaluated; evaluate() is not a sandbox.
const elements = getElements()
const topics = getTopics()
const guides = getGuides()
const gallery = getGallery()
assert.ok(guides.tags.includes('Gum'), 'Getting started belongs in Docs')
assert.ok(gallery.tags.includes('plot_bars'), 'Visual showcases belong in Gallery')
assert.equal(new Set([...guides.tags, ...gallery.tags]).size, topics.tags.length)
assert.equal(guides.tags.length + gallery.tags.length, topics.tags.length)
assert.deepEqual(Object.values(gallery.cats).flat().sort(), [...gallery.tags].sort(),
  'Every gallery example must appear in exactly one category')
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

function checkPlotAreas(fragment: core.Fragment, context: string): void {
  if (fragment.name === 'Plot' || fragment.name === 'BarPlot') {
    assert.ok(fragment.content && fragment.content.width > 0 && fragment.content.height > 0,
      `${context}: plot labels consumed the entire data area`)
  }
  for (const child of fragment.children) checkPlotAreas(child.fragment, context)
}

function checkGeometry(fragment: core.Fragment, context: string): void {
  assert.ok(!/NaN|Infinity/.test(core.render_svg(fragment)), `${context}: nonfinite geometry`)
}

function fragments(fragment: core.Fragment): core.Fragment[] {
  return [fragment, ...fragment.children.flatMap(child => fragments(child.fragment))]
}

const comparisonRows: Record<string, readonly string[]> = {
  group_anchors: ['VStack', 'VStack', 'VStack'],
  group_clip: ['VStack', 'VStack'],
  arrow_caps: ['VStack', 'VStack', 'VStack'],
  two_columns: ['TextFrame', 'TextCol'],
  two_column: ['VStack', 'TextCol'],
  stokes_theorem: ['Group', 'TextCol'],
  polygon_slide: ['Frame', 'Frame', 'Frame'],
  MathSlides: ['VStack', 'Plot'],
  positioned_diagram: ['Frame', 'Group', 'Frame', 'Group', 'Frame'],
}
const columnGrow: Record<string, readonly number[]> = {
  MathSlides: [1, 1.1],
  two_column: [1.15, 1],
  two_columns: [1, 1],
  positioned_diagram: [1, 0.65, 1, 0.65, 1],
}
function checkComposition(fragment: core.Fragment, name: string, context: string): void {
  const expected = comparisonRows[name]
  if (!expected) return
  const rows = fragments(fragment).filter(node => node.name === 'HStack'
    && node.children.map(child => child.fragment.name).join(',') === expected.join(','))
  assert.equal(rows.length, name === 'polygon_slide' ? 2 : 1,
    `${context}: preserve the side-by-side composition`)
  const weights = columnGrow[name]
  if (weights) for (const row of rows) {
    const unit = row.children[0]!.fragment.size.width / weights[0]!
    assert.ok(unit > 0, `${context}: columns need a positive allocation`)
    row.children.forEach((child, index) => {
      assert.ok(Math.abs(child.fragment.size.width - unit * weights[index]!) < 1e-6,
        `${context}: column widths must follow their grow weights`)
    })
  }
}

// More available room must not add a blank strip to content-sized examples.
const contentSizedExamples = new Set([
  ...Object.keys(comparisonRows), 'scenic_route', 'shape_algebra', 'Fonts', 'Gum',
  'Math', 'MathArrays', 'MathBoxes', 'MathDecorations', 'MathExpressions', 'MathFonts', 'AlignedMath',
])

const previewBounds = [[320, 240], [640, 480], [960, 240], [320, 640], [240, 640]] as const
const canvas = { width: 640, height: 480 }

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
  const element: unknown = core.evaluate(code, { name: file, scope: math })
  assert.ok(element instanceof core.Element, `${file}: examples should return an element`)
  // Match Studio: finite offers, with natural content height.
  const fragment = pass.layout(core.make_viewport(element), core.make_request({
    width: core.available(canvas.width), height: core.available(canvas.height),
  }))
  assert.ok(fragment.size.width > 0 && fragment.size.height > 0, `${file}: empty viewport`)
  const svg = core.render_svg(fragment, { title, id_prefix: name })
  assert.ok(svg.startsWith('<svg ') && svg.endsWith('</svg>'), `${file}: invalid SVG envelope`)
  assert.ok(!/NaN|Infinity/.test(svg), `${file}: nonfinite geometry`)
  assert.ok(/<(?:path|rect|ellipse|image)\b/.test(svg), `${file}: no drawing`)
  checkPlotAreas(fragment, file)
  // Small or unusually shaped canvases can legitimately clip or crowd content.
  // Require finite output there; explicit fitting is checked separately below.
  for (const width of [320, 480, 640, 960]) {
    const resized = pass.layout(core.make_viewport(element), core.make_request({ width: core.exact(width) }))
    assert.ok(resized.size.height > 0, `${file} at ${width}px: empty height`)
    checkGeometry(resized, `${file} at ${width}px`)
    if (dir === topicsDir) checkComposition(resized, name, `${file} at ${width}px`)
  }
  for (const [width, height] of previewBounds) {
    // Also exercise bounded wrappers around the completed figures.
    const result = core.layout_element(element, {
      pass, wrap: { max_width: core.px(width), max_height: core.px(height) },
    })
    assert.ok(result.kind === 'fragment')
    const bounded = result.fragment
    const context = `${file} bounded by ${width} × ${height}`
    assert.ok(bounded.size.width > 0 && bounded.size.height > 0, `${context}: empty viewport`)
    // An explicit source viewport opts out of generated-wrapper props.
    if (!(element instanceof core.Svg)) {
      assert.ok(bounded.size.width <= width + 1e-6 && bounded.size.height <= height + 1e-6,
        `${context}: maximum viewport dimensions exceeded`)
    }
    checkGeometry(bounded, context)
    if (dir === topicsDir) checkComposition(bounded, name, context)
  }
  if (dir === topicsDir && contentSizedExamples.has(name)) {
    const sizes = [2000, 4000].map(width => {
      const result = core.layout_element(element, {
        pass, wrap: { max_width: core.px(width), max_height: core.px(2000) },
      })
      assert.ok(result.kind === 'fragment')
      checkGeometry(result.fragment, `${file} in a roomy preview`)
      return result.fragment.size
    })
    assert.deepEqual(sizes[0], sizes[1], `${file}: unused host width enlarged a content-sized figure`)
  }
  if (element.props.fit) {
    for (const [width, height] of [[320, 240], [640, 480], [960, 540]]) {
      const fitted = pass.layout(core.make_viewport(element), core.make_request({
        width: core.exact(width!), height: core.exact(height!),
      }))
      assert.ok(Object.values(fitted.overflow).every(value => value <= 3),
        `${file} at ${width} × ${height}: fitted scene overflow`)
      checkPlotAreas(fitted, `${file} at ${width} × ${height}`)
    }
  }
  const page = dir === elementsDir ? prepareElementPage(text, code) : prepareTopicPage(text, code)
  assert.ok(page.includes(code) && page.includes('# ' + title), `${file}: incomplete prepared page`)
  drawings++
  console.log(`ok - ${dir === elementsDir ? 'elements' : 'topics'}/${name}: ${fragment.size.width} × ${fragment.size.height}`)
}

// Notice unindexed Markdown at the collection root rather than silently omitting it.
for (const dir of [elementsDir, topicsDir]) {
  assert.ok(!readdirSync(dir).some(file => file.endsWith('.md')), `${dir}: put pages in text/`)
}
console.log(`${elements.tags.length} elements and ${topics.tags.length} topics checked; ${drawings} examples rendered at 320, 480, 640, and 960px and in ${previewBounds.length} bounded preview sizes.`)
console.log(`${contentSizedExamples.size} content-sized figures and ${Object.keys(comparisonRows).length} side-by-side compositions checked.`)
console.log(`${Object.keys(columnGrow).length} weighted column layouts checked.`)
