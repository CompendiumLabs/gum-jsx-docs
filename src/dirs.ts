import { fileURLToPath } from 'node:url'

// Content is located relative to the package, never the caller's working directory.
const packageRoot = fileURLToPath(new URL('../', import.meta.url))
const promptDir = fileURLToPath(new URL('../prompt/', import.meta.url))
const docsDir = fileURLToPath(new URL('../docs/', import.meta.url))
const elementsDir = fileURLToPath(new URL('../docs/elements/', import.meta.url))
const elementsTextDir = fileURLToPath(new URL('../docs/elements/text/', import.meta.url))
const elementsCodeDir = fileURLToPath(new URL('../docs/elements/code/', import.meta.url))
const guidesDir = fileURLToPath(new URL('../docs/guides/', import.meta.url))
const guidesTextDir = fileURLToPath(new URL('../docs/guides/text/', import.meta.url))
const guidesCodeDir = fileURLToPath(new URL('../docs/guides/code/', import.meta.url))
const galleryDir = fileURLToPath(new URL('../docs/gallery/', import.meta.url))
const galleryTextDir = fileURLToPath(new URL('../docs/gallery/text/', import.meta.url))
const galleryCodeDir = fileURLToPath(new URL('../docs/gallery/code/', import.meta.url))
// Compatibility for hosts using the original topic loaders.
const topicsDir = galleryDir
const topicsTextDir = galleryTextDir
const topicsCodeDir = galleryCodeDir
const visualTestsDir = fileURLToPath(new URL('../visual-tests/', import.meta.url))
const visualTestsCodeDir = fileURLToPath(new URL('../visual-tests/code/', import.meta.url))

export { packageRoot, promptDir, docsDir, elementsDir, elementsTextDir, elementsCodeDir,
  guidesDir, guidesTextDir, guidesCodeDir,
  galleryDir, galleryTextDir, galleryCodeDir,
  topicsDir, topicsTextDir, topicsCodeDir, visualTestsDir, visualTestsCodeDir }
