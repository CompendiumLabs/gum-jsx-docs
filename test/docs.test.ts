import { expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { build_catalog } from '../src/catalog'
import { format_doc, get_doc, list_docs, search_docs } from '../src/docs'
import { getElements, getGuides, getGallery } from '../src/meta'
import { guidesDir } from '../src/dirs'
import { mapSkillLinks } from '../src/skill'

const catalog = build_catalog()

test('the portable catalog preserves every page and its original runnable source', () => {
  let count = 0
  for (const [kind, collection] of [
    ['elements', getElements()], ['guides', getGuides()], ['gallery', getGallery()],
  ] as const) {
    expect(list_docs(catalog, kind).map(page => page.id)).toEqual(
      collection.tags.map(name => `${kind}/${name}`))
    for (const name of collection.tags) {
      const page = get_doc(catalog, `${kind}/${name}`)
      expect(page.code).toBe(collection.code[name])
      expect(page.description).toBe(collection.descriptions[name])
      expect(format_doc(page)).toContain('```jsx\n' + page.code + '\n```')
      count++
    }
  }
  expect(catalog.pages).toHaveLength(count)
  expect(new Set(catalog.pages.map(page => page.id)).size).toBe(count)
  expect(() => list_docs(catalog, 'missing')).toThrow('collection')
  expect(() => get_doc(catalog, 'elements/Missing')).toThrow('Unknown documentation page')
})

test('reference links and orientation IDs resolve within the serialized catalog', () => {
  const snapshot = JSON.parse(JSON.stringify(catalog))
  let links = 0
  for (const page of snapshot.pages) {
    mapSkillLinks(page.text, target => {
      if (!/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) {
        expect(get_doc(snapshot, target)).toBeDefined()
        links++
      }
      return target
    })
  }
  expect(links).toBeGreaterThan(100)
  expect(get_doc(snapshot, 'elements/Plot#example').id).toBe('elements/Plot')
  expect(get_doc(snapshot, 'gallery/transformer').text).toContain('(gallery/transformer#example)')
  for (const [, id] of snapshot.intro.matchAll(/`((?:guides|elements|gallery)\/[\w]+)`/g)) {
    expect(get_doc(snapshot, id)).toBeDefined()
  }
})

test('search ranks exact names first and finds multiword descriptions and examples', () => {
  for (const [query, id] of [
    ['plot', 'elements/Plot'], ['textframe', 'elements/TextFrame'],
    ['units', 'guides/units'], ['pendulum physics', 'gallery/pendulum_physics'],
  ]) expect(search_docs(catalog, query)[0].id).toBe(id)
  expect(search_docs(catalog, '  AXIS labels  ')[0].id).toBe('elements/Axis')
  expect(search_docs(catalog, 'plot', 2)).toHaveLength(2)
  expect(search_docs(catalog, 'no_such_gum_feature_9231')).toEqual([])
  expect(() => search_docs(catalog, '  ')).toThrow('query')
  expect(() => search_docs(catalog, 'plot', 0)).toThrow('positive integer')
})

test('file-loading examples carry the original fixtures and export instructions', () => {
  for (const [id, file] of [
    ['guides/load_csv', 'temperatures.csv'], ['guides/load_json', 'survey.json'],
    ['guides/load_png', 'landscape.png'],
  ]) {
    const page = get_doc(catalog, id)
    expect(Object.keys(page.assets)).toEqual([file])
    expect(Buffer.from(page.assets[file], 'base64')).toEqual(readFileSync(join(guidesDir, 'data', file)))
    expect(format_doc(page)).toContain(`gum docs example ${id} --output example`)
  }
  expect(get_doc(catalog, 'elements/Plot').assets).toEqual({})
})
