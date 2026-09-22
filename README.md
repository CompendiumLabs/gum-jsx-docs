# gum-jsx-docs

Markdown documentation and executable JSX examples for the current Gum rewrite.
Consumers can use `getGuides()` for conceptual documentation and `getGallery()`
for visual examples grouped by category. Gum Studio presents guides and element
references at `/gum/docs`, and a searchable figure grid at `/gum/gallery`.
The original `getTopics()` catalog and package import aliases remain available
for existing consumers. Content lives under `docs/elements` and `docs/gallery`.

Start with [Gum](./docs/gallery/text/Gum.md), [units](./docs/gallery/text/Units.md), and
[sizing](./docs/gallery/text/Sizing.md).

Basic plotting is available: start with [Plot](./docs/elements/text/Plot.md),
[Graph](./docs/elements/text/Graph.md), and [SymLine](./docs/elements/text/SymLine.md), or try the
[curve and band](./docs/elements/text/SymFill.md), [bars](./docs/gallery/text/plot_bars.md), and
[vector field](./docs/elements/text/SymField.md) showcases. The editor includes a Plotting
category alongside layout, geometry, and text.

[Network](./docs/elements/text/Network.md) connects [Node](./docs/elements/text/Node.md)
frames, or any other element with an `id`, using [Edge](./docs/elements/text/Edge.md) arrows, including
[nodes inside fitted and rotated layouts](./docs/gallery/text/network_connections.md).
The editor's Networks category includes runnable examples of each.

[Math helpers](./docs/gallery/text/MathHelpers.md), [arrays](./docs/gallery/text/Arrays.md),
[vectors](./docs/gallery/text/Vectors.md), [colors](./docs/gallery/text/Colors.md), and
[seeded random data](./docs/gallery/text/Random.md) are built into JSX and exported for
host code. The examples use these helpers directly.

[Math authoring](./docs/gallery/text/Math.md) covers the new TeX and math-element slice.
The editor includes a Math category with element references and topics for
[standalone exports](./docs/gallery/text/MathExport.md),
[plot labels](./docs/gallery/text/MathPlotLabels.md), and [slides](./docs/gallery/text/MathSlides.md).
The `gum-tex` CLI renders literal formulas, files, or stdin to SVG, PNG, and kitty.

The two reference collections use the same paired-file structure. Focused visual
regressions live beside them and need code only:

```text
docs/
  elements/
    text/<Name>.md     Element reference; category appears below its title
    code/<Name>.jsx    Self-contained, runnable element example
  gallery/
    text/<name>.md     Conceptual guide or showcase explanation
    code/<name>.jsx    Self-contained, runnable gallery example
visual-tests/
  code/<name>.jsx      Focused visual regression case
src/                  Read-only catalog and page loaders
test/examples.ts      Validate links, coverage, and rendering at several widths
test/skill.test.ts     Test skill packaging and CLI behavior
prompt/               Maintained Gum authoring and skill prompt pieces
scripts/skill.ts      Generate the portable skill folder and .skill archive
```

There is no viewer, server, or Markdown renderer in this package. gum-jsx-edit's
`/docs` route consumes the catalogs to show SVG cards and editable, live-rendered
code/figure popups. There are no runtime package dependencies;
gum-jsx-core and gum-jsx-math are development dependencies for checking examples.

`bun run test` renders all examples with the same 640 × 480 offer used by the
CLI and previews, then checks 320, 480, 640, and 960px widths with natural height.
It also exercises `max_width` / `max_height` wrapper props at five
landscape and portrait sizes, including 240px-wide and 240px-high previews.
It checks finite geometry and nonempty plot data areas at the default offer.
Small previews may clip or crowd content. Regression checks also preserve comparison
rows and verify that larger hosts do not widen content-sized figures with empty
space. Whole-scene `fit` examples are checked in fixed rectangles. Standalone
figures can set a design height, aspect, and font size; Studio scales the completed
SVG for display. Compact content may hug its children, and adaptive layouts can
use fill or wrapping when the composition calls for it.

## Generate the skill package

