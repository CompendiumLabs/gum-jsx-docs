#!/usr/bin/env bun

import { mkdirSync, rmSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { buildSkill, skillRoot } from './skill-build'

export function packSkill(root = skillRoot,
  archive = join(dirname(skillRoot), 'gum-jsx-skill.zip')): string {
  buildSkill(root)

  mkdirSync(dirname(archive), { recursive: true })
  rmSync(archive, { force: true })
  const pack = spawnSync('zip', ['-q', '-r', '-X', resolve(archive), basename(root)], {
    cwd: dirname(root), encoding: 'utf8',
  })
  if (pack.error || pack.status !== 0) {
    throw new Error(`Could not package skill: ${pack.error?.message ?? pack.stderr}`)
  }
  return archive
}

if (import.meta.main) {
  console.log(`Packaged ${packSkill()}`)
}
