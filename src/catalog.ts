import { readFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { elementsDir, galleryDir, guidesDir, promptDir } from './dirs'
import {
  listElements, listGuides, listGallery, getElementText, getElementCode,
  getGuideText, getGuideCode, getGalleryText, getGalleryCode,
} from './meta'
import { mapSkillLinks } from './skill'
import { version } from '../package.json'
import type { DocPage, DocsCatalog } from './docs'

// Assemble one serializable snapshot for source hosts and distribution builds.
function build_catalog(): DocsCatalog {
  const collections = [
    { kind: 'elements', dir: elementsDir, entries: listElements(), text: getElementText, code: getElementCode },
    { kind: 'guides', dir: guidesDir, entries: listGuides(), text: getGuideText, code: getGuideCode },
    { kind: 'gallery', dir: galleryDir, entries: listGallery(), text: getGalleryText, code: getGalleryCode },
  ]
  const sources = new Map<string, string>()
  const pages: DocPage[] = []
  for (const { kind, dir, entries, text, code } of collections) {
    for (const { name, title, cat: category, description } of entries) {
      const id = `${kind}/${name}`
      sources.set(join(dir, 'text', name + '.md'), id)
      sources.set(join(dir, 'code', name + '.jsx'), id + '#example')
      pages.push({ id, title, category, description, text: text(name), code: code(name), assets: {} })
    }
  }

  // Resolve links while the original files are available; fail on missing pages.
  for (const page of pages) {
    const [kind, name] = page.id.split('/')
    const dir = collections.find(collection => collection.kind === kind)!.dir
    const source = join(dir, 'text', name + '.md')
    page.text = mapSkillLinks(page.text, target => {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) return target
      const [path, hash] = target.split('#')
      const id = sources.get(resolve(dirname(source), decodeURIComponent(path)))
      if (!id) throw new Error(`${source}: no documentation page for ${target}`)
      return id + (hash && !id.includes('#') ? `#${hash}` : '')
    })

    // The file-loading guides reference literal fixture names next to their JSX.
    const inputs = page.code.matchAll(/\bload(?:CSV|JSON|PNG)\(\s*['"]([^'"]+)['"]/g)
    for (const [, file] of inputs) {
      if (basename(file) !== file) throw new Error(`${page.id}: example fixture must be a filename: ${file}`)
      page.assets[file] = readFileSync(join(guidesDir, 'data', file)).toString('base64')
    }
  }
  const intro = readFileSync(join(promptDir, 'start.md'), 'utf8').trim()
  return { version, intro, pages }
}

export { build_catalog }
