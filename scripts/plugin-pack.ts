#!/usr/bin/env bun

import { mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { buildPluginSkill, pluginRoot } from './plugin-build'

export function packPlugin(root = pluginRoot,
  archive = join(import.meta.dir, '..', '..', 'dist', 'gum-jsx-plugin.zip')): string {
  buildPluginSkill(root)

  mkdirSync(dirname(archive), { recursive: true })
  rmSync(archive, { force: true })
  const pack = spawnSync('zip', [
    '-q', '-r', '-X', archive,
    'plugin.json', 'skills/gum-jsx', 'assets', 'README.md',
  ], { cwd: root, encoding: 'utf8' })
  if (pack.error || pack.status !== 0) {
    throw new Error(`Could not package plugin: ${pack.error?.message ?? pack.stderr}`)
  }
  return archive
}

if (import.meta.main) {
  console.log(`Packaged ${packPlugin()}`)
}
