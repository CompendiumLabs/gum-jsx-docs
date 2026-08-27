# `@gum-jsx/docs`

The gum.jsx documentation and gallery: the per-element docs pages (`docs/`), the showcase
figures (`gala/`), the loaders that index them into pages, and the Claude skill built out of
them (`skills/gum-jsx`). Pure content plus a small node-only reader — no runtime dependency on
`@gum-jsx/core` or any other sibling, so nothing here evaluates or renders. The examples are
`.jsx` source; the packages that consume them do the rendering:

- `gum-jsx` (`../gum-jsx`): renders every example in strict mode as its test suite
  (`scripts/test.ts`).
- `@gum-jsx/node` (`../gum-jsx-node`): benchmarks against `docs/code/Plot.jsx` and `docs/data`.

While unpublished this is a `link:` dependency (`bun link` here, then `bun install` in the
consumer); switch to a semver range when publishing.

## Layout

- `docs/code/` - One `.jsx` example per element. Line one is a `//` comment holding the prompt that example answers, which `prepareDocsCode` splits off
- `docs/text/` - One `.md` page per element, matched to `docs/code` by basename
- `docs/data/` - The files the examples load (`data.csv`, `image.png`); a consumer points its `loadFile` at this directory
- `docs/meta.json` - Category → element names, in presentation order; the categories become the skill's reference pages
- `gala/code/`, `gala/text/` - The gallery figures, again matched by basename
- `gala/meta.json` - The gallery entries in presentation order
- `src/dirs.ts` - The directories above, resolved relative to this package so consumers don't have to locate it
- `src/meta.ts` - `getDocs()`/`getGala()` index the text and code by name; `prepareDocsPage`/`prepareGalaPage` format one as Markdown (links flattened to bold, headings pushed down a level)
- `src/index.ts` - `export *` of both
- `prompt/` - The hand-written parts of the skill (`head`, `intro`, `docs`, `refs`, `gen`), concatenated around the generated pages
- `scripts/skill.ts` - Builds the skill; reads `prompt/` and writes `skills/gum-jsx`, so run it from the package root (`bun run skill`). `-o` picks a different output directory
- `skills/gum-jsx/` - The generated skill (committed): `SKILL.md` plus `references/`, one page per `docs/meta.json` category and one per gallery entry under `references/gala/`
- `skills/gum-jsx.skill` - The zip of that directory, which is what gets attached to a release

## Usage

`getDocs` and `getGala` default to this package's own directories, so a consumer needs no paths:

```ts
import { getDocs, getGala, prepareDocsPage, dataDir, docsCodeDir, galaCodeDir } from '@gum-jsx/docs'

const { tags, cats, text, code } = getDocs()   // tags: element names; cats: docs/meta.json
const page = prepareDocsPage(text['Box'], code['Box'], true)
```

Both still take an explicit directory for other example sets. The raw files are also reachable
through the `./docs/*` and `./gala/*` subpath exports.

## Commands

```bash
bun tsc --noEmit   # typecheck
bun run skill      # regenerate skills/gum-jsx and zip it to skills/gum-jsx.skill
```

`commander` is a dev dependency for the skill builder's `-o` flag; the package itself has no
runtime dependencies, and only `src`, `docs`, `gala` and `skills/gum-jsx` are published.

There is no test suite here; the examples are rendered in strict mode by `gum-jsx`
(`cd ../gum-jsx && bun scripts/test.ts`), which is what catches a broken example.

## Adding an example

Add the `.jsx` to `docs/code/` (with its prompt comment on line one) and the matching `.md` to
`docs/text/`, then list the element in `docs/meta.json` under a category — a page missing from
`meta.json` is indexed but never rendered into the skill. Gallery entries are the same, minus the
prompt comment, listed in `gala/meta.json`. Run the `gum-jsx` suite afterwards: an example that
fails strict mode fails the build, and one that deliberately exercises a permissive fallback opts
out with a `@nostrict` comment. Then `bun run skill` to fold the new page into the skill, and
commit the regenerated `skills/gum-jsx` alongside it.
