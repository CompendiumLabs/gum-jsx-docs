// Shared, read-only skill assembly for portable packages and tool-based hosts.
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { elementsDir, galleryDir, guidesDir, packageRoot, promptDir } from './dirs'
import { getElements, getGuides, getGallery, prepareElementPage } from './meta'
import type { CollectionInfo } from './meta'

type SkillPromptOptions = {
  gen?: boolean
  cli?: boolean
}

function readPrompt(name: string): string {
  return readFileSync(join(promptDir, `${name}.md`), 'utf8').trim()
}

// CLI workflows are opt-in; the portable package enables them by default.
export function getSkillPrompt({ gen = true, cli = false }: SkillPromptOptions = {}): string {
  const names = ['intro', 'docs', 'refs']
  if (cli) names.push('cli')
  if (gen) names.push('gen')
  return names.map(readPrompt).join('\n\n') + '\n'
}

const externalPages = new Map([
  [resolve(packageRoot, '../gum-jsx-pdf/README.md'),
    'https://github.com/CompendiumLabs/gum-jsx-pdf/blob/master/README.md'],
])

type SkillFiles = Map<string, string>
type Page = { name: string; source: string; target: string; text: string; code: string }
type ReferenceBlock = {
  name: string; title: string; source: string; target: string; text: string; names: string[]
}

function markdownPath(path: string): string { return path.split(sep).join('/'); }
function externalLink(target: string): boolean { return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target); }

