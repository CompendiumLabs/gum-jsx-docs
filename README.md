# gum-next-docs

Markdown documentation and executable JSX examples for the current Gum rewrite.
Start with [Gum](./topics/text/Gum.md), [units](./topics/text/Units.md), and
[sizing](./topics/text/Sizing.md).

Basic plotting is available: start with [Plot](./elements/text/Plot.md),
[Graph](./elements/text/Graph.md), and [SymLine](./elements/text/SymLine.md), or try the
[curve and band](./elements/text/SymFill.md), [bars](./topics/text/plot_bars.md), and
[vector field](./topics/text/plot_field.md) showcases. The editor includes a Plotting
category alongside layout, geometry, and text.

[Network](./elements/text/Network.md) connects [Node](./elements/text/Node.md)
frames with [Edge](./elements/text/Edge.md) arrows, including
[nodes inside fitted and rotated layouts](./topics/text/network_connections.md).
The editor's Networks category includes runnable examples of each.

[Math helpers](./topics/text/MathHelpers.md), [arrays](./topics/text/Arrays.md),
[vectors](./topics/text/Vectors.md), [colors](./topics/text/Colors.md), and
[seeded random data](./topics/text/Random.md) are built into JSX and exported for
host code. The examples use these helpers directly.

[Math authoring](./topics/text/Math.md) covers the new TeX and math-element slice.
The editor includes a Math category with element references and topics for
[standalone exports](./topics/text/MathExport.md),
[plot labels](./topics/text/MathPlotLabels.md), and [slides](./topics/text/MathSlides.md).
The `gum-tex` CLI renders literal formulas, files, or stdin to SVG, PNG, and kitty.

The two reference collections use the same paired-file structure. Focused visual
regressions live beside them and need code only:

```text
elements/
  text/<Name>.md       Element reference; category appears below its title
  code/<Name>.jsx      Self-contained, runnable element example
topics/
  text/<name>.md       Conceptual guide or showcase explanation
  code/<name>.jsx      Self-contained, runnable topic example
visual-tests/
  code/<name>.jsx      Focused visual regression case
src/                  Read-only catalog and page loaders
scripts/check.ts      Validate links, coverage, and example rendering
```

There is no viewer, server, or Markdown renderer in this package. gum-next-edit's
`/docs` route consumes the catalogs to show SVG cards and editable, live-rendered
code/figure popups. There are no runtime package dependencies;
gum-next-core and gum-next-math are development dependencies for checking examples.

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
- Networks: [Network](./elements/text/Network.md), [Node](./elements/text/Node.md),
  and [Edge](./elements/text/Edge.md).
- Math: [Latex](./elements/text/Latex.md), [Tex](./elements/text/Tex.md),
  [MathText](./elements/text/MathText.md), [MathSymbol](./elements/text/MathSymbol.md),
  [MathSpan](./elements/text/MathSpan.md), [MathRow](./elements/text/MathRow.md),
  [MathCol](./elements/text/MathCol.md), [MathBox](./elements/text/MathBox.md),
  [MathSpacer](./elements/text/MathSpacer.md), and [MathRule](./elements/text/MathRule.md).

## Topics

- Getting started: [Gum](./topics/text/Gum.md), [JSX](./topics/text/JSX.md),
  [Units](./topics/text/Units.md), [Sizing](./topics/text/Sizing.md),
  [Style](./topics/text/Style.md), and [CLI](./topics/text/CLI.md).
- Geometry and layout: [Point values](./topics/text/PointValues.md),
  [Coordinates](./topics/text/Coordinates.md), and [Stack](./topics/text/Stack.md).
- Embedding: [Rendering](./topics/text/Rendering.md),
  [Custom elements](./topics/text/CustomElements.md), and [Fonts](./topics/text/Fonts.md).
- Numeric helpers: [Math](./topics/text/MathHelpers.md), [Arrays](./topics/text/Arrays.md),
  [Vectors](./topics/text/Vectors.md), [Colors](./topics/text/Colors.md), [Random](./topics/text/Random.md).

### Showcases