The skill-generation tooling combines authoring prompts with the layout, units,
JSX, CLI, and rendering references. The skill assumes `@gum-jsx/cli` is installed
globally and uses the `gum` commands directly. Build the skill from the workspace
root or this package directory:

```sh
bun run skill
```

This writes `gum-jsx-docs/skills/gum-jsx/SKILL.md` and its references, plus
`gum-jsx-docs/skills/gum-jsx.skill` (a ZIP with a `gum-jsx/` root folder).
The folder can be used by skill-aware coding agents; the `.skill` archive can be
imported by clients that accept that format. Generated outputs are ignored by
Git; maintain the source prompts and docs, then rebuild.

The entrypoint is assembled from [head](./prompt/head.md),
[intro](./prompt/intro.md), [docs](./prompt/docs.md), [refs](./prompt/refs.md), and
[gen](./prompt/gen.md). It keeps the essential authoring rules together and links
to generated indexes for guides, elements by category, and gallery figures.
Every current page and runnable example is included, with local links rewritten
for the package. Links to JSX sources point to the embedded example; the separate
PDF package's API link points to its upstream README.

The script locates inputs and its default output relative to this package,
independently of the caller's working directory. From the workspace root:

```sh
bun gum-jsx-docs/scripts/skill.ts -o /tmp/gum-skill/gum-jsx
bun gum-jsx-docs/scripts/skill.ts -o /tmp/gum-skill/gum-jsx --no-archive
```

An explicit output path is relative to the caller's directory; its archive is
`<output>.skill`. Archive generation requires the `zip` executable. Use
`--no-archive` for a directory-only build without that dependency. Rebuilds track
their generated files in `.gum-jsx-generated.json`, remove retired generated
pages, and preserve unrelated local files. Archives contain only the current
skill pages, never that manifest or local notes. A nonempty destination without
a build manifest is rejected.

Other consumers, including Gum Studio, can reuse the maintained prompts through
the exported `promptDir` or `@gum-jsx/docs/prompt/*` subpath. Studio's own chat
prompt and tool wiring remain separate from this portable skill.

`bun run test` also tests skill coverage, link reachability, prompt-example
rendering, safe rebuilds, and CLI behavior. Archive tests require `zip` and `unzip`.

## Elements

- Layout: [Svg](./docs/elements/text/Svg.md), [Box](./docs/elements/text/Box.md),
  [Frame](./docs/elements/text/Frame.md), [Fitting](./docs/gallery/text/Fitting.md),
  [HStack](./docs/elements/text/HStack.md), [VStack](./docs/elements/text/VStack.md),
  [Spacer](./docs/elements/text/Spacer.md), and [Group](./docs/elements/text/Group.md).
- Geometry: [Rect](./docs/elements/text/Rect.md), [RoundedRect](./docs/elements/text/RoundedRect.md),
  [Square](./docs/elements/text/Square.md), [Circle](./docs/elements/text/Circle.md),
  [Ellipse](./docs/elements/text/Ellipse.md), [Line](./docs/elements/text/Line.md),
  [Polyline](./docs/elements/text/Polyline.md), [Polygon](./docs/elements/text/Polygon.md),
  and [Path](./docs/elements/text/Path.md).
- Text: [Text](./docs/elements/text/Text.md), [Span](./docs/elements/text/Span.md),
  [Bullets](./docs/elements/text/Bullets.md), and [Slide](./docs/elements/text/Slide.md).
- Networks: [Network](./docs/elements/text/Network.md), [Node](./docs/elements/text/Node.md),
  and [Edge](./docs/elements/text/Edge.md).
- Math: [Latex](./docs/elements/text/Latex.md), [Tex](./docs/elements/text/Tex.md),
  [MathText](./docs/elements/text/MathText.md), [MathSymbol](./docs/elements/text/MathSymbol.md),
  [MathSpan](./docs/elements/text/MathSpan.md), [MathRow](./docs/elements/text/MathRow.md),
  [MathCol](./docs/elements/text/MathCol.md), [MathBox](./docs/elements/text/MathBox.md),
  [MathSpacer](./docs/elements/text/MathSpacer.md), and [MathRule](./docs/elements/text/MathRule.md).

