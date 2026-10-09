---
category: layout
description: "Collect independently laid-out pages with shared defaults and document metadata."
---

# Document

An ordered collection of [Page](./Page.md) elements. Each page has its own
dimensions and layout; the document supplies shared page defaults and a title.
A standalone Page remains sufficient for a single figure.

| Property | Default | Meaning |
|---|---|---|
| `children` | Required | One or more Page elements, in output order; arrays, fragments, and conditional children are supported |
| `title` | — | Document title used by SVG, PDF, and PPTX exports unless the host overrides it |
| Page sizing and style props | — | Defaults for each page, including `width`, `height`, `aspect`, `background`, typography, and theme |

A page's explicit props override document defaults. Host `defaults` sit below
both, while host `overrides` win over both. Undefined props do not replace a
default. Page content inherits the resulting page style normally.

Put a [Slide](./Slide.md) inside each Page for presentation layouts. Set
`width="fill" height="fill"` on Slide to fill its page. Document does not arrange
its pages in a stack or flow overflowing content onto another page. It is a
top-level collection, like [Video](./Video.md), rather than a layout element;
its direct children must be Pages, and it cannot be nested inside one.

Save the example as `talk.jsx` to export the entire document or one page:

```sh
gum talk.jsx -o talk.pdf
gum talk.jsx -o talk.pptx
gum talk.jsx --page 2 -o second-page.png
```

PDF preserves each page's dimensions. PPTX requires all pages to have the same
dimensions. SVG, PNG, and kitty output require `--page` when a document has
multiple pages; a one-page document needs no selection. `--page` starts at `1`
and can also export a single PDF or PPTX page. `-W` and `-H` apply to every page.
`--title` overrides document metadata.

`gum talk.jsx -f tree` inspects every page. JSON output contains `{ title, pages }`;
selecting a page returns that page's fragment instead.

In library code, `layout_document(document, options)` or
`layout_element(document, options)` returns `{ kind: 'document', pages, title, pass }`.
Pass the fragment array to `render_pdf` or `render_pptx`, with the font provider
used during layout. `render_element(document, options)` returns the same outer
shape with an SVG result for each page; its page-specific definition IDs allow
all pages to be embedded together. See [Rendering](../../guides/text/rendering.md).