// Keep examples literal when expanding includes, rewriting links, or nesting headings.
function map_prose(markdown: string, transform: (line: string) => string): string {
  let fence: string | undefined
  return markdown.split('\n').map(line => {
    const marker = /^\s*(`{3,}|~{3,})(.*)$/.exec(line)
    if (marker) {
      if (!fence) fence = marker[1]
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = undefined
      return line
    }
    if (fence) return line
    return transform(line)
  }).join('\n')
}

// The source docs use inline Markdown links; never rewrite fenced JSX strings.
export function mapSkillLinks(markdown: string, transform: (target: string) => string): string {
  return map_prose(markdown, line => line.replace(/(\[[^\]]*\]\()([^\s)]+)((?:\s+"[^"]*")?\))/g,
    (_match, open, target, close) => open + transform(target) + close))
}

function rewriteLinks(page: Pick<Page, 'source' | 'target' | 'text'>, sources: Map<string, string>): string {
  return mapSkillLinks(page.text, target => {
    if (externalLink(target) || target.startsWith('#')) return target
    const [path, hash] = target.split('#')
    const source = resolve(dirname(page.source), decodeURIComponent(path))
    const external = externalPages.get(source)
    if (external) return external + (hash ? `#${hash}` : '')
    const destination = sources.get(source)
    if (!destination) throw new Error(`${page.source}: no packaged reference for ${target}`)
    const [file, anchor] = destination.split('#')
    const link = markdownPath(relative(dirname(page.target), file))
    const fragment = anchor && hash ? `${anchor}-${hash}` : anchor || hash
    return link + (fragment ? `#${fragment}` : '')
  })
}

function title(text: string): string {
  const match = /^# (.+)$/m.exec(text)
  if (!match) throw new Error('Reference page is missing its title')
  return match[1]
}

// A block is ordinary Markdown with standalone {{{Name}}} includes from its collection.
function map_includes(text: string, include: (name: string) => string): string {
  return map_prose(text, line => {
    const match = /^\s*\{\{\{([^{}]+)\}\}\}\s*$/.exec(line)
    return match ? include(match[1].trim()) : line
  })
}

// Hosts share the skill's authored grouping without parsing generated Markdown.
export function get_reference_blocks(kind: 'elements' | 'gallery',
  collection: CollectionInfo = kind === 'elements' ? getElements() : getGallery()): ReferenceBlock[] {
  const directory = join(promptDir, kind)
  const assigned = new Set<string>()
  const known = new Set(collection.tags)
  const blocks = readdirSync(directory).filter(file => file.endsWith('.md')).sort().map(file => {
    const source = join(directory, file)
    const text = readFileSync(source, 'utf8').trim()
    const names: string[] = []
    map_includes(text, name => {
      if (!known.has(name)) throw new Error(`${source}: unknown ${kind} entry ${name}`)
      if (assigned.has(name)) throw new Error(`${source}: duplicate ${kind} entry ${name}`)
      assigned.add(name)
      names.push(name)
      return ''
    })
    if (!names.length) throw new Error(`${source}: reference block has no entries`)
    return { name: file.slice(0, -3), title: title(text), source,
      target: `references/${kind}/${file}`, text, names }
  })
  const missing = collection.tags.filter(name => !assigned.has(name))
  if (missing.length) throw new Error(`Missing ${kind} entries in ${directory}: ${missing.join(', ')}`)
  return blocks
}

function indexPage(heading: string, kind: string, collection: CollectionInfo,
  groups: Record<string, string[]>): string {
  const sections = Object.entries(groups).map(([category, names]) =>
    `## ${category[0].toUpperCase() + category.slice(1)}\n\n` + names.map(name =>
      `- [${title(collection.text[name])}](${kind}/${name}.md) — ${collection.descriptions[name]}`).join('\n'))
  return `# ${heading}\n\nEach page includes its runnable JSX example.\n\n${sections.join('\n\n')}\n`
}

function block_index(heading: string, collection: CollectionInfo, blocks: ReferenceBlock[]): string {
  const sections = blocks.map(block => {
    const path = markdownPath(relative('references', block.target))
    return `## ${block.title}\n\n` + block.names.map(name =>
      `- [${title(collection.text[name])}](${path}#${name}) — ${collection.descriptions[name]}`).join('\n')
  })
  return `# ${heading}\n\nEach entry includes its runnable JSX example.\n\n${sections.join('\n\n')}\n`
}

// Keep entry anchors stable when a template moves the entry to another block.
function entry_page(page: Page, sources: Map<string, string>): string {
  const markdown = prepareElementPage(rewriteLinks(page, sources), page.code)
  return map_prose(markdown.trim(), line => {
    const match = /^(#{1,5}) (.+)$/.exec(line)
    if (!match) return line
    const anchor = match[1].length === 1 ? page.name
      : `${page.name}-${match[2].toLowerCase().replace(/[^\w -]/g, '').replace(/\s+/g, '-')}`
    return `<a id="${anchor}"></a>\n\n${'#'.repeat(match[1].length + 1)} ${match[2]}`
  })
}

// Pure assembly makes coverage and links testable without generating artifacts.
export function buildSkillFiles(opts: SkillPromptOptions = {}): SkillFiles {
  const elements = getElements()
  const guides = getGuides()
  const gallery = getGallery()
  const collections = [
    { kind: 'elements', dir: elementsDir, collection: elements, blocks: get_reference_blocks('elements', elements) },
    { kind: 'guides', dir: guidesDir, collection: guides, blocks: [] },
    { kind: 'gallery', dir: galleryDir, collection: gallery, blocks: get_reference_blocks('gallery', gallery) },
  ]
  const pages: Page[] = []
  const sources = new Map<string, string>()
  const links = new Map<string, string>()
  for (const { kind, dir, collection, blocks } of collections) {
    const locations = new Map(blocks.flatMap(block => block.names.map(name => [name, block.target] as const)))
    for (const block of blocks) sources.set(block.source, block.target)
    for (const name of collection.tags) {
      const source = join(dir, 'text', `${name}.md`)
      const target = locations.get(name) ?? `references/${kind}/${name}.md`
      const anchor = blocks.length ? `#${name}` : ''
      sources.set(source, target + anchor)
      links.set(`references/${kind}/${name}.md`, target + anchor)
      // Runnable code is embedded in the page, not duplicated as another file.
      sources.set(join(dir, 'code', `${name}.jsx`), `${target}#${blocks.length ? `${name}-` : ''}example`)
      pages.push({ name, source, target, text: collection.text[name], code: collection.code[name] })
    }
  }

  const files: SkillFiles = new Map()
  const prompt = readPrompt('head') + '\n\n' + getSkillPrompt({ cli: true, ...opts })
  files.set('SKILL.md', mapSkillLinks(prompt, target => {
    const [path, hash] = target.split('#')
    const destination = links.get(path)
    if (!destination) return target
    return destination + (hash ? `${destination.includes('#') ? '-' : '#'}${hash}` : '')
  }))
  // External helpers get their own section while retaining their existing page paths.
  const external = guides.cats.external ?? []
  const guide_groups = { guides: guides.tags.filter(name => !external.includes(name)),
    ...(external.length ? { external } : {}) }
  files.set('references/guides.md', indexPage('Guides', 'guides', guides, guide_groups))
  for (const page of pages.filter(page => page.target.startsWith('references/guides/'))) {
    files.set(page.target, prepareElementPage(rewriteLinks(page, sources), page.code))
  }
  for (const { kind, collection, blocks } of collections.filter(item => item.blocks.length)) {
    files.set(`references/${kind}.md`, block_index(kind === 'elements' ? 'Element reference' : 'Gallery', collection, blocks))
    for (const block of blocks) {
      const entries = new Map(pages.filter(page => page.target === block.target).map(page => [page.name, page]))
      const text = map_includes(rewriteLinks(block, sources), name => entry_page(entries.get(name)!, sources))
      files.set(block.target, text + '\n')
    }
  }

  for (const [file, markdown] of files) {
    mapSkillLinks(markdown, target => {
      if (externalLink(target) || target.startsWith('#')) return target
      const path = decodeURIComponent(target.split('#')[0])
      const destination = markdownPath(join(dirname(file), path))
      if (!files.has(destination)) throw new Error(`${file}: broken skill link to ${target}`)
      return target
    })
  }
  return files
}

export type { SkillFiles, SkillPromptOptions, ReferenceBlock }
