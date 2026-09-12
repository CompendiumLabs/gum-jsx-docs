import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { docsDir, galaDir } from './dirs';

type DocsEntry = Readonly<{ name: string; title: string; cat: string }>;
type GalaEntry = Readonly<{ name: string; title: string }>;
type GalaInfo = { tags: string[]; text: Record<string, string>; code: Record<string, string> };
type DocsInfo = GalaInfo & { cats: Record<string, string[]> };

const category = /^\*Category\*:[ \t]*(.+?)[ \t]*$/m;
const stripCategory = /^\*Category\*:[ \t]*.*\r?\n(?:\r?\n)?/m;
const categories = ['core', 'layout', 'geometry', 'plotting', 'text', 'api'];

function pageName(name: string): string {
  if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(name)) throw new Error('Invalid documentation page name');
  return name;
}

function names(dir: string): string[] {
  const text = readdirSync(join(dir, 'text')).filter(file => file.endsWith('.md'))
    .map(file => pageName(file.slice(0, -3))).sort();
  const code = readdirSync(join(dir, 'code')).filter(file => file.endsWith('.jsx'))
    .map(file => pageName(file.slice(0, -4))).sort();
  if (JSON.stringify(text) !== JSON.stringify(code)) {
    throw new Error(`Every page in ${dir} needs matching text/<name>.md and code/<name>.jsx files`);
  }
  return text;
}

function read(dir: string, kind: 'text' | 'code', name: string): string {
  return readFileSync(join(dir, kind, `${pageName(name)}.${kind === 'text' ? 'md' : 'jsx'}`), 'utf8').trim();
}

function title(text: string, name: string): string {
  const value = /^# (.+)$/m.exec(text)?.[1];
  if (!value) throw new Error(`${name} needs a Markdown title`);
  return value;
}

// Derive the catalog from the files, as in gum-jsx-docs. No second manifest to maintain.
function listDocs(dir = docsDir): DocsEntry[] {
  return names(dir).map(name => {
    const text = read(dir, 'text', name);
    const cat = category.exec(text)?.[1];
    if (!cat || !categories.includes(cat)) throw new Error(`${name} needs a known *Category*: line`);
    return { name, title: title(text, name), cat };
  }).sort((a, b) => categories.indexOf(a.cat) - categories.indexOf(b.cat)
    || a.name.localeCompare(b.name));
}

function listGala(dir = galaDir): GalaEntry[] {
  return names(dir).map(name => ({ name, title: title(read(dir, 'text', name), name) }));
}

function getDocsText(name: string, dir = docsDir): string {
  return read(dir, 'text', name).replace(stripCategory, '');
}
function getDocsCode(name: string, dir = docsDir): string { return read(dir, 'code', name); }
function getGalaText(name: string, dir = galaDir): string { return read(dir, 'text', name); }
function getGalaCode(name: string, dir = galaDir): string { return read(dir, 'code', name); }

function getDocs(dir = docsDir): DocsInfo {
  const entries = listDocs(dir);
  const cats: Record<string, string[]> = {};
  for (const { name, cat } of entries) (cats[cat] ??= []).push(name);
  const tags = entries.map(entry => entry.name);
  return { tags, cats,
    text: Object.fromEntries(tags.map(name => [name, getDocsText(name, dir)])),
    code: Object.fromEntries(tags.map(name => [name, getDocsCode(name, dir)])) };
}

function getGala(dir = galaDir): GalaInfo {
  const tags = listGala(dir).map(entry => entry.name);
  return { tags,
    text: Object.fromEntries(tags.map(name => [name, getGalaText(name, dir)])),
    code: Object.fromEntries(tags.map(name => [name, getGalaCode(name, dir)])) };
}

// Preserve Markdown links; the viewer can resolve them relative to the source page.
function prepareDocsPage(text: string, code: string): string {
  return text.replace(stripCategory, '').trim() + '\n\n## Example\n\n'
    + '```jsx\n' + code.trim() + '\n```\n';
}
function prepareGalaPage(text: string, code: string): string {
  return prepareDocsPage(text, code);
}

export { listDocs, getDocs, getDocsText, getDocsCode, prepareDocsPage };
export { listGala, getGala, getGalaText, getGalaCode, prepareGalaPage };
export type { DocsEntry, DocsInfo, GalaEntry, GalaInfo };
