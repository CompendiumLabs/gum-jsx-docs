import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { elementsDir, topicsDir } from './dirs'

type ElementEntry = Readonly<{ name: string; title: string; cat: string }>
type TopicEntry = Readonly<{ name: string; title: string; cat?: string }>
type CollectionInfo = { tags: string[]; text: Record<string, string>; code: Record<string, string> }
type ElementsInfo = CollectionInfo & { cats: Record<string, string[]> }
type TopicsInfo = CollectionInfo & { cats: Record<string, string[]> }

const category = /^\*Category\*:[ \t]*(.+?)[ \t]*$/m
const stripCategory = /^\*Category\*:[ \t]*.*\r?\n(?:\r?\n)?/m
const categories = ['core', 'layout', 'geometry', 'plotting', 'networks', 'text', 'math', 'api', 'special']

function pageName(name: string): string {
  if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(name)) throw new Error('Invalid documentation page name')
  return name
}

function names(dir: string): string[] {
  const text = readdirSync(join(dir, 'text')).filter(file => file.endsWith('.md'))
    .map(file => pageName(file.slice(0, -3))).sort()
  const code = readdirSync(join(dir, 'code')).filter(file => file.endsWith('.jsx'))
    .map(file => pageName(file.slice(0, -4))).sort()
  if (JSON.stringify(text) !== JSON.stringify(code)) {
    throw new Error(`Every page in ${dir} needs matching text/<name>.md and code/<name>.jsx files`)
  }
  return text
}

function read(dir: string, kind: 'text' | 'code', name: string): string {
  return readFileSync(join(dir, kind, `${pageName(name)}.${kind === 'text' ? 'md' : 'jsx'}`), 'utf8').trim()
}

function title(text: string, name: string): string {
  const value = /^# (.+)$/m.exec(text)?.[1]
  if (!value) throw new Error(`${name} needs a Markdown title`)
  return value
}

// Derive the catalog from the files, as in gum-jsx-docs. No second manifest to maintain.
function listElements(dir = elementsDir): ElementEntry[] {
  return names(dir).map(name => {
    const text = read(dir, 'text', name)
    const cat = category.exec(text)?.[1]
    if (!cat || !categories.includes(cat)) throw new Error(`${name} needs a known *Category*: line`)
    return { name, title: title(text, name), cat }
  }).sort((a, b) => categories.indexOf(a.cat) - categories.indexOf(b.cat)
    || a.name.localeCompare(b.name))
}

function listTopics(dir = topicsDir): TopicEntry[] {
  return names(dir).map(name => {
    const text = read(dir, 'text', name)
    const cat = category.exec(text)?.[1]
    if (cat && !categories.includes(cat)) throw new Error(`${name} has an unknown *Category*: line`)
    return { name, title: title(text, name), ...(cat ? { cat } : {}) }
  }).sort((a, b) => (a.cat ? categories.indexOf(a.cat) : categories.length)
    - (b.cat ? categories.indexOf(b.cat) : categories.length)
    || a.name.localeCompare(b.name))
}

function getElementText(name: string, dir = elementsDir): string {
  return read(dir, 'text', name).replace(stripCategory, '')
}
function getElementCode(name: string, dir = elementsDir): string { return read(dir, 'code', name); }
function getTopicText(name: string, dir = topicsDir): string {
  return read(dir, 'text', name).replace(stripCategory, '')
}
function getTopicCode(name: string, dir = topicsDir): string { return read(dir, 'code', name); }

function getElements(dir = elementsDir): ElementsInfo {
  const entries = listElements(dir)
  const cats: Record<string, string[]> = {}
  for (const { name, cat } of entries) (cats[cat] ??= []).push(name)
  const tags = entries.map(entry => entry.name)
  return { tags, cats,
    text: Object.fromEntries(tags.map(name => [name, getElementText(name, dir)])),
    code: Object.fromEntries(tags.map(name => [name, getElementCode(name, dir)])) }
}

function getTopics(dir = topicsDir): TopicsInfo {
  const entries = listTopics(dir)
  const cats: Record<string, string[]> = {}
  for (const { name, cat } of entries) if (cat) (cats[cat] ??= []).push(name)
  const tags = entries.map(entry => entry.name)
  return { tags, cats,
    text: Object.fromEntries(tags.map(name => [name, getTopicText(name, dir)])),
    code: Object.fromEntries(tags.map(name => [name, getTopicCode(name, dir)])) }
}

// Preserve Markdown links; the viewer can resolve them relative to the source page.
function prepareElementPage(text: string, code: string): string {
  return text.replace(stripCategory, '').trim() + '\n\n## Example\n\n'
    + '```jsx\n' + code.trim() + '\n```\n'
}
function prepareTopicPage(text: string, code: string): string {
  return prepareElementPage(text, code)
}

// Guides belong with the reference; the remaining topics are visual examples.
const guideNames = ['Gum', 'JSX', 'Units', 'Sizing', 'Fitting', 'Style', 'Themes', 'CLI',
  'Stack', 'PointValues', 'Coordinates', 'Rendering', 'CustomElements', 'Fonts',
  'MathHelpers', 'Arrays', 'Vectors', 'Colors', 'Random', 'Math', 'MathFonts', 'MathExport']

function selectTopics(collection: TopicsInfo, tags: string[]): TopicsInfo {
  const selected = new Set(tags)
  return {
    tags,
    cats: Object.fromEntries(Object.entries(collection.cats)
      .map(([cat, names]) => [cat, names.filter(name => selected.has(name))] as const)
      .filter(([, names]) => names.length)),
    text: Object.fromEntries(tags.map(name => [name, collection.text[name]])),
    code: Object.fromEntries(tags.map(name => [name, collection.code[name]])),
  }
}

function getGuides(dir = topicsDir): TopicsInfo {
  const topics = getTopics(dir)
  return selectTopics(topics, guideNames.filter(name => topics.tags.includes(name)))
}

function getGallery(dir = topicsDir): TopicsInfo {
  const topics = getTopics(dir)
  const gallery = selectTopics(topics, topics.tags.filter(name => !guideNames.includes(name)))
  const categorized = new Set(Object.values(gallery.cats).flat())
  const showcases = gallery.tags.filter(name => !categorized.has(name))
  if (showcases.length) gallery.cats.showcases = showcases
  return gallery
}

export { listElements, getElements, getElementText, getElementCode, prepareElementPage }
export { listTopics, getTopics, getTopicText, getTopicCode, prepareTopicPage }
export { getGuides, getGallery }
export type { CollectionInfo, ElementEntry, ElementsInfo, TopicEntry, TopicsInfo }
