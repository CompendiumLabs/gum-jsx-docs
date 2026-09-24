// Shared, read-only skill assembly for portable packages and tool-based hosts.
import { readFileSync } from 'node:fs'
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
  if (gen) names.push('gen')
  if (cli) names.push('cli')
  return names.map(readPrompt).join('\n\n') + '\n'
}

const externalPages = new Map([
  [resolve(packageRoot, '../gum-jsx-pdf/README.md'),
    'https://github.com/CompendiumLabs/gum-jsx-pdf/blob/master/README.md'],
])

type SkillFiles = Map<string, string>
type Page = { name: string; source: string; target: string; text: string; code: string }

function markdownPath(path: string): string { return path.split(sep).join('/'); }
function externalLink(target: string): boolean { return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target); }

// The source docs use inline Markdown links. Leave fenced code verbatim so JSX
// strings that happen to look like links never become build inputs.
export function mapSkillLinks(markdown: string, transform: (target: string) => string): string {
  let fence: string | undefined
  return markdown.split('\n').map(line => {
    const marker = /^\s*(`{3,}|~{3,})(.*)$/.exec(line)
    if (marker) {
      if (!fence) fence = marker[1]
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = undefined
      return line
    }
    if (fence) return line
    return line.replace(/(\[[^\]]*\]\()([^\s)]+)((?:\s+"[^"]*")?\))/g,
      (_match, open, target, close) => open + transform(target) + close)
  }).join('\n')
}

function rewriteLinks(page: Page, sources: Map<string, string>): string {
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

function categoryName(groups: Record<string, string[]>, name: string): string {
  const category = Object.entries(groups).find(([, names]) => names.includes(name))?.[0]
  if (!category) throw new Error(`No category for ${name}`)
  return category
}

function indexPage(heading: string, kind: string, collection: CollectionInfo,
  groups: Record<string, string[]>, grouped = false): string {
  const sections = Object.entries(groups).map(([category, names]) =>
    `## ${category[0].toUpperCase() + category.slice(1)}\n\n` + names.map(name =>
      `- [${title(collection.text[name])}](${kind}/${grouped ? `${category}.md#${name}` : `${name}.md`}) — ${collection.descriptions[name]}`).join('\n'))
  return `# ${heading}\n\nEach ${grouped ? 'entry' : 'page'} includes its runnable JSX example.\n\n${sections.join('\n\n')}\n`
}

function categoryPage(kind: string, category: string, pages: Page[], sources: Map<string, string>): string {
  const heading = category[0].toUpperCase() + category.slice(1)
  const sections = pages.map(page => {
    const markdown = prepareElementPage(rewriteLinks(page, sources), page.code)
    let fence: string | undefined
    const lines = markdown.trim().split('\n').flatMap(line => {
      const marker = /^\s*(`{3,}|~{3,})(.*)$/.exec(line)
      if (marker) {
        if (!fence) fence = marker[1]
        else if (marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = undefined
        return [line]
      }
      if (fence) return [line]
      const match = /^(#{1,5}) (.+)$/.exec(line)
      if (!match) return [line]
      const anchor = match[1].length === 1 ? page.name
        : `${page.name}-${match[2].toLowerCase().replace(/[^\w -]/g, '').replace(/\s+/g, '-')}`
      return [`<a id="${anchor}"></a>`, '', `${'#'.repeat(match[1].length + 1)} ${match[2]}`]
    })
    return lines.join('\n')
  })
  return `# ${heading} ${kind}\n\n` + sections.join('\n\n---\n\n') + '\n'
}

// Pure assembly makes coverage and links testable without generating artifacts.
export function buildSkillFiles(opts: SkillPromptOptions = {}): SkillFiles {
  const elements = getElements()
  const guides = getGuides()
  const gallery = getGallery()
  const collections = [
    { kind: 'elements', dir: elementsDir, collection: elements, groups: elements.cats },
    { kind: 'guides', dir: guidesDir, collection: guides, groups: undefined },
    { kind: 'gallery', dir: galleryDir, collection: gallery, groups: gallery.cats },
  ]
  const pages: Page[] = []
  const sources = new Map<string, string>()
  for (const { kind, dir, collection, groups } of collections) {
    for (const name of collection.tags) {
      const source = join(dir, 'text', `${name}.md`)
      const target = `references/${kind}/${groups ? categoryName(groups, name) : name}.md`
      const anchor = groups ? `#${name}` : ''
      sources.set(source, target + anchor)
      // Runnable code is embedded in the page, not duplicated as another file.
      sources.set(join(dir, 'code', `${name}.jsx`), `${target}#${groups ? `${name}-` : ''}example`)
      pages.push({ name, source, target, text: collection.text[name], code: collection.code[name] })
    }
  }

  const files: SkillFiles = new Map()
  const prompt = readPrompt('head') + '\n\n' + getSkillPrompt({ cli: true, ...opts })
  files.set('SKILL.md', mapSkillLinks(prompt, target => {
    const match = /^references\/(elements|gallery)\/([A-Za-z0-9_-]+)\.md$/.exec(target)
    if (!match) return target
    const collection = match[1] === 'elements' ? elements : gallery
    const category = categoryName(collection.cats, match[2])
    return `references/${match[1]}/${category}.md#${match[2]}`
  }))
  files.set('references/elements.md', indexPage('Element reference', 'elements', elements, elements.cats, true))
  files.set('references/guides.md', indexPage('Guides', 'guides', guides, { guides: guides.tags }))
  files.set('references/gallery.md', indexPage('Gallery', 'gallery', gallery, gallery.cats, true))
  for (const page of pages.filter(page => page.target.startsWith('references/guides/'))) {
    files.set(page.target, prepareElementPage(rewriteLinks(page, sources), page.code))
  }
  for (const kind of ['elements', 'gallery']) {
    const groups = kind === 'elements' ? elements.cats : gallery.cats
    for (const category of Object.keys(groups)) {
      const target = `references/${kind}/${category}.md`
      files.set(target, categoryPage(kind, category, pages.filter(page => page.target === target), sources))
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

export type { SkillFiles, SkillPromptOptions }
