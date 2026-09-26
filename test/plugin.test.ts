import { afterAll, expect, test } from 'bun:test'
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync,
  rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildSkillFiles } from '../src'
import { buildPluginSkill, pluginRoot } from '../scripts/plugin-build'
import { packPlugin } from '../scripts/plugin-pack'

const scratch = mkdtempSync(join(tmpdir(), 'gum-jsx-plugin-test-'))
afterAll(() => rmSync(scratch, { recursive: true, force: true }))
const files = buildSkillFiles()

function fixture(name: string): string {
  const root = join(scratch, name)
  mkdirSync(root)
  for (const file of ['plugin.json', 'README.md', 'assets']) {
    cpSync(join(pluginRoot, file), join(root, file), { recursive: true })
  }
  return root
}

test('rebuilding replaces only the plugin authoring skill and removes retired references', () => {
  const root = fixture('build')
  const output = buildPluginSkill(root)
  writeFileSync(join(output, 'references', 'retired.md'), 'retired reference')
  const sibling = join(root, 'skills', 'another-skill')
  mkdirSync(sibling)
  writeFileSync(join(sibling, 'SKILL.md'), 'another skill')
  const manifest = readFileSync(join(root, 'plugin.json'), 'utf8')

  buildPluginSkill(root)

  expect(existsSync(join(output, 'references', 'retired.md'))).toBe(false)
  expect(readFileSync(join(sibling, 'SKILL.md'), 'utf8')).toBe('another skill')
  expect(readFileSync(join(root, 'plugin.json'), 'utf8')).toBe(manifest)
  for (const [file, content] of files) expect(readFileSync(join(output, file), 'utf8')).toBe(content)
})

test('packing rebuilds the skill and creates a fresh installable plugin ZIP', () => {
  const root = fixture('package')
  const output = buildPluginSkill(root)
  writeFileSync(join(output, 'SKILL.md'), 'outdated build')
  writeFileSync(join(output, 'references', 'retired.md'), 'retired reference')
  writeFileSync(join(root, 'notes.txt'), 'local notes')
  const archive = join(scratch, 'gum-jsx-plugin.zip')
  const oldZip = spawnSync('zip', ['-q', archive, 'notes.txt'], { cwd: root })
  expect(oldZip.status).toBe(0)

  expect(packPlugin(root, archive)).toBe(archive)

  const zipTest = spawnSync('unzip', ['-tq', archive], { encoding: 'utf8' })
  expect(zipTest.status, zipTest.stderr).toBe(0)
  const zipList = spawnSync('unzip', ['-Z1', archive], { encoding: 'utf8' })
  expect(zipList.status).toBe(0)
  const entries = zipList.stdout.trim().split('\n').filter(file => !file.endsWith('/')).sort()
  const assets = readdirSync(join(root, 'assets')).map(file => `assets/${file}`)
  expect(entries).toEqual(['plugin.json', 'README.md', ...assets,
    ...[...files.keys()].map(file => `skills/gum-jsx/${file}`)].sort())

  const extracted = join(scratch, 'extracted')
  const unzip = spawnSync('unzip', ['-q', archive, '-d', extracted], { encoding: 'utf8' })
  expect(unzip.status, unzip.stderr).toBe(0)
  for (const [file, content] of files) {
    expect(readFileSync(join(extracted, 'skills/gum-jsx', file), 'utf8')).toBe(content)
  }
  const manifest = JSON.parse(readFileSync(join(extracted, 'plugin.json'), 'utf8'))
  expect(manifest.name).toBe('gum-jsx')
  for (const field of ['logo', 'composerIcon']) {
    expect(existsSync(join(extracted, manifest.extensions['com.openai'].interface[field]))).toBe(true)
  }
  expect(readFileSync(join(root, 'notes.txt'), 'utf8')).toBe('local notes')
})
