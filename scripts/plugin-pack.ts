#!/usr/bin/env bun

import { mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { buildPluginSkill } from './plugin-build'

const docsRoot = join(import.meta.dir, '..')
const pluginRoot = join(docsRoot, 'plugins', 'gum-jsx')
const archive = join(docsRoot, 'dist', 'gum-jsx-plugin.zip')

buildPluginSkill()

mkdirSync(join(docsRoot, 'dist'), { recursive: true })
rmSync(archive, { force: true })
const pack = spawnSync('zip', [
  '-q', '-r', '-X', archive,
  'plugin.json', 'skills/gum-jsx', 'assets', 'README.md',
], { cwd: pluginRoot, encoding: 'utf8' })
if (pack.error || pack.status !== 0) {
  throw new Error(`Could not package plugin: ${pack.error?.message ?? pack.stderr}`)
}
console.log(`Packaged ${archive}`)
