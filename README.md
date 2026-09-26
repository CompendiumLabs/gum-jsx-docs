# @gum-jsx/docs

Guides, element references, and runnable JSX examples for Gum.
Consumers can use `getGuides()` for conceptual documentation and `getGallery()`
for visual examples grouped by category. Gum Studio presents guides and element
references at `/gum/docs`, and a searchable figure grid at `/gum/gallery`.
`getTopics()` remains available as a combined guide and gallery catalog. The
legacy `topics/*` package subpath maps to gallery files; guide files use the new
`docs/guides` subpath and snake_case names. Content lives under `docs/elements`,
`docs/guides`, and `docs/gallery`.

See the [Gum project](https://github.com/CompendiumLabs/gum-jsx#readme) for
getting started and the package overview.

## Start reading

Start with [Gum](./docs/guides/text/gum.md), [units](./docs/guides/text/units.md), and
[sizing](./docs/guides/text/sizing.md).

[Grid](./docs/elements/text/Grid.md) shares column widths across rows;
[TextGrid](./docs/elements/text/TextGrid.md) adds text conversion and spacing defaults.

Basic plotting is available: start with [Plot](./docs/elements/text/Plot.md),
[Graph](./docs/elements/text/Graph.md), and [SymLine](./docs/elements/text/SymLine.md), or try the
[curve and band](./docs/elements/text/SymFill.md), [bars](./docs/gallery/text/plot_bars.md), and
[vector field](./docs/elements/text/SymField.md) showcases. The editor includes a Plotting
category alongside layout, geometry, and text.

[Network](./docs/elements/text/Network.md) connects [Node](./docs/elements/text/Node.md)
frames, or any other element with an `id`, using [Edge](./docs/elements/text/Edge.md) arrows, including
[nodes inside fitted and rotated layouts](./docs/gallery/text/network_connections.md).
The editor's Networks category includes runnable examples of each.

[Math helpers](./docs/guides/text/math_helpers.md), [arrays](./docs/guides/text/arrays.md),
[vectors](./docs/guides/text/vectors.md), [colors](./docs/guides/text/colors.md), and
[seeded random data](./docs/guides/text/random.md) are built into JSX and exported for
host code. The examples use these helpers directly.

[Math authoring](./docs/guides/text/math.md) covers TeX and composable math elements.
The editor includes a Math category with element references and topics for
[standalone exports](./docs/guides/text/math_export.md),
[plot labels](./docs/gallery/text/math_plot_labels.md), and [slides](./docs/gallery/text/math_slides.md).
The `gum-tex` CLI renders literal formulas, files, or stdin to SVG, PNG, PDF, and kitty.

## Maps gallery

Start with [Making maps](./docs/guides/text/maps.md) for a source-to-annotation
walkthrough, then use the [GeoMap reference](./docs/elements/text/GeoMap.md) for
the full property list and helper details.

The Maps category contains six standalone figures backed by `@gum-jsx/maps`:

- [World countries](./docs/gallery/text/world_choropleth.md): ID-keyed country fills and shared borders.
- [Projection gallery](./docs/gallery/text/projection_gallery.md): four projections of the same atlas.
- [US states](./docs/gallery/text/us_states.md): FIPS IDs and Albers USA insets.
- [Projected city markers](./docs/gallery/text/globe_markers.md): matching overlays and globe clipping.
- [Selected-region fit](./docs/gallery/text/selected_region.md): a regional view with a projected route.
- [GeoJSON edge cases](./docs/gallery/text/geojson_edges.md): inline fixtures with holes and antimeridian cuts.

The CLI includes maps by default. From the workspace root, render an example with:

```sh
bun run gum gum-jsx-docs/docs/gallery/code/world_choropleth.jsx -o /tmp/world.svg
```

## Content structure

The three reference collections use the same paired-file structure. Focused visual
regressions live beside them and need code only:

```text
docs/
  elements/
    text/<Name>.md     Element reference with YAML metadata
    code/<Name>.jsx    Self-contained, runnable element example
  guides/
    text/<name>.md     Conceptual guide; snake_case filename
    code/<name>.jsx    Self-contained, runnable guide example
  gallery/
    text/<name>.md     Visual example explanation
    code/<name>.jsx    Self-contained, runnable gallery example
visual-tests/
  code/<name>.jsx      Focused visual regression case
src/                  Read-only catalog and page loaders
src/skill.ts          Shared prompt and reference assembly for CLI and MCP hosts
test/examples.ts      Validate links, coverage, and rendering at several widths
test/skill.test.ts     Test skill packaging and CLI behavior
prompt/               Maintained Gum authoring and skill prompt pieces
scripts/skill.ts      Generate the portable skill folder and .skill archive
```

There is no viewer, server, or Markdown renderer in this package. gum-jsx-edit's
`/docs` route consumes the catalogs to show SVG cards and editable, live-rendered
code/figure popups. There are no runtime package dependencies;
gum-jsx-core, gum-jsx-math, and gum-jsx-maps are development dependencies for checking examples.

Every reference Markdown file starts with YAML front matter containing a
`category` and a one-sentence `description`. The catalog uses these fields for
grouping and skill reference indexes; neither appears in the rendered page body.
For example:

```md
---
category: layout
description: "Explain flex sizing, wrapping, and alignment in HStack and VStack."
---

# Stacks
```

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
JSX, CLI, and rendering references. The skill uses the `gum` commands directly
when `@gum-jsx/cli` is on PATH, with workspace scripts as an alternative.
Build the skill from the workspace root or this package directory:

```sh
bun run skill
```

This writes `gum-jsx-docs/skills/gum-jsx/SKILL.md` and its references, plus
`gum-jsx-docs/skills/gum-jsx.skill` (a ZIP with a `gum-jsx/` root folder).
The folder can be used by skill-aware coding agents; the `.skill` archive can be
imported by clients that accept that format. Generated outputs are ignored by
Git; maintain the source prompts and docs, then rebuild.

The [Gum JSX plugin](./plugins/gum-jsx/README.md) lives in this repository. Its
skill is identical to the standalone generated skill, with no MCP connection.
Run `bun run plugin:pack` from this package directory to build a ChatGPT upload
ZIP at `dist/gum-jsx-plugin.zip`.

The entrypoint is assembled from [head](./prompt/head.md),
[intro](./prompt/intro.md), [docs](./prompt/docs.md), [refs](./prompt/refs.md),
[gen](./prompt/gen.md), and [cli](./prompt/cli.md). It keeps the essential authoring rules together and links
to generated indexes for guides, elements by category, and gallery figures.
Element and gallery text and code are combined into one reference file per
category; guides keep their own files. Every current page and runnable example
is included, with local links rewritten to the relevant entry or embedded JSX
example. The separate PDF package's API link points to its upstream README.
The generated reference indexes include each page's description alongside its link.

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

`getSkillPrompt()` returns the shared authoring instructions without frontmatter
or CLI setup; pass `{ cli: true }` to append the CLI workflow. `buildSkillFiles()`
adds frontmatter and the linked reference pages, enabling CLI instructions by
default. It only assembles content in memory; `scripts/skill.ts` writes the folder
and archive. Tool-based hosts can use `buildSkillFiles({ cli: false })` and
`mapSkillLinks()` to adapt reference links without rewriting fenced examples.
The MCP server uses this shared assembly and appends its rendering-tool prompt.

Consumers can also read individual pieces through the exported `promptDir` or
`@gum-jsx/docs/prompt/*` subpath. Studio's own chat prompt and tool wiring remain
separate from this portable skill.

`bun run test` also tests skill coverage, link reachability, prompt-example
rendering, safe rebuilds, and CLI behavior. Archive tests require `zip` and `unzip`.

## Elements

- Layout: [Svg](./docs/elements/text/Svg.md), [Box](./docs/elements/text/Box.md),
  [Frame](./docs/elements/text/Frame.md), [Fitting](./docs/guides/text/fitting.md),
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
- Maps: [GeoMap](./docs/elements/text/GeoMap.md).
- Math: [Latex](./docs/elements/text/Latex.md), [Tex](./docs/elements/text/Tex.md),
  [MathText](./docs/elements/text/MathText.md), [MathSymbol](./docs/elements/text/MathSymbol.md),
  [MathSpan](./docs/elements/text/MathSpan.md), [MathRow](./docs/elements/text/MathRow.md),
  [MathCol](./docs/elements/text/MathCol.md), [MathBox](./docs/elements/text/MathBox.md),
  [MathSpacer](./docs/elements/text/MathSpacer.md), and [MathRule](./docs/elements/text/MathRule.md).

## Gallery and guides

- Getting started: [Gum](./docs/guides/text/gum.md), [JSX](./docs/guides/text/jsx.md),
  [Units](./docs/guides/text/units.md), [Sizing](./docs/guides/text/sizing.md),
  [Style](./docs/guides/text/style.md), and [CLI](./docs/guides/text/cli.md).
- Geometry and layout: [Point values](./docs/guides/text/point_values.md),
  [Coordinates](./docs/guides/text/coordinates.md), [Projections](./docs/guides/text/projections.md),
  and [Stack](./docs/guides/text/stack.md).
- Embedding: [Rendering](./docs/guides/text/rendering.md),
  [Custom elements](./docs/guides/text/custom_elements.md), and [Fonts](./docs/guides/text/fonts.md).
- Numeric helpers: [Math](./docs/guides/text/math_helpers.md), [Arrays](./docs/guides/text/arrays.md),
  [Vectors](./docs/guides/text/vectors.md), [Colors](./docs/guides/text/colors.md), [Random](./docs/guides/text/random.md).
- Maps: [Making maps](./docs/guides/text/maps.md) covers sources, styles, views,
  and projected annotations; [Map routes](./docs/gallery/text/map_routes.md) nests
  a sampled Arrow inside GeoMap.
  [Filtering and bounds](./docs/gallery/text/filtered_region.md) selects country
  IDs while keeping a fixed longitude/latitude view.

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

These examples use the current layout engine, data-coordinate marks, and shared
palette. See the workspace [feature map](https://github.com/CompendiumLabs/gum-jsx/blob/master/docs/FEATURES.md) for planned work.

## Run an example

From the parent gum-jsx workspace:

```sh
gum gum-jsx-docs/docs/guides/code/gum.jsx
gum gum-jsx-docs/docs/gallery/code/two_columns.jsx -o /tmp/two-columns.svg
gum gum-jsx-docs/docs/gallery/code/two_columns.jsx -o /tmp/two-columns.png --ratio 2
gum gum-jsx-docs/docs/elements/code/VStack.jsx -f tree --stats
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

Use these filesystem loaders in Bun, not
in a browser bundle:

```ts
import {
  getElements, getGuides, getGallery, listElements, getElementText, getElementCode,
  prepareElementPage, elementsCodeDir,
} from '@gum-jsx/docs'

const { tags, cats, text, code } = getElements()
const page = prepareElementPage(text.Box!, code.Box!)
const entries = listElements() // { name, title, cat }[]
const guides = getGuides()    // { tags, cats, text, code }
const gallery = getGallery()  // { tags, cats, text, code }
const onePage = getElementText('Box')
const oneExample = getElementCode('Box')
```

getTopicText/getTopicCode, listTopics, prepareTopicPage, and the original topics
directory aliases are also exported. Names are basenames, not paths. Catalog calls
discover matching files each time; single-page reads do not load the rest of the
collection. Text loaders remove optional machine-readable category lines. Page
preparation appends a fenced JSX example and preserves relative Markdown links.

Categories are core, layout, geometry, plotting, maps, networks, text, math, api,
and special. Every page needs YAML front matter with `category` and `description`.
A Markdown viewer should resolve relative links against the original text file and
map them to its own routes, rather than requiring routes in the content. Raw files
are exposed through the `./docs/elements/*`, `./docs/guides/*`, and
`./docs/gallery/*` package subpaths.

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
[design](https://github.com/CompendiumLabs/gum-jsx/blob/master/docs/DESIGN.md), [roadmap](https://github.com/CompendiumLabs/gum-jsx/blob/master/docs/ROADMAP.md), and
[feature map](https://github.com/CompendiumLabs/gum-jsx/blob/master/docs/FEATURES.md).
