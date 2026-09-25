import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { elementsDir, galleryDir, guidesDir } from './dirs'

type ElementEntry = Readonly<{ name: string; title: string; cat: string; description: string }>
type TopicEntry = Readonly<{ name: string; title: string; cat: string; description: string }>
type CollectionInfo = { tags: string[]; text: Record<string, string>; code: Record<string, string>; descriptions: Record<string, string> }
type ElementsInfo = CollectionInfo & { cats: Record<string, string[]> }
type TopicsInfo = CollectionInfo & { cats: Record<string, string[]> }

const categories = ['core', 'layout', 'geometry', 'plotting', 'maps', 'networks', 'text', 'math', 'api', 'special']

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

function page(text: string, name: string): { cat: string; description: string; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n(?:\r?\n)?/.exec(text)
  if (!match) throw new Error(`${name} needs YAML front matter`)
  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^([a-z]+):[ \t]*(.*)$/.exec(line)
    if (!field || data[field[1]] !== undefined) throw new Error(`${name} has invalid YAML metadata`)
    const value = field[2].trim()
    // The maintained descriptions use JSON-style double quotes, valid YAML scalars.
    data[field[1]] = value.startsWith('"') ? JSON.parse(value) : value
  }
  const cat = data.category
  const description = data.description
  if (typeof cat !== 'string' || (!categories.includes(cat) && cat !== 'showcases')) {
    throw new Error(`${name} needs a known category`)
  }
  if (typeof description !== 'string' || !description.trim()) {
    throw new Error(`${name} needs a description`)
  }
  return { cat, description: description.trim(), body: text.slice(match[0].length) }
}

// Derive the catalog from the files, as in gum-jsx-docs. No second manifest to maintain.
function listElements(dir = elementsDir): ElementEntry[] {
  return names(dir).map(name => {
    const text = read(dir, 'text', name)
    const { cat, description, body } = page(text, name)
    if (cat === 'showcases') throw new Error(`${name} needs an element category`)
    return { name, title: title(body, name), cat, description }
  }).sort((a, b) => categories.indexOf(a.cat) - categories.indexOf(b.cat)
    || a.name.localeCompare(b.name))
}

function listCollection(dir: string): TopicEntry[] {
  return names(dir).map(name => {
    const text = read(dir, 'text', name)
    const { cat, description, body } = page(text, name)
    return { name, title: title(body, name), cat, description }
  }).sort((a, b) => (a.cat === 'showcases' ? categories.length : categories.indexOf(a.cat))
    - (b.cat === 'showcases' ? categories.length : categories.indexOf(b.cat))
    || a.name.localeCompare(b.name))
}

function getElementText(name: string, dir = elementsDir): string {
  return page(read(dir, 'text', name), name).body
}
function getElementCode(name: string, dir = elementsDir): string { return read(dir, 'code', name); }
function getCollectionText(name: string, dir: string): string {
  return page(read(dir, 'text', name), name).body
}
function getCollectionCode(name: string, dir: string): string { return read(dir, 'code', name); }

function getElements(dir = elementsDir): ElementsInfo {
  const entries = listElements(dir)
  const cats: Record<string, string[]> = {}
  for (const { name, cat } of entries) (cats[cat] ??= []).push(name)
  const tags = entries.map(entry => entry.name)
  return { tags, cats, descriptions: Object.fromEntries(entries.map(({ name, description }) => [name, description])),
    text: Object.fromEntries(tags.map(name => [name, getElementText(name, dir)])),
    code: Object.fromEntries(tags.map(name => [name, getElementCode(name, dir)])) }
}

function getCollection(dir: string): TopicsInfo {
  const entries = listCollection(dir)
  const cats: Record<string, string[]> = {}
  for (const { name, cat } of entries) (cats[cat] ??= []).push(name)
  const tags = entries.map(entry => entry.name)
  return { tags, cats, descriptions: Object.fromEntries(entries.map(({ name, description }) => [name, description])),
    text: Object.fromEntries(tags.map(name => [name, getCollectionText(name, dir)])),
    code: Object.fromEntries(tags.map(name => [name, getCollectionCode(name, dir)])) }
}

// Preserve Markdown links; the viewer can resolve them relative to the source page.
function prepareElementPage(text: string, code: string): string {
  return text.trim() + '\n\n## Example\n\n'
    + '```jsx\n' + code.trim() + '\n```\n'
}
function prepareTopicPage(text: string, code: string): string {
  return prepareElementPage(text, code)
}

function getGuides(dir = guidesDir): TopicsInfo { return getCollection(dir); }

function getGallery(dir = galleryDir): TopicsInfo {
  const gallery = getCollection(dir)
  return gallery
}

function listGuides(dir = guidesDir): TopicEntry[] { return listCollection(dir); }
function listGallery(dir = galleryDir): TopicEntry[] { return listCollection(dir); }

// Preserve the original combined topic catalog for existing consumers.
function listTopics(dir?: string): TopicEntry[] {
  return dir ? listCollection(dir) : [...listGuides(), ...listGallery()]
}
function getTopics(dir?: string): TopicsInfo {
  if (dir) return getCollection(dir)
  const guides = getGuides(), gallery = getGallery()
  const cats: Record<string, string[]> = {}
  for (const collection of [guides, gallery]) {
    for (const [cat, names] of Object.entries(collection.cats)) (cats[cat] ??= []).push(...names)
  }
  return { tags: [...guides.tags, ...gallery.tags], cats,
    descriptions: { ...guides.descriptions, ...gallery.descriptions },
    text: { ...guides.text, ...gallery.text }, code: { ...guides.code, ...gallery.code } }
}
function topicDir(name: string): string {
  return existsSync(join(guidesDir, 'text', `${pageName(name)}.md`)) ? guidesDir : galleryDir
}
function getTopicText(name: string, dir = topicDir(name)): string { return getCollectionText(name, dir); }
function getTopicCode(name: string, dir = topicDir(name)): string { return getCollectionCode(name, dir); }
function getGuideText(name: string): string { return getCollectionText(name, guidesDir); }
function getGuideCode(name: string): string { return getCollectionCode(name, guidesDir); }
function getGalleryText(name: string): string { return getCollectionText(name, galleryDir); }
function getGalleryCode(name: string): string { return getCollectionCode(name, galleryDir); }

export { listElements, getElements, getElementText, getElementCode, prepareElementPage }
export { listTopics, getTopics, getTopicText, getTopicCode, prepareTopicPage }
export { listGuides, getGuides, getGuideText, getGuideCode }
export { listGallery, getGallery, getGalleryText, getGalleryCode }
export type { CollectionInfo, ElementEntry, ElementsInfo, TopicEntry, TopicsInfo }
