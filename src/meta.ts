// load the docs and gallery pages, and format them for a system prompt
//
// There is no metadata file: the index is derived from the directories on first
// use, taking each docs page's category from the `*Category*:` line under its
// title, and the pages themselves are read only when one is asked for.

import { readFileSync, readdirSync, openSync, readSync, closeSync } from 'fs'
import { basename, join } from 'path'

import { docsDir, galaDir, dataDir } from './dirs'

// the machine-readable metadata line under a docs page's title: indexed, then
// taken back out of the prose along with the blank line after it, so what a
// consumer gets is the page as it was written
const catLine = /^\*Category\*:[ \t]*(.+?)[ \t]*$/m
const catStrip = /^\*Category\*:[ \t]*.*\n{0,2}/m

// replace links with bold and push headings
function prepareText(text: string, sub: boolean = false): string {
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '**$1**') // links to bold
    if (sub) text = text.replace(/^# (.*?)$/mg, '## $1') // headings to sub-headings
    return text.trim()
}

// if there's a comment on line one, that's the query
function prepareDocsCode(text: string): string {
    const [ first, ...rest ] = text.split('\n')
    const query = first.replace(/^\/\/(.*?)$/, '$1').trim()
    const code = `\`\`\`jsx\n${rest.join('\n').trim()}\n\`\`\``
    return `**Example**\n\nPrompt: ${query}\n\nGenerated code:\n${code}`
}

function prepareGalaCode(text: string): string {
    const code = `\`\`\`jsx\n${text.trim()}\n\`\`\``
    return `**Code**\n\n${code}`
}

function prepareDocsPage(text: string, code: string, sub: boolean = false): string {
    return `${prepareText(text, sub)}\n\n${prepareDocsCode(code)}`
}

function prepareGalaPage(text: string, code: string, sub: boolean = false): string {
    return `${prepareText(text, sub)}\n\n${prepareGalaCode(code)}`
}

// one page's text is <dir>/text/<name>.md, its code <dir>/code/<name>.jsx
function readPage(dir: string, kind: 'text' | 'code', name: string): string {
    const ext = kind == 'text' ? 'md' : 'jsx'
    const page = readFileSync(join(dir, kind, `${name}.${ext}`), 'utf8')
    return (kind == 'text' ? page.replace(catStrip, '') : page).trim()
}

// just the top of a file, which is all the metadata block needs
function readHead(file: string, bytes: number = 512): string {
    const fd = openSync(file, 'r')
    try {
        const buf = Buffer.alloc(bytes)
        return buf.subarray(0, readSync(fd, buf, 0, bytes, 0)).toString('utf8')
    } finally {
        closeSync(fd)
    }
}

// the pages present in a directory, by the basename that text/ and code/ share
function listPages(dir: string): string[] {
    const names = ([ 'text', 'code' ] as const).flatMap(
        kind => readdirSync(join(dir, kind)).map(file => file.split('.')[0])
    )
    return [ ...new Set(names) ].sort()
}

// a record whose pages are read on first access and kept thereafter, so an index
// costs a directory scan rather than every file behind it
function lazyPages(dir: string, kind: 'text' | 'code', names: string[]): Record<string, string> {
    const pages: Record<string, string> = {}
    for (const name of names) {
        Object.defineProperty(pages, name, {
            configurable: true, enumerable: true,
            get() {
                const page = readPage(dir, kind, name)
                Object.defineProperty(pages, name, { value: page, enumerable: true, writable: true })
                return page
            },
        })
    }
    return pages
}

interface DocsEntry {
    name: string,       // the basename its text and code share
    cat: string | null, // its `*Category*:` line, or null if it doesn't declare one
}

// the docs index, built once per directory: the pages on disk and the category
// each one declares, in category then name order
const docsIndexes = new Map<string, DocsEntry[]>()

function indexDocs(docs_dir: string): DocsEntry[] {
    const cached = docsIndexes.get(docs_dir)
    if (cached != null) return cached

    const entries = listPages(docs_dir).map(name => {
        const head = readHead(join(docs_dir, 'text', `${name}.md`))
        return { name, cat: head.match(catLine)?.[1] ?? null }
    })

    // categorized pages first, by category; uncategorized ones last
    entries.sort((a, b) => {
        if (a.cat == b.cat) return a.name.localeCompare(b.name)
        if (a.cat == null) return 1
        if (b.cat == null) return -1
        return a.cat.localeCompare(b.cat)
    })

    docsIndexes.set(docs_dir, entries)
    return entries
}

interface DocsInfo {
    tags: string[],
    cats: Record<string, string[]>,
    text: Record<string, string>,
    code: Record<string, string>,
}

// make doc pages (defaults to this package's docs/); pages that declare no
// category are indexed but left out of cats, so they never reach the skill
function getDocs(docs_dir: string = docsDir): DocsInfo {
    const entries = indexDocs(docs_dir)

    // group the categorized pages
    const cats: Record<string, string[]> = {}
    for (const { name, cat } of entries) {
        if (cat != null) (cats[cat] ??= []).push(name)
    }
    const tags = Object.values(cats).flat()

    // the pages themselves wait until they're asked for
    const names = entries.map(entry => entry.name)
    const text = lazyPages(docs_dir, 'text', names)
    const code = lazyPages(docs_dir, 'code', names)

    // return all docs info
    return { tags, cats, text, code }
}

// every docs page on disk, categorized ones first
function listDocs(docs_dir: string = docsDir): DocsEntry[] {
    return indexDocs(docs_dir).map(entry => ({ ...entry }))
}

// read a single docs page's prose or example, without indexing the rest
function getDocsText(name: string, docs_dir: string = docsDir): string {
    return readPage(docs_dir, 'text', name)
}

function getDocsCode(name: string, docs_dir: string = docsDir): string {
    return readPage(docs_dir, 'code', name)
}

interface GalaInfo {
    tags: string[],
    text: Record<string, string>,
    code: Record<string, string>,
}

// make gala pages (defaults to this package's gala/); the gallery has no
// categories, so its index is just the figures on disk
function getGala(gala_dir: string = galaDir): GalaInfo {
    const tags = listPages(gala_dir)
    const text = lazyPages(gala_dir, 'text', tags)
    const code = lazyPages(gala_dir, 'code', tags)
    return { tags, text, code }
}

// every gallery figure on disk
function listGala(gala_dir: string = galaDir): string[] {
    return listPages(gala_dir)
}

// read a single gallery figure's prose or code
function getGalaText(name: string, gala_dir: string = galaDir): string {
    return readPage(gala_dir, 'text', name)
}

function getGalaCode(name: string, gala_dir: string = galaDir): string {
    return readPage(gala_dir, 'code', name)
}

// read a file the examples load, by the path they pass to loadFile — only the
// basename matters, so this drops straight in as an evaluator's loadFile
function loadData(path: string, encoding: string = 'utf8', data_dir: string = dataDir): string | Buffer {
    const file = join(data_dir, basename(path))
    return encoding == 'bytes'
        ? readFileSync(file)
        : readFileSync(file, encoding as BufferEncoding)
}

export { getDocs, listDocs, getDocsText, getDocsCode }
export { getGala, listGala, getGalaText, getGalaCode }
export { loadData, prepareDocsPage, prepareGalaPage }
export type { DocsInfo, DocsEntry, GalaInfo }