## Gallery and guides

- Getting started: [Gum](./docs/gallery/text/Gum.md), [JSX](./docs/gallery/text/JSX.md),
  [Units](./docs/gallery/text/Units.md), [Sizing](./docs/gallery/text/Sizing.md),
  [Style](./docs/gallery/text/Style.md), and [CLI](./docs/gallery/text/CLI.md).
- Geometry and layout: [Point values](./docs/gallery/text/PointValues.md),
  [Coordinates](./docs/gallery/text/Coordinates.md), and [Stack](./docs/gallery/text/Stack.md).
- Embedding: [Rendering](./docs/gallery/text/Rendering.md),
  [Custom elements](./docs/gallery/text/CustomElements.md), and [Fonts](./docs/gallery/text/Fonts.md).
- Numeric helpers: [Math](./docs/gallery/text/MathHelpers.md), [Arrays](./docs/gallery/text/Arrays.md),
  [Vectors](./docs/gallery/text/Vectors.md), [Colors](./docs/gallery/text/Colors.md), [Random](./docs/gallery/text/Random.md).

### Showcases

- [Pendulum Physics](./docs/gallery/text/pendulum_physics.md): parameter-driven
  geometry, force arrows, and a math caption, ported from the old gallery.
- [Particle in a Box](./docs/gallery/text/particle_box.md): offset wavefunctions,
  hatched walls, and math labels, ported from the old gallery.
- [Transformer Architecture](./docs/gallery/text/transformer.md): nested blocks
  with boundary-attached connections, ported from the old gallery.

- [Two columns](./docs/gallery/text/two_columns.md): an explicitly allocated figure and paragraph.
- [Shape cards](./docs/gallery/text/shape_cards.md): reusable components and nested stacks.
- [Positioned diagram](./docs/gallery/text/positioned_diagram.md): labels, nodes, and connectors using **Group**.
- [Sampled curve](./docs/elements/text/SymLine.md): function sampling with **SymLine**.
- [Layout choices](./docs/gallery/text/layout_choices.md): natural sizing versus explicit flex.
- [Typography card](./docs/gallery/text/typography_card.md): mixed fonts, wrapping, and preformatted text.
- [Arrow caps and tips](./docs/gallery/text/arrow_caps.md): thick shafts, fixed tips, and straight/curved/rounded routes.
- [Flex limits and shrinkage](./docs/gallery/text/stack_flex.md) and
  [stack alignment](./docs/gallery/text/stack_alignment.md): capped growth, shrinking, baselines, and stretch.
- [Nested anchors](./docs/gallery/text/group_anchors.md),
  [canvas clipping](./docs/gallery/text/group_clip.md), and
  [rounded box clipping](./docs/gallery/text/box_clip.md): positioning and visible overflow.
- [One paragraph, two widths](./docs/gallery/text/paragraph.md) and
  [line boxes and baselines](./docs/gallery/text/typography.md): measured text geometry.
- [Reusing fragments](./docs/gallery/text/repeated.md) and
  [clipping and transforms](./docs/gallery/text/clipping.md): custom parent layout and placement.

## Old gallery ports

All 25 examples from the old `gum-jsx-docs/gala` collection now have runnable
sources and explanatory pages here. Alongside Pendulum Physics, Particle in a
Box, and Transformer Architecture, the remaining ports are:

- Plotting: [Axes with Arrows](./docs/gallery/text/axis_arrows.md), [Flux Capacitance](./docs/gallery/text/flux_capacitance.md), [Complex Roots](./docs/gallery/text/complex_plot.md), [Slick Bars](./docs/gallery/text/slick_bars.md), [The Nexus](./docs/gallery/text/the_nexus.md), [Manual Plot](./docs/gallery/text/plot_manual.md), [Atomic Orbitals](./docs/gallery/text/atomic_orbitals.md).
- Geometry: [Spline Star](./docs/gallery/text/spline_star.md), [Metal Grid](./docs/gallery/text/metal_grid.md), [Set Theory](./docs/gallery/text/set_theory.md), [Regular Polygons](./docs/gallery/text/polygon_slide.md), [Neon Rose](./docs/gallery/text/neon_rose.md), [Space Rose](./docs/gallery/text/space_rose.md), [Anatomy of a Cell](./docs/gallery/text/cell_diagram.md).
- Text: [Punk Rock](./docs/gallery/text/punk_rock.md).
- Layout: [Two Columns](./docs/gallery/text/two_column.md), [UI Mockup](./docs/gallery/text/ui_mockup.md).
- Networks: [Macroeconomic Flows](./docs/gallery/text/macro_economy.md), [Unit Distance](./docs/gallery/text/unit_distance.md),
  [Any element as a node](./docs/gallery/text/network_shapes.md).
