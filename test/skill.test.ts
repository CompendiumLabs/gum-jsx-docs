import { afterAll, expect, test } from 'bun:test'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync,
  symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { delimiter, dirname, join } from 'node:path'
import * as core from '@gum-jsx/core'
import * as math from '@gum-jsx/math'
import { getElements, getGuides, getGallery, getTopics, packageRoot, promptDir } from '../src'
import { buildSkill, buildSkillFiles } from '../scripts/skill'

const scratch = mkdtempSync(join(tmpdir(), 'gum-jsx-skill-test-'))
afterAll(() => rmSync(scratch, { recursive: true, force: true }))
const files = buildSkillFiles()

function links(markdown: string): string[] {
  const prose = markdown.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '')
  return [...prose.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)].map(match => match[1])
}

test('the skill includes every element, guide, and gallery page exactly once with unmodified JSX', () => {
  const elements = getElements(), guides = getGuides(), gallery = getGallery()
  expect(files.size).toBe(4 + elements.tags.length + getTopics().tags.length)
  for (const [kind, collection] of [['elements', elements], ['guides', guides], ['gallery', gallery]] as const) {
    for (const name of collection.tags) {
      const page = files.get(`references/${kind}/${name}.md`)
      expect(page).toBeDefined()
      expect(page).toContain('```jsx\n' + collection.code[name] + '\n```')
      expect(page).not.toContain('*Category*:')
    }
  }
  expect(files.has('references/elements/PngImage.md')).toBe(true)
  expect(files.has('references/guides/Sizing.md')).toBe(true)
  expect(files.has('references/gallery/shape_algebra.md')).toBe(true)
})

test('all packaged references are reachable from SKILL.md without leaving the skill', () => {
  const visited = new Set<string>()
  const pending = ['SKILL.md']
  while (pending.length) {
    const file = pending.pop()!
    if (visited.has(file)) continue
    visited.add(file)
    const markdown = files.get(file)
    expect(markdown).toBeDefined()
    for (const target of links(markdown!)) {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target)) continue
      const [path, anchor] = target.split('#')
      const destination = path ? join(dirname(file), decodeURIComponent(path)) : file
      expect(files.has(destination)).toBe(true)
      if (anchor === 'example') expect(files.get(destination)).toContain('\n## Example\n')
      pending.push(destination)
    }
  }
  expect([...visited].sort()).toEqual([...files.keys()].sort())
  // Former links into gala/code now lead to the source embedded in each page.
  expect(links(files.get('references/gallery/transformer.md')!)).toContain('transformer.md#example')
  expect(links(files.get('references/guides/CLI.md')!)).toContain(
    'https://github.com/CompendiumLabs/gum-jsx-pdf/blob/master/README.md')
})

test('every complete JSX example in the maintained prompts renders with the current API', () => {
  const fonts = math.createMathFonts()
  const pass = new core.LayoutPass({ fonts: { value: fonts, version: fonts.version } })
  let examples = 0
  for (const file of readdirSync(promptDir).filter(file => file.endsWith('.md'))) {
    const markdown = readFileSync(join(promptDir, file), 'utf8')
    for (const match of markdown.matchAll(/^```jsx\n([\s\S]*?)^```/gm)) {
      const element = core.evaluate(match[1], { name: `${file}:${examples}`, scope: math })
      expect(element).toBeInstanceOf(core.Element)
      const fragment = pass.layout(core.make_viewport(element))
      expect(fragment.size.width).toBeGreaterThan(0)
      expect(fragment.size.height).toBeGreaterThan(0)
      const svg = core.render_svg(fragment)
      expect(svg).toStartWith('<svg ')
      expect(svg).not.toMatch(/NaN|Infinity/)
      expect(svg).toMatch(/<(?:path|rect|ellipse)\b/)
      examples++
    }
  }
  expect(examples).toBeGreaterThan(0)
})

test('documented gum commands render files from outside the workspace', () => {
  const output = join(scratch, 'global commands')
  mkdirSync(output)
  const intro = readFileSync(join(promptDir, 'intro.md'), 'utf8')
  const source = /^```jsx\n([\s\S]*?)^```/m.exec(intro)![1]
  writeFileSync(join(output, 'figure.jsx'), source)
  const generation = readFileSync(join(promptDir, 'gen.md'), 'utf8')
  const commands = [...generation.matchAll(/^```sh\n([\s\S]*?)^```/gm)].map(match => match[1])
  expect(commands.length).toBeGreaterThan(0)
  // Use the workspace's installed executables without changing the user's
  // global installation. The documented commands run with only PATH setup.
  const result = spawnSync('sh', ['-eu', '-c', commands.join('\n')], {
    cwd: output, encoding: 'utf8', env: { ...process.env,
      PATH: [join(packageRoot, '../node_modules/.bin'), dirname(process.execPath), process.env.PATH]
        .filter(Boolean).join(delimiter) },
  })
  expect(result.status).toBe(0)
  expect(readFileSync(join(output, 'figure.svg'), 'utf8')).toStartWith('<svg ')
  expect([...readFileSync(join(output, 'figure.png')).subarray(0, 8)])
    .toEqual([137, 80, 78, 71, 13, 10, 26, 10])
  const fragment = JSON.parse(readFileSync(join(output, 'figure.json'), 'utf8'))
  expect(fragment.size.width).toBeGreaterThan(0)
  expect(fragment.size.height).toBeGreaterThan(0)
  expect(JSON.parse(result.stderr).layouts).toBeGreaterThan(0)
})