- [Two columns](./topics/text/two_columns.md): an explicitly allocated figure and paragraph.
- [Shape cards](./topics/text/shape_cards.md): reusable components and nested stacks.
- [Positioned diagram](./topics/text/positioned_diagram.md): labels, nodes, and connectors using **Group**.
- [Sampled curve](./elements/text/SymLine.md): function sampling with **SymLine**.
- [Layout choices](./topics/text/layout_choices.md): natural sizing versus explicit flex.
- [Typography card](./topics/text/typography_card.md): mixed fonts, wrapping, and preformatted text.
- [Arrow caps and tips](./topics/text/arrow_caps.md): thick shafts, fixed tips, and straight/curved/rounded routes.
- [Flex limits and shrinkage](./topics/text/stack_flex.md) and
  [stack alignment](./topics/text/stack_alignment.md): capped growth, shrinking, baselines, and stretch.
- [Nested anchors](./topics/text/group_anchors.md),
  [canvas clipping](./topics/text/group_clip.md), and
  [rounded box clipping](./topics/text/box_clip.md): positioning and visible overflow.
- [One paragraph, two widths](./topics/text/paragraph.md) and
  [line boxes and baselines](./topics/text/typography.md): measured text geometry.
- [Reusing fragments](./topics/text/repeated.md) and
  [clipping and transforms](./topics/text/clipping.md): custom parent layout and placement.

## Run an example

From the parent gum-next workspace:

```sh
bun install
bun run gum gum-next-docs/topics/code/Gum.jsx
bun run gum gum-next-docs/topics/code/two_columns.jsx -o /tmp/two-columns.svg
bun run gum gum-next-docs/topics/code/two_columns.jsx -o /tmp/two-columns.png --ratio 2
bun run gum gum-next-docs/elements/code/VStack.jsx -f tree --stats
bun --filter gum-next-docs check
bun run visual-test
bun run typecheck
```

The CLI defaults to kitty graphics; use SVG or PNG output on other terminals.
Every example includes its own **Svg** and uses only the current evaluator's bindings.
No legacy packages, image files, custom fonts, network fetches, or generated assets
are required. The check command renders SVG in memory and leaves the checkout unchanged.
The workspace visual-test command renders every element example, every topic example,
and every focused regression into a searchable standalone HTML report at
`gum-next-cli/visual-report/dist/index.html`.
Core behavior tests and synthetic layout fixtures remain in gum-next-core.
The former core examples are consolidated into these collections; equivalent
examples share one docs source, and previews are generated on demand.

## Load the content

Use these filesystem loaders in Bun (or Node with a TypeScript loader), not
in a browser bundle:

```ts
import {
  getElements, getTopics, listElements, getElementText, getElementCode,
  prepareElementPage, elementsCodeDir,
} from 'gum-next-docs'

const { tags, cats, text, code } = getElements()
const page = prepareElementPage(text.Box!, code.Box!)
const entries = listElements() // { name, title, cat }[]
const topics = getTopics()     // { tags, cats, text, code }
const onePage = getElementText('Box')
const oneExample = getElementCode('Box')
```

getTopicText/getTopicCode, listTopics, prepareTopicPage, and the elements/topics
directory paths are also exported. Names are basenames, not paths. Catalog calls
discover matching files each time; single-page reads do not load the rest of the
collection. Text loaders remove optional machine-readable category lines. Page
preparation appends a fenced JSX example and preserves relative Markdown links.

Categories are core, layout, geometry, plotting, networks, text, math, and api. Every element page
needs a `*Category*: ...` line directly below its title; topic pages may include one.
A Markdown viewer should resolve relative links against the original text file and
map them to its own routes, rather than requiring routes in the content. Raw files
are exposed through the `./elements/*` and `./topics/*` package subpaths.

## Contributing

Add a Markdown page and same-named JSX file together. Begin the JSX with a short
comment describing what it demonstrates. Prefer explicit sizes where allocation
would otherwise be ambiguous and keep text readable. For examples with text, set
the base `font-size` in pixels on **Svg**, then use `em(...)` for descendant font
sizes, gaps, and padding. Elements with their own font defaults, such as **Plot**
and **Slide**, need an explicit relative `font-size` to follow that base. Strokes,
borders, corner radii, and fixed geometry can use pixels. Plot domain padding
remains fractional. Run the content check and inspect a PNG when changing a
visual example.

These docs describe implemented behavior, not feature parity with old Gum.
Development history and the porting inventory remain in the parent workspace's
[design](../docs/DESIGN.md), [roadmap](../docs/ROADMAP.md), and
[feature map](../docs/FEATURES.md).
