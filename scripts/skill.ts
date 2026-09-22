#!/usr/bin/env bun

// Build the portable skill from maintained prompt pieces and current docs.
// Source/default paths are package-relative; an explicit output is cwd-relative.
import { spawnSync } from 'node:child_process'
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync,
  rmSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { parseArgs } from 'node:util'
import { packageRoot, buildSkillFiles } from '../src'
import type { SkillFiles } from '../src'

export { buildSkillFiles } from '../src'

const skillName = 'gum-jsx'
const defaultOutput = join(packageRoot, 'skills', skillName)
const manifestName = '.gum-jsx-generated.json'
function generatedPath(path: unknown): path is string {
  return typeof path === 'string' && (path === 'SKILL.md'
    || /^references\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.md$/.test(path))
}

function previousFiles(output: string): string[] {
  const stat = lstatSync(output, { throwIfNoEntry: false })
  if (!stat) return []
  if (!stat.isDirectory()) throw new Error(`Output must be a directory, not a file or symlink: ${output}`)
  const manifest = join(output, manifestName)
  const manifestStat = lstatSync(manifest, { throwIfNoEntry: false })
  if (!manifestStat) {
    if (readdirSync(output).length) throw new Error(`Refusing to overwrite a non-generated directory: ${output}`)
    return []
  }
  if (!manifestStat.isFile()) throw new Error(`Invalid skill build manifest: ${manifest}`)
  const files: unknown = JSON.parse(readFileSync(manifest, 'utf8'))
  if (!Array.isArray(files) || !files.every(generatedPath)) throw new Error(`Invalid skill build manifest: ${manifest}`)
  return files
}

function checkOutputPaths(output: string, files: string[]): void {
  for (const file of files) {
    let path = output
    const parts = file.split('/')
    for (const [index, part] of parts.entries()) {
      path = join(path, part)
      const stat = lstatSync(path, { throwIfNoEntry: false })
      if (!stat) continue
      if (index === parts.length - 1 ? !stat.isFile() : !stat.isDirectory()) {
        throw new Error(`Refusing to replace a directory, special file, or symlink: ${path}`)
      }
    }
  }
}

function writeFiles(output: string, files: SkillFiles): void {
  for (const [name, content] of files) {
    const path = join(output, name)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, content)
  }
}

function archiveFiles(files: SkillFiles): Buffer {
  // Build a fresh ZIP, not an update of the previous archive. Only generated
  // pages are included; local notes and the build manifest stay out of it.
  const scratch = mkdtempSync(join(tmpdir(), 'gum-jsx-skill-'))
  try {
    writeFiles(join(scratch, skillName), files)
    const archive = join(scratch, `${skillName}.skill`)
    const result = spawnSync('zip', ['-q', '-r', '-X', archive, skillName], { cwd: scratch, encoding: 'utf8' })
    if (result.error || result.status !== 0) {
      throw new Error(`Could not create skill archive. Install zip or use --no-archive.\n${result.error?.message ?? result.stderr ?? result.stdout}`)
    }
    return readFileSync(archive)
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}

export function buildSkill(options: { output?: string; archive?: boolean } = {}) {
  const output = resolve(options.output ?? defaultOutput)
  const files = buildSkillFiles()
  const previous = previousFiles(output)
  checkOutputPaths(output, [...previous, ...files.keys()])
  // Detect missing zip before modifying the destination.
  const archive = options.archive === false ? undefined : `${output}.skill`
  const archiveStat = archive ? lstatSync(archive, { throwIfNoEntry: false }) : undefined
  if (archiveStat && !archiveStat.isFile()) throw new Error(`Refusing to overwrite a non-file archive: ${archive}`)
  const bytes = archive ? archiveFiles(files) : undefined
  writeFiles(output, files)
  for (const file of previous) {
    const path = join(output, file)
    if (!files.has(file) && existsSync(path)) unlinkSync(path)
  }
  writeFileSync(join(output, manifestName), JSON.stringify([...files.keys()].sort(), null, 2) + '\n')
  if (archive && bytes) writeFileSync(archive, bytes)
  return { output, archive, pages: files.size }
}

if (import.meta.main) {
  try {
    const { values } = parseArgs({ options: {
      output: { type: 'string', short: 'o' },
      'no-archive': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' },
    } })
    if (values.help) {
      console.log(`Usage: bun scripts/skill.ts [-o <directory>] [--no-archive]

Build the current Gum skill from prompt/ and docs/.
  -o, --output <directory>  Skill directory (default: ${defaultOutput})
      --no-archive          Write the directory only; no zip executable needed
  -h, --help                Show this help

The archive is <output>.skill and contains a gum-jsx/ folder.
Explicit output paths are relative to the current working directory.`)
    } else {
      const result = buildSkill({ output: values.output, archive: !values['no-archive'] })
      console.log(`Built ${result.pages} pages in ${result.output}`)
      if (result.archive) console.log(`Packaged ${result.archive}`)
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