test('rebuilds prune only obsolete generated pages and create a fresh portable ZIP', () => {
  const output = join(scratch, 'custom output')
  buildSkill({ output, archive: false })
  const manifest = join(output, '.gum-jsx-generated.json')
  const prior = JSON.parse(readFileSync(manifest, 'utf8')) as string[]
  writeFileSync(join(output, 'references', 'retired.md'), 'obsolete generated page')
  writeFileSync(manifest, JSON.stringify([...prior, 'references/retired.md']))
  writeFileSync(join(output, 'notes.txt'), 'local notes')

  // An existing ZIP must be replaced, not updated with potentially stale entries.
  const oldZip = spawnSync('zip', ['-q', `${output}.skill`, 'notes.txt'], { cwd: output })
  expect(oldZip.status).toBe(0)
  const result = buildSkill({ output })
  expect(result.archive).toBe(`${output}.skill`)
  expect(existsSync(join(output, 'references', 'retired.md'))).toBe(false)
  expect(readFileSync(join(output, 'notes.txt'), 'utf8')).toBe('local notes')
  const zipTest = spawnSync('unzip', ['-tq', result.archive!], { encoding: 'utf8' })
  expect(zipTest.status).toBe(0)
  const zipList = spawnSync('unzip', ['-Z1', result.archive!], { encoding: 'utf8' })
  expect(zipList.status).toBe(0)
  const entries = zipList.stdout.trim().split('\n').filter(file => !file.endsWith('/')).sort()
  expect(entries).toEqual([...files.keys()].map(file => `gum-jsx/${file}`).sort())
  for (const [file, content] of files) expect(readFileSync(join(output, file), 'utf8')).toBe(content)
  const entrypoint = spawnSync('unzip', ['-p', result.archive!, 'gum-jsx/SKILL.md'], { encoding: 'utf8' })
  expect(entrypoint.stdout).toBe(files.get('SKILL.md')!)
})

test('the generator refuses unrelated output directories, unsafe manifests, and symlinks', () => {
  const unrelated = join(scratch, 'unrelated')
  mkdirSync(unrelated)
  writeFileSync(join(unrelated, 'keep.txt'), 'keep')
  expect(() => buildSkill({ output: unrelated, archive: false })).toThrow('non-generated directory')
  expect(readdirSync(unrelated)).toEqual(['keep.txt'])

  const poisoned = join(scratch, 'poisoned')
  mkdirSync(poisoned)
  writeFileSync(join(poisoned, '.gum-jsx-generated.json'), JSON.stringify(['../unrelated/keep.txt']))
  expect(() => buildSkill({ output: poisoned, archive: false })).toThrow('Invalid skill build manifest')
  expect(readFileSync(join(unrelated, 'keep.txt'), 'utf8')).toBe('keep')

  const linked = join(scratch, 'linked')
  buildSkill({ output: linked, archive: false })
  const destination = join(scratch, 'must-not-be-created')
  rmSync(join(linked, 'SKILL.md'))
  symlinkSync(destination, join(linked, 'SKILL.md'))
  expect(() => buildSkill({ output: linked, archive: false })).toThrow('symlink')
  expect(existsSync(destination)).toBe(false)
})

function cli(args: string[]) {
  return spawnSync(process.execPath, [join(packageRoot, 'scripts', 'skill.ts'), ...args], {
    cwd: scratch, encoding: 'utf8', env: { ...process.env, PATH: join(scratch, 'no-executables') },
  })
}

test('CLI custom outputs are cwd-relative, sources are package-relative, and directory-only needs no zip', () => {
  const result = cli(['--output', 'directory only', '--no-archive'])
  expect(result.status).toBe(0)
  const output = join(scratch, 'directory only')
  expect(readFileSync(join(output, 'SKILL.md'), 'utf8')).toBe(files.get('SKILL.md')!)
  expect(existsSync(`${output}.skill`)).toBe(false)
  const help = cli(['--help'])
  expect(help.status).toBe(0)
  expect(help.stdout).toContain(join(packageRoot, 'skills', 'gum-jsx'))
  expect(cli(['--unknown']).status).toBe(1)
})

test('a missing zip executable fails clearly before modifying an existing build', () => {
  const output = join(scratch, 'zip unavailable')
  buildSkill({ output, archive: false })
  writeFileSync(join(output, 'SKILL.md'), 'previous build')
  writeFileSync(`${output}.skill`, 'previous archive')
  const result = cli(['-o', output])
  expect(result.status).toBe(1)
  expect(result.stderr).toContain('Install zip or use --no-archive')
  expect(readFileSync(join(output, 'SKILL.md'), 'utf8')).toBe('previous build')
  expect(readFileSync(`${output}.skill`, 'utf8')).toBe('previous archive')
})
