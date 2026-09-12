import { fileURLToPath } from 'node:url';

// Content is located relative to the package, never the caller's working directory.
const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const docsDir = fileURLToPath(new URL('../docs/', import.meta.url));
const docsTextDir = fileURLToPath(new URL('../docs/text/', import.meta.url));
const docsCodeDir = fileURLToPath(new URL('../docs/code/', import.meta.url));
const galaDir = fileURLToPath(new URL('../gala/', import.meta.url));
const galaTextDir = fileURLToPath(new URL('../gala/text/', import.meta.url));
const galaCodeDir = fileURLToPath(new URL('../gala/code/', import.meta.url));

export { packageRoot, docsDir, docsTextDir, docsCodeDir, galaDir, galaTextDir, galaCodeDir };
