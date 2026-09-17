#!/usr/bin/env bun

// Build the portable skill from maintained prompt pieces and current docs.
// Source/default paths are package-relative; an explicit output is cwd-relative.
import { spawnSync } from 'node:child_process'
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync,
  rmSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { parseArgs } from 'node:util'
import { elementsDir, galleryDir, packageRoot, promptDir,
  getElements, getGuides, getGallery, prepareElementPage } from '../src'
import type { CollectionInfo } from '../src'

const skillName = 'gum-jsx'
const defaultOutput = join(packageRoot, 'skills', skillName)
const manifestName = '.gum-jsx-generated.json'
const promptNames = ['head', 'intro', 'docs', 'refs', 'gen']
const externalPages = new Map([
  [resolve(packageRoot, '../gum-jsx-pdf/README.md'),
    'https://github.com/CompendiumLabs/gum-jsx-pdf/blob/master/README.md'],
])

type SkillFiles = Map<string, string>
type Page = { source: string; target: string; text: string; code: string }

function markdownPath(path: string): string { return path.split(sep).join('/'); }
function externalLink(target: string): boolean { return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target); }

// The source docs use inline Markdown links. Leave fenced code verbatim so JSX
// strings that happen to look like links never become build inputs.
function mapLinks(markdown: string, transform: (target: string) => string): string {
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
  return mapLinks(page.text, target => {
    if (externalLink(target) || target.startsWith('#')) return target
    const [path, hash] = target.split('#')
    const source = resolve(dirname(page.source), decodeURIComponent(path))
    const external = externalPages.get(source)
    if (external) return external + (hash ? `#${hash}` : '')
    const destination = sources.get(source)
    if (!destination) throw new Error(`${page.source}: no packaged reference for ${target}`)
    const [file, anchor] = destination.split('#')
    const link = markdownPath(relative(dirname(page.target), file))
    return link + (anchor || hash ? `#${anchor || hash}` : '')
  })
}

function title(text: string): string {
  const match = /^# (.+)$/m.exec(text)
  if (!match) throw new Error('Reference page is missing its title')
  return match[1]
}

function indexPage(heading: string, kind: string, collection: CollectionInfo,
  groups: Record<string, string[]>): string {
  const sections = Object.entries(groups).map(([category, names]) =>
    `## ${category[0].toUpperCase() + category.slice(1)}\n\n` + names.map(name =>
      `- [${title(collection.text[name])}](${kind}/${name}.md)`).join('\n'))
  return `# ${heading}\n\nEach page includes its runnable JSX example.\n\n${sections.join('\n\n')}\n`
}

// Pure assembly makes coverage and links testable without generating artifacts.
export function buildSkillFiles(): SkillFiles {
  const elements = getElements()
  const guides = getGuides()
  const gallery = getGallery()
  const collections = [
    { kind: 'elements', dir: elementsDir, collection: elements },
    { kind: 'guides', dir: galleryDir, collection: guides },
    { kind: 'gallery', dir: galleryDir, collection: gallery },
  ]
  const pages: Page[] = []
  const sources = new Map<string, string>()
  for (const { kind, dir, collection } of collections) {
    for (const name of collection.tags) {
      const source = join(dir, 'text', `${name}.md`)
      const target = `references/${kind}/${name}.md`
      sources.set(source, target)
      // Runnable code is embedded in the page, not duplicated as another file.
      sources.set(join(dir, 'code', `${name}.jsx`), `${target}#example`)
      pages.push({ source, target, text: collection.text[name], code: collection.code[name] })
    }
  }

  const files: SkillFiles = new Map()
  files.set('SKILL.md', promptNames.map(name =>
    readFileSync(join(promptDir, `${name}.md`), 'utf8').trim()).join('\n\n') + '\n')
  files.set('references/elements.md', indexPage('Element reference', 'elements', elements, elements.cats))
  files.set('references/guides.md', indexPage('Guides', 'guides', guides, { guides: guides.tags }))
  files.set('references/gallery.md', indexPage('Gallery', 'gallery', gallery, gallery.cats))
  for (const page of pages) {
    files.set(page.target, prepareElementPage(rewriteLinks(page, sources), page.code))
  }

  for (const [file, markdown] of files) {
    mapLinks(markdown, target => {
      if (externalLink(target) || target.startsWith('#')) return target
      const path = decodeURIComponent(target.split('#')[0])
      const destination = markdownPath(join(dirname(file), path))
      if (!files.has(destination)) throw new Error(`${file}: broken skill link to ${target}`)
      return target
    })
  }
  return files
}

