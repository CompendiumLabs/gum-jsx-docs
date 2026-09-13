# gum-next-docs

Markdown documentation and executable JSX examples for the current Gum rewrite.
Start with [Gum](./topics/text/Gum.md), [units](./topics/text/Units.md), and
[sizing](./topics/text/Sizing.md). Coming from the original? Read
[migration notes](./topics/text/Migration.md) before reusing an old example.

Basic plotting is available: start with [Plot](./elements/text/Plot.md),
[Graph](./elements/text/Graph.md), and [Sampling](./topics/text/Sampling.md), or try the
[curve and band](./topics/text/plot_wave.md), [bars](./topics/text/plot_bars.md), and
[vector field](./topics/text/plot_field.md) showcases. The editor includes a Plotting
category alongside layout, geometry, and text.

[Math helpers](./topics/text/MathHelpers.md), [arrays](./topics/text/Arrays.md),
[vectors](./topics/text/Vectors.md), [colors](./topics/text/Colors.md), and
[seeded random data](./topics/text/Random.md) are built into JSX and exported for
host code. The examples use these helpers directly.

The two collections use the same paired-file structure:

```text
elements/
  text/<Name>.md       Element reference; category appears below its title
  code/<Name>.jsx      Self-contained, runnable element example
topics/
  text/<name>.md       Conceptual guide or showcase explanation
  code/<name>.jsx      Self-contained, runnable topic example
src/                  Read-only catalog and page loaders
scripts/check.ts      Validate links, coverage, and example rendering
```

There is no viewer, server, or Markdown renderer in this package. gum-next-edit's
`/docs` route consumes the catalogs to show SVG cards and editable, live-rendered
code/figure popups. There are no runtime package dependencies;
gum-next-core is a development dependency for checking examples.

## Elements

- Layout: [Svg](./elements/text/Svg.md), [Box](./elements/text/Box.md),
  [Frame](./elements/text/Frame.md), [Fit](./elements/text/Fit.md),
  [HStack](./elements/text/HStack.md), [VStack](./elements/text/VStack.md),
  [Spacer](./elements/text/Spacer.md), and [Group](./elements/text/Group.md).
- Geometry: [Rect](./elements/text/Rect.md), [RoundedRect](./elements/text/RoundedRect.md),
  [Square](./elements/text/Square.md), [Circle](./elements/text/Circle.md),
  [Ellipse](./elements/text/Ellipse.md), [Line](./elements/text/Line.md),
  [Polyline](./elements/text/Polyline.md), [Polygon](./elements/text/Polygon.md),
  and [Path](./elements/text/Path.md).
- Text: [Text](./elements/text/Text.md), [Span](./elements/text/Span.md),
  [Bullets](./elements/text/Bullets.md), and [Slide](./elements/text/Slide.md).

## Topics

- Getting started: [Gum](./topics/text/Gum.md), [JSX](./topics/text/JSX.md),
  [Units](./topics/text/Units.md), [Sizing](./topics/text/Sizing.md),
  [Style](./topics/text/Style.md), [CLI](./topics/text/CLI.md), and
  [Migration](./topics/text/Migration.md).
- Geometry and layout: [Point values](./topics/text/PointValues.md),
  [Coordinates](./topics/text/Coordinates.md), and [Stack](./topics/text/Stack.md).
- Embedding: [Rendering](./topics/text/Rendering.md),
  [Custom elements](./topics/text/CustomElements.md), and [Fonts](./topics/text/Fonts.md).
- Numeric helpers: [Math](./topics/text/MathHelpers.md), [Arrays](./topics/text/Arrays.md),
  [Vectors](./topics/text/Vectors.md), [Colors](./topics/text/Colors.md), [Random](./topics/text/Random.md).

### Showcases

- [Two columns](./topics/text/two_columns.md): an explicitly allocated figure and paragraph.
- [Shape cards](./topics/text/shape_cards.md): reusable components and nested stacks.
- [Positioned diagram](./topics/text/positioned_diagram.md): labels, nodes, and connectors using Group.
- [Sampled curve](./topics/text/sampled_curve.md): plain JavaScript data and Polyline.
- [Layout choices](./topics/text/layout_choices.md): natural sizing versus explicit flex.
- [Typography card](./topics/text/typography_card.md): mixed fonts, wrapping, and preformatted text.
- [Arrow caps and tips](./topics/text/arrow_caps.md): thick shafts, fixed tips, and straight/curved/rounded routes.

## Run an example

From the parent gum-next workspace:

```sh
bun install
bun run gum gum-next-docs/topics/code/Gum.jsx
bun run gum gum-next-docs/topics/code/two_columns.jsx -o /tmp/two-columns.svg
bun run gum gum-next-docs/topics/code/two_columns.jsx -o /tmp/two-columns.png --ratio 2
bun run gum gum-next-docs/elements/code/VStack.jsx -f tree --stats
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
  getElements, getTopics, listElements, getElementText, getElementCode,
  prepareElementPage, elementsCodeDir,
} from 'gum-next-docs';

const { tags, cats, text, code } = getElements();
const page = prepareElementPage(text.Box!, code.Box!);
const entries = listElements(); // { name, title, cat }[]
const topics = getTopics();     // { tags, cats, text, code }
const onePage = getElementText('Box');
const oneExample = getElementCode('Box');
```

getTopicText/getTopicCode, listTopics, prepareTopicPage, and the elements/topics
directory paths are also exported. Names are basenames, not paths. Catalog calls
discover matching files each time; single-page reads do not load the rest of the
collection. Text loaders remove optional machine-readable category lines. Page
preparation appends a fenced JSX example and preserves relative Markdown links.

Categories are core, layout, geometry, plotting, text, and api. Every element page
needs a `*Category*: ...` line directly below its title; topic pages may include one.
A Markdown viewer should resolve relative links against the original text file and
map them to its own routes, rather than requiring routes in the content. Raw files
are exposed through the `./elements/*` and `./topics/*` package subpaths.

## Contributing

Add a Markdown page and same-named JSX file together. Begin the JSX with a short
comment describing what it demonstrates. Prefer explicit sizes where allocation
would otherwise be ambiguous, keep text readable, and use px/em for absolute
lengths. Run the content check and inspect a PNG when changing a visual example.

These docs describe implemented behavior, not feature parity with old Gum.
Development history and the porting inventory remain in the parent workspace's
[design](../docs/DESIGN.md), [roadmap](../docs/ROADMAP.md), and
[feature map](../docs/FEATURES.md).