- Math: [Shape Algebra](./docs/gallery/text/shape_algebra.md), [The Scenic Route](./docs/gallery/text/scenic_route.md), [Stokes’ Theorem](./docs/gallery/text/stokes_theorem.md).

The ports use explicit layout sizes, current data-coordinate marks, and the shared
palette. No core or math implementation changes were required. Useful follow-ups:

- Add diagnostics for unsupported props: legacy sizing, coordinates, and paint
  props can otherwise be ignored silently.
- Expose axis arrowhead geometry; Axes with Arrows uses explicit Arrow baselines
  to preserve curved heads.
- Add Grid/TextGrid conveniences; regular polygons and the metal grid currently
  use explicit rows or positioned cells.
- Consider attached edge labels and obstacle avoidance for flow diagrams.
- Support separate fill/stroke opacity and the old arrow-arc geometry if future
  ports need closer paint or arrowhead matching.

## Run an example

From the parent gum-jsx workspace:

```sh
bun install
bun run gum gum-jsx-docs/docs/gallery/code/Gum.jsx
bun run gum gum-jsx-docs/docs/gallery/code/two_columns.jsx -o /tmp/two-columns.svg
bun run gum gum-jsx-docs/docs/gallery/code/two_columns.jsx -o /tmp/two-columns.png --ratio 2
bun run gum gum-jsx-docs/docs/elements/code/VStack.jsx -f tree --stats
bun --filter @gum-jsx/docs test
bun run visual-test
bun run typecheck
```

The CLI defaults to kitty graphics; use SVG or PNG output on other terminals.
Examples use the current evaluator's bindings. Set size and font props on the
figure itself or on an explicit **Svg** wrapper. Hosts add an **Svg** viewport
when the example returns a bare element and preserve an explicit **Svg** root.
No legacy packages, image files, custom fonts, network fetches, or generated assets
are required. The test command renders SVG in memory and leaves the checkout unchanged.
The workspace visual-test command renders every element example, every topic example,
and every focused regression into a searchable standalone HTML report at
`gum-jsx-cli/visual-report/dist/index.html`.
Core behavior tests and synthetic layout fixtures remain in gum-jsx-core.
The former core examples are consolidated into these collections; equivalent
examples share one docs source, and previews are generated on demand.

## Load the content

Use these filesystem loaders in Bun (or Node with a TypeScript loader), not
in a browser bundle:

```ts
import {
  getElements, getTopics, listElements, getElementText, getElementCode,
  prepareElementPage, elementsCodeDir,
} from 'gum-jsx-docs'

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
are exposed through the `./docs/elements/*` and `./docs/gallery/*` package subpaths.

## Contributing

Add a Markdown page and same-named JSX file together. Begin the JSX with a short
comment describing what it demonstrates. Prefer explicit sizes where allocation
would otherwise be ambiguous and keep text readable. For examples with text, set
the base `font-size` in pixels on **Svg**, then use `em(...)` for descendant font
sizes, gaps, and padding. Elements with their own font defaults, such as **Plot**
and **Slide**, need an explicit relative `font-size` to follow that base. Strokes,
borders, corner radii, and fixed geometry can use pixels. Plot domain padding
remains fractional. Run `bun run test` and inspect a PNG when changing a
visual example.

These docs describe implemented behavior, not feature parity with old Gum.
Development history and the porting inventory remain in the parent workspace's
[design](../docs/DESIGN.md), [roadmap](../docs/ROADMAP.md), and
[feature map](../docs/FEATURES.md).
