#!/usr/bin/env bun

// Generate the plugin's skill from maintained prompts and documentation.
import { join } from 'node:path'
import { buildSkill } from './skill-build'

export const pluginRoot = join(import.meta.dir, '..', '..', 'plugins', 'gum-jsx')

export function buildPluginSkill(root = pluginRoot): string {
  return buildSkill(join(root, 'skills', 'gum-jsx'))
}

if (import.meta.main) {
  console.log(`Bundled Gum plugin skill in ${buildPluginSkill()}`)
}
