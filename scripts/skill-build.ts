#!/usr/bin/env bun

import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { buildSkillFiles } from '../src'

export const skillRoot = join(import.meta.dir, '..', 'dist', 'gum-jsx')

export function buildSkill(output = skillRoot): string {
  const files = buildSkillFiles()
  rmSync(output, { recursive: true, force: true })
  for (const [name, content] of files) {
    const path = join(output, name)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, content)
  }
  return output
}

if (import.meta.main) {
  console.log(`Bundled Gum skill in ${buildSkill()}`)
}