function generatedPath(path: unknown): path is string {
  return typeof path === 'string' && (path === 'SKILL.md'
    || /^references\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.md$/.test(path))
}

function previousFiles(output: string): string[] {
  const stat = lstatSync(output, { throwIfNoEntry: false })
  if (!stat) return []
  if (!stat.isDirectory()) throw new Error(`Output must be a directory, not a file or symlink: ${output}`)
  const manifest = join(output, manifestName)
  const manifestStat = lstatSync(manifest, { throwIfNoEntry: false })
  if (!manifestStat) {
    if (readdirSync(output).length) throw new Error(`Refusing to overwrite a non-generated directory: ${output}`)
    return []
  }
  if (!manifestStat.isFile()) throw new Error(`Invalid skill build manifest: ${manifest}`)
  const files: unknown = JSON.parse(readFileSync(manifest, 'utf8'))
  if (!Array.isArray(files) || !files.every(generatedPath)) throw new Error(`Invalid skill build manifest: ${manifest}`)
  return files
}

function checkOutputPaths(output: string, files: string[]): void {
  for (const file of files) {
    let path = output
    const parts = file.split('/')
    for (const [index, part] of parts.entries()) {
      path = join(path, part)
      const stat = lstatSync(path, { throwIfNoEntry: false })
      if (!stat) continue
      if (index === parts.length - 1 ? !stat.isFile() : !stat.isDirectory()) {
        throw new Error(`Refusing to replace a directory, special file, or symlink: ${path}`)
      }
    }
  }
}

function writeFiles(output: string, files: SkillFiles): void {
  for (const [name, content] of files) {
    const path = join(output, name)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, content)
  }
}

function archiveFiles(files: SkillFiles): Buffer {
  // Build a fresh ZIP, not an update of the previous archive. Only generated
  // pages are included; local notes and the build manifest stay out of it.
  const scratch = mkdtempSync(join(tmpdir(), 'gum-jsx-skill-'))
  try {
    writeFiles(join(scratch, skillName), files)
    const archive = join(scratch, `${skillName}.skill`)
    const result = spawnSync('zip', ['-q', '-r', '-X', archive, skillName], { cwd: scratch, encoding: 'utf8' })
    if (result.error || result.status !== 0) {
      throw new Error(`Could not create skill archive. Install zip or use --no-archive.\n${result.error?.message ?? result.stderr ?? result.stdout}`)
    }
    return readFileSync(archive)
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}

export function buildSkill(options: { output?: string; archive?: boolean } = {}) {
  const output = resolve(options.output ?? defaultOutput)
  const files = buildSkillFiles()
  const previous = previousFiles(output)
  checkOutputPaths(output, [...previous, ...files.keys()])
  // Detect missing zip before modifying the destination.
  const archive = options.archive === false ? undefined : `${output}.skill`
  const archiveStat = archive ? lstatSync(archive, { throwIfNoEntry: false }) : undefined
  if (archiveStat && !archiveStat.isFile()) throw new Error(`Refusing to overwrite a non-file archive: ${archive}`)
  const bytes = archive ? archiveFiles(files) : undefined
  writeFiles(output, files)
  for (const file of previous) {
    const path = join(output, file)
    if (!files.has(file) && existsSync(path)) unlinkSync(path)
  }
  writeFileSync(join(output, manifestName), JSON.stringify([...files.keys()].sort(), null, 2) + '\n')
  if (archive && bytes) writeFileSync(archive, bytes)
  return { output, archive, pages: files.size }
}

if (import.meta.main) {
  try {
    const { values } = parseArgs({ options: {
      output: { type: 'string', short: 'o' },
      'no-archive': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' },
    } })
    if (values.help) {
      console.log(`Usage: bun scripts/skill.ts [-o <directory>] [--no-archive]

Build the current Gum skill from prompt/ and docs/.
  -o, --output <directory>  Skill directory (default: ${defaultOutput})
      --no-archive          Write the directory only; no zip executable needed
  -h, --help                Show this help

The archive is <output>.skill and contains a gum-jsx/ folder.
Explicit output paths are relative to the current working directory.`)
    } else {
      const result = buildSkill({ output: values.output, archive: !values['no-archive'] })
      console.log(`Built ${result.pages} pages in ${result.output}`)
      if (result.archive) console.log(`Packaged ${result.archive}`)
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
