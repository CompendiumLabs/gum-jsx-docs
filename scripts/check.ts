import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import * as core from 'gum-next-core';
import { docsDir, galaDir, packageRoot, listDocs, listGala,
  getDocs, getGala, prepareDocsPage, prepareGalaPage } from '../src';

// A content smoke check, not a separate CLI or layout test suite.
// Only checked-in, trusted JSX is evaluated; evaluate() is not a sandbox.
const docs = getDocs();
const gala = getGala();
const entries = [
  ...listDocs().map(entry => ({ ...entry, dir: docsDir, collection: docs })),
  ...listGala().map(entry => ({ ...entry, dir: galaDir, collection: gala })),
];

for (const [name, value] of Object.entries(core)) {
  if (typeof value === 'function' && value.prototype instanceof core.Element) {
    assert.ok(docs.tags.includes(name), `Missing reference for ${name}`);
  }
}

function checkLinks(file: string): void {
  const markdown = readFileSync(file, 'utf8');
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1]!;
    if (/^(?:[a-z]+:|#)/i.test(target)) continue;
    assert.ok(!target.startsWith('/'), `${file}: use a relative link, not a future viewer route: ${target}`);
    const path = decodeURIComponent(target.split('#')[0]!);
    assert.ok(existsSync(resolve(dirname(file), path)), `${file}: broken link to ${target}`);
  }
}

checkLinks(join(packageRoot, 'README.md'));
let drawings = 0;
for (const { name, title, dir, collection } of entries) {
  const code = collection.code[name]!;
  const text = collection.text[name]!;
  const file = join(dir, 'code', name + '.jsx');
  assert.ok(code.startsWith('// '), `${file}: describe the example on its first line`);
  checkLinks(join(dir, 'text', name + '.md'));
  const element = core.evaluate(code, { name: file });
  assert.ok(element instanceof core.Svg, `${file}: examples should include their viewport`);
  const fragment = new core.LayoutPass().layout(element);
  assert.ok(fragment.size.width > 0 && fragment.size.height > 0, `${file}: empty viewport`);
  const svg = core.render_svg(fragment, { title, id_prefix: name });
  assert.ok(svg.startsWith('<svg ') && svg.endsWith('</svg>'), `${file}: invalid SVG envelope`);
  assert.ok(!/NaN|Infinity/.test(svg), `${file}: nonfinite geometry`);
  assert.ok(/<(?:path|rect|ellipse)\b/.test(svg), `${file}: no drawing`);
  const page = dir === docsDir ? prepareDocsPage(text, code) : prepareGalaPage(text, code);
  assert.ok(page.includes(code) && page.includes('# ' + title), `${file}: incomplete prepared page`);
  drawings++;
  console.log(`ok - ${dir === docsDir ? 'docs' : 'gala'}/${name}: ${fragment.size.width} × ${fragment.size.height}`);
}

// Notice unindexed Markdown at the collection root rather than silently omitting it.
for (const dir of [docsDir, galaDir]) {
  assert.ok(!readdirSync(dir).some(file => file.endsWith('.md')), `${dir}: put pages in text/`);
}
console.log(`${docs.tags.length} reference pages and ${gala.tags.length} showcases checked; ${drawings} examples rendered.`);
