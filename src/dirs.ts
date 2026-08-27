// The docs and gallery directories, located relative to this package
//
// These let consumers reach the examples without resolving the package
// themselves; they work the same whether the package is linked or installed.

import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// the package root, one level up from src/
const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// documentation: one page per element, plus the data its examples load
const docsDir = join(packageRoot, 'docs')
const docsCodeDir = join(docsDir, 'code')
const docsTextDir = join(docsDir, 'text')
const dataDir = join(docsDir, 'data')

// the hand-written prompt pieces the skill is built around, for consumers that
// assemble their own variant of it
const promptDir = join(packageRoot, 'prompt')

// gallery: one page per showcase figure
const galaDir = join(packageRoot, 'gala')
const galaCodeDir = join(galaDir, 'code')
const galaTextDir = join(galaDir, 'text')

export { packageRoot, docsDir, docsCodeDir, docsTextDir, dataDir, galaDir, galaCodeDir, galaTextDir, promptDir }
