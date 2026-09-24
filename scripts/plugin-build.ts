#!/usr/bin/env bun

// Bundle the same files as the standalone Gum JSX skill generator.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { buildSkillFiles } from '../src'

export function buildPluginSkill(): string {
  const files = buildSkillFiles()

  const output = join(import.meta.dir, '..', 'plugins', 'gum-jsx', 'skills', 'gum-jsx')
  rmSync(output, { recursive: true, force: true })
  for (const [name, content] of files) {
    const path = join(output, name)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, content)
  }
  return output
}

if (import.meta.main) {
  console.log(`Bundled Gum JSX plugin skill in ${buildPluginSkill()}`)
}
