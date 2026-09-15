import { fileURLToPath } from 'node:url'

// Content is located relative to the package, never the caller's working directory.
const packageRoot = fileURLToPath(new URL('../', import.meta.url))
const elementsDir = fileURLToPath(new URL('../elements/', import.meta.url))
const elementsTextDir = fileURLToPath(new URL('../elements/text/', import.meta.url))
const elementsCodeDir = fileURLToPath(new URL('../elements/code/', import.meta.url))
const topicsDir = fileURLToPath(new URL('../topics/', import.meta.url))
const topicsTextDir = fileURLToPath(new URL('../topics/text/', import.meta.url))
const topicsCodeDir = fileURLToPath(new URL('../topics/code/', import.meta.url))
const visualTestsDir = fileURLToPath(new URL('../visual-tests/', import.meta.url))
const visualTestsCodeDir = fileURLToPath(new URL('../visual-tests/code/', import.meta.url))

export { packageRoot, elementsDir, elementsTextDir, elementsCodeDir,
  topicsDir, topicsTextDir, topicsCodeDir, visualTestsDir, visualTestsCodeDir }
