// Portable documentation queries; this module never reads the filesystem.
type DocPage = {
  id: string
  title: string
  category: string
  description: string
  text: string
  code: string
  assets: Record<string, string>
}
type DocsCatalog = { version: string; intro: string; pages: DocPage[] }

// Retrieve a canonical page ID, including IDs copied from anchored links.
function get_doc(catalog: DocsCatalog, id: string): DocPage {
  const page = catalog.pages.find(page => page.id === id.split('#')[0])
  if (!page) throw new Error(`Unknown documentation page: ${id}. Use gum docs search or gum docs list.`)
  return page
}

// List one collection or the complete catalog in its maintained order.
function list_docs(catalog: DocsCatalog, collection?: string): DocPage[] {
  if (!collection) return catalog.pages
  if (!['elements', 'guides', 'gallery'].includes(collection)) {
    throw new Error('Documentation collection must be elements, guides, or gallery.')
  }
  return catalog.pages.filter(page => page.id.startsWith(collection + '/'))
}

// Normalize names and prose so compound page IDs are searchable as words.
function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
}

// Require every query term and favor names, titles, and descriptions over prose.
function search_docs(catalog: DocsCatalog, query: string, limit = 10): DocPage[] {
  const phrase = normalize(query)
  if (!phrase) throw new Error('Enter a documentation search query.')
  if (!Number.isSafeInteger(limit) || limit < 1) throw new Error('Search limit must be a positive integer.')
  const terms = [...new Set(phrase.split(' '))]
  return catalog.pages.map(page => {
    const fields = [page.id, page.title, page.description, page.category, page.text, page.code]
      .map(normalize)
    const weights = [16, 12, 8, 4, 1, 1]
    let score = 0
    for (const term of terms) {
      const matches = fields.map((field, index) => field.includes(term) ? weights[index] : 0)
      if (!matches.some(Boolean)) return { page, score: 0 }
      score += matches.reduce((sum, weight) => sum + weight, 0)
    }
    if (normalize(page.id.split('/')[1]) === phrase) score += 100
    if (fields[1] === phrase) score += 80
    if (fields[2].includes(phrase)) score += 20
    return { page, score }
  }).filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score || a.page.id.localeCompare(b.page.id))
    .slice(0, limit).map(match => match.page)
}

// Keep retrieval focused, with source and asset instructions alongside the page.
function format_doc(page: DocPage): string {
  const assets = Object.keys(page.assets)
  const note = assets.length ? '\nExample files: ' + assets.map(name => `\`${name}\``).join(', ')
    + `. Export the source and files together with \`gum docs example ${page.id} --output example\`.\n` : ''
  return page.text.trim() + '\n\n## Example\n' + note
    + '\n```jsx\n' + page.code + '\n```\n'
}

export { get_doc, list_docs, search_docs, format_doc }
export type { DocPage, DocsCatalog }
