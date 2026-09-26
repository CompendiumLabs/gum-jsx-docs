#!/usr/bin/env bun

// Generate the plugin's skill from maintained prompts and documentation.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { buildSkillFiles } from '../src'

export const pluginRoot = join(import.meta.dir, '..', '..', 'plugins', 'gum-jsx')

export function buildPluginSkill(root = pluginRoot): string {
  const files = buildSkillFiles()

  const output = join(root, 'skills', 'gum-jsx')
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
