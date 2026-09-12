# gum-next-docs

Markdown documentation and executable JSX examples for the current Gum rewrite.
Start with [Gum](docs/text/Gum.md), [units](docs/text/Units.md), and
[sizing](docs/text/Sizing.md). Coming from the original? Read
[migration notes](docs/text/Migration.md) before reusing an old example.

Basic plotting is available: start with [Plot](docs/text/Plot.md),
[Graph](docs/text/Graph.md), and [Sampling](docs/text/Sampling.md), or try the
[curve and band](gala/text/plot_wave.md), [bars](gala/text/plot_bars.md), and
[vector field](gala/text/plot_field.md) showcases. The editor includes a Plotting
category alongside layout, geometry, and text.

[Math helpers](docs/text/MathHelpers.md), [arrays](docs/text/Arrays.md),
[vectors](docs/text/Vectors.md), [colors](docs/text/Colors.md), and
[seeded random data](docs/text/Random.md) are built into JSX and exported for
host code. The examples use these helpers directly.

This follows gum-org/gum-jsx-docs's paired-file structure:

```text
docs/
  text/<Name>.md       Reference page; category appears below its title
  code/<Name>.jsx      Self-contained, runnable example of that page
gala/
  text/<name>.md       Showcase explanation
  code/<name>.jsx      Complete showcase source
src/                  Read-only catalog and page loaders
scripts/check.ts      Validate links, coverage, and example rendering
```

There is no viewer, server, or Markdown renderer in this package. gum-next-edit's
`/docs` route consumes the catalogs to show SVG cards and editable, live-rendered
code/figure popups. There are no runtime package dependencies;
gum-next-core is a development dependency for checking examples.

## Reference

- Getting started: [Gum](docs/text/Gum.md), [JSX](docs/text/JSX.md),
  [Units](docs/text/Units.md), [Sizing](docs/text/Sizing.md),
  [Style](docs/text/Style.md), [CLI](docs/text/CLI.md), [Migration](docs/text/Migration.md).
- Layout: [Svg](docs/text/Svg.md), [Box](docs/text/Box.md),
  [Frame](docs/text/Frame.md), [Fit](docs/text/Fit.md),
  [Stack](docs/text/Stack.md), [HStack](docs/text/HStack.md),
  [VStack](docs/text/VStack.md), [Spacer](docs/text/Spacer.md),
  [Group](docs/text/Group.md).
- Geometry: [Rect](docs/text/Rect.md), [RoundedRect](docs/text/RoundedRect.md),
  [Square](docs/text/Square.md), [Circle](docs/text/Circle.md),
  [Ellipse](docs/text/Ellipse.md), [Line](docs/text/Line.md),
  [Polyline](docs/text/Polyline.md), [Polygon](docs/text/Polygon.md),
  [Path](docs/text/Path.md), [Point values](docs/text/PointValues.md).
- Text: [Text](docs/text/Text.md), [Span](docs/text/Span.md), [Fonts](docs/text/Fonts.md).
- Embedding: [Rendering](docs/text/Rendering.md), [Custom elements](docs/text/CustomElements.md).
- Numeric helpers: [Math](docs/text/MathHelpers.md), [Arrays](docs/text/Arrays.md),
  [Vectors](docs/text/Vectors.md), [Colors](docs/text/Colors.md), [Random](docs/text/Random.md).

## Showcase

- [Two columns](gala/text/two_columns.md): an explicitly allocated figure and paragraph.
- [Shape cards](gala/text/shape_cards.md): reusable components and nested stacks.
- [Positioned diagram](gala/text/positioned_diagram.md): labels, nodes, and connectors using Group.
- [Sampled curve](gala/text/sampled_curve.md): plain JavaScript data and Polyline.
- [Layout choices](gala/text/layout_choices.md): natural sizing versus explicit flex.
- [Typography card](gala/text/typography_card.md): mixed fonts, wrapping, and preformatted text.
- [Arrow caps and tips](gala/text/arrow_caps.md): thick shafts, fixed tips, and straight/curved/rounded routes.

## Run an example

From the parent gum-next workspace:

```sh
bun install
bun run gum gum-next-docs/docs/code/Gum.jsx
bun run gum gum-next-docs/gala/code/two_columns.jsx -o /tmp/two-columns.svg
bun run gum gum-next-docs/gala/code/two_columns.jsx -o /tmp/two-columns.png --ratio 2
bun run gum gum-next-docs/docs/code/VStack.jsx -f tree --stats
bun --filter gum-next-docs check
bun run typecheck
```

The CLI defaults to kitty graphics; use SVG or PNG output on other terminals.
Every example includes its own Svg and uses only the current evaluator's bindings.
No legacy packages, image files, custom fonts, network fetches, or generated assets
are required. The check command renders SVG in memory and leaves the checkout unchanged.
Core behavior tests remain in gum-next-core.

## Load the content

Use these filesystem loaders in Bun (or Node with a TypeScript loader), not
in a browser bundle:

```ts
import {
  getDocs, getGala, listDocs, getDocsText, getDocsCode,
  prepareDocsPage, docsCodeDir,
} from 'gum-next-docs';

const { tags, cats, text, code } = getDocs();
const page = prepareDocsPage(text.Box!, code.Box!);
const entries = listDocs(); // { name, title, cat }[]
const gallery = getGala();  // { tags, text, code }
const onePage = getDocsText('Box');
const oneExample = getDocsCode('Box');
```

getGalaText/getGalaCode, listGala, prepareGalaPage, and the docs/gala directory
paths are also exported. Names are basenames, not paths. Catalog calls discover
matching files each time; single-page reads do not load the rest of the collection.
Text loaders remove the machine-readable category line. Page preparation appends
a fenced JSX example and preserves relative Markdown links.

Reference categories are core, layout, geometry, plotting, text, and api. Keep each
`*Category*: ...` line directly below the page's title. Gallery pages need only a
title. A Markdown viewer should resolve relative links against the original text
file and map them to its own routes, rather than requiring routes in the content.
Raw files are exposed through the `./docs/*` and `./gala/*` package subpaths.

## Contributing

Add a Markdown page and same-named JSX file together. Begin the JSX with a short
comment describing what it demonstrates. Prefer explicit sizes where allocation
would otherwise be ambiguous, keep text readable, and use px/em for absolute
lengths. Run the content check and inspect a PNG when changing a visual example.

These docs describe implemented behavior, not feature parity with old Gum.
Development history and the porting inventory remain in the parent workspace's
[design](../docs/DESIGN.md), [roadmap](../docs/ROADMAP.md), and
[feature map](../docs/FEATURES.md).
