# `@gum-jsx/docs`

The gum.jsx documentation and gallery: the per-element docs pages (`docs/`), the showcase
figures (`gala/`), the loaders that index them into pages, and the Claude skill built out of
them (`skills/gum-jsx`). Pure content plus a small node-only reader — no runtime dependency on
`@gum-jsx/core` or any other sibling, so nothing here evaluates or renders. The examples are
`.jsx` source; the packages that consume them do the rendering:

- `gum-jsx` (`../gum-jsx`): renders every example in strict mode as its test suite
  (`test/run.ts`).
- `@gum-jsx/node` (`../gum-jsx-node`): benchmarks against `docs/code/Plot.jsx` and `docs/data`.

Consumers depend on it by semver range (`^1.7.0`, versioned in lockstep with the other
packages); in the `gum-org` bun workspace that range resolves to this checkout.

## Layout

- `docs/code/` - One `.jsx` example per element. Line one is a `//` comment holding the prompt that example answers, which `prepareDocsCode` splits off
- `docs/text/` - One `.md` page per element, matched to `docs/code` by basename. A `*Category*: <cat>` line under the title files it into a reference page; it's stripped before the page is rendered
- `docs/data/` - The files the examples load (`data.csv`, `image.png`); a consumer reads them with `loadData` or points its own `loadFile` at this directory
- `gala/code/`, `gala/text/` - The gallery figures, again matched by basename
- `src/dirs.ts` - The directories above, resolved relative to this package so consumers don't have to locate it
- `src/meta.ts` - The index is derived from the directories, so there is no metadata file to maintain: `getDocs()`/`getGala()` scan the names and read each page only when it's asked for, `listDocs()`/`listGala()` enumerate them, `getDocsText`/`getDocsCode`/`getGalaText`/`getGalaCode` read a single page, `loadData` reads one of the files the examples load; `prepareDocsPage`/`prepareGalaPage` format a page as Markdown (links flattened to bold, headings pushed down a level, the `*Category*` line dropped)
- `src/index.ts` - `export *` of both
- `prompt/` - The hand-written parts of the skill (`head`, `intro`, `docs`, `refs`, `gen`), concatenated around the generated pages
- `scripts/skill.ts` - Builds the skill; reads `prompt/` and writes `skills/gum-jsx`, so run it from the package root (`bun run skill`). `-o` picks a different output directory
- `skills/gum-jsx/` - The generated skill (committed): `SKILL.md` plus `references/`, one page per category declared by the docs pages and one per gallery entry under `references/gala/`
- `skills/gum-jsx.skill` - The zip of that directory, which is what gets attached to a release

## Usage

Every loader defaults to this package's own directories, so a consumer needs no paths and never
reads a file itself:

```ts
import { getDocs, listDocs, getDocsCode, prepareDocsPage, loadData } from '@gum-jsx/docs'

const { tags, cats, text, code } = getDocs()   // tags: element names; cats: category -> names
const page = prepareDocsPage(text['Box'], code['Box'], true)

const plot = getDocsCode('Plot')               // one page, without indexing the rest
const csv = loadData('data.csv')               // pass loadData itself as an evaluator's loadFile

for (const { name, cat } of listDocs()) {}     // every page on disk; cat is null if unlisted
```

The index comes from the directories themselves. `getDocs()` scans the `text/`+`code/` basenames
and reads each page's `*Category*:` line, then hands back `text`/`code` records whose pages are
read on first access and kept — so indexing costs a directory scan plus a 512-byte header per
page, not all 114 files. Categories and the names inside them are alphabetical. `listDocs()` is
the same index as a list, including pages that declare no category: those are readable but never
rendered into the skill, which `bun run skill` reports (`TextBox` and `UnitLine` today).

Each takes an explicit directory as its last argument for other example sets. The directories are
still exported (`docsCodeDir`, `dataDir`, ...) for consumers that walk the files themselves, like
the `gum-jsx` test runner; the raw files are also reachable through the `./docs/*` and `./gala/*`
subpath exports.

## Commands

```bash
bun tsc --noEmit   # typecheck
bun run skill      # regenerate skills/gum-jsx and zip it to skills/gum-jsx.skill
```

`commander` is a dev dependency for the skill builder's `-o` flag; the package itself has no
runtime dependencies, and only `src`, `docs`, `gala` and `skills/gum-jsx` are published.

There is no test suite here; the examples are rendered in strict mode by `gum-jsx`
(`cd ../gum-jsx && bun test/run.ts`), which is what catches a broken example.

## Adding an example

Add the `.jsx` to `docs/code/` (with its prompt comment on line one) and the matching `.md` to
`docs/text/`, giving the page a `*Category*: <cat>` line under its title — a page that declares no
category is indexed but never rendered into the skill, and `bun run skill` says so. A new category
name just creates a new reference page, so add a matching section to `prompt/refs.md`, which is
what points the model at it. Gallery entries are the same, minus the prompt comment and the
category. Run the `gum-jsx` suite afterwards: an example that fails strict mode fails the build,
and one that deliberately exercises a permissive fallback opts out with a `@nostrict` comment. Then `bun run skill` to fold the new page into the skill, and
commit the regenerated `skills/gum-jsx` alongside it.
