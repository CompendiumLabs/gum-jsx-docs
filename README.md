# @gum-jsx/docs

The documentation and gallery examples for [gum.jsx](https://github.com/CompendiumLabs/gum.jsx):
a `.jsx` example and a Markdown page for every element (`docs/`), plus the showcase figures
(`gala/`). This package is content — it has no dependencies and renders nothing itself. The
`gum-jsx` package renders these examples as its test suite and builds the Claude skill out of
them.

## Install

```bash
npm install @gum-jsx/docs
```

## Usage

The loaders index the text and code by name and default to this package's own directories:

```js
import { getDocs, getGala, prepareDocsPage, docsCodeDir, dataDir } from '@gum-jsx/docs'

const { tags, cats, text, code } = getDocs()
console.log(tags)                                  // ['Gum', 'Element', 'Group', ...]
console.log(prepareDocsPage(text.Box, code.Box))   // one Markdown page with its example
```

`cats` is the category → element mapping from `docs/meta.json`; `getGala()` returns the gallery
the same way. `docsCodeDir`, `docsTextDir`, `galaCodeDir`, `galaTextDir`, and `dataDir` point at
the files themselves, for rendering the examples or serving them. Individual files are also
importable through the `./docs/*` and `./gala/*` subpath exports:

```js
import meta from '@gum-jsx/docs/docs/meta.json' with { type: 'json' }
```

## License

MIT
