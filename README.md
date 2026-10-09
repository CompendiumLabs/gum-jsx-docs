# @gum-jsx/docs

[Gum](https://github.com/CompendiumLabs/gum-jsx) — installation, quickstart, and user documentation.

Guides, element references, and runnable JSX examples for Gum.
Consumers can use `getGuides()` for conceptual documentation and `getGallery()`
for visual examples grouped by category. Gum Studio presents guides and element
references at `/gum/docs`, and a searchable figure grid at `/gum/gallery`.
`getTopics()` remains available as a combined guide and gallery catalog. The
legacy `topics/*` package subpath maps to gallery files; guide files use the new
`docs/guides` subpath and snake_case names. Content lives under `docs/elements`,
`docs/guides`, and `docs/gallery`.

The installed `gum` command includes this documentation offline. Start with
`gum docs`, search with `gum docs search "axis labels"`, and retrieve a page with
`gum docs get elements/Plot`. `gum docs example <page-id>` prints its original JSX;
`--output <directory>` exports the JSX and any required sample files together.

## Content structure

The three reference collections use the same paired-file structure:

```text
docs/
  elements/
    text/<Name>.md     Element reference with YAML metadata
    code/<Name>.jsx    Self-contained, runnable element example
  guides/
    text/<name>.md     Conceptual guide; snake_case filename
    code/<name>.jsx    Self-contained, runnable guide example
    data/               Sample inputs for the file-loading guides
  gallery/
    text/<name>.md     Visual example explanation
    code/<name>.jsx    Self-contained, runnable gallery example
src/                  Read-only catalog and page loaders
src/docs.ts           Portable retrieval, listing, search, and page formatting
src/catalog.ts        Build the serializable documentation snapshot
src/skill.ts          Shared prompt and reference assembly for the plugin and MCP
test/examples.ts      Validate links, coverage, and rendering at several widths
test/skill.test.ts     Test skill content and documented Gum CLI commands
test/plugin.test.ts    Test plugin builds and ZIP packaging
prompt/               Maintained Gum authoring and skill prompt pieces
scripts/plugin-build.ts Generate the skill inside the plugin
scripts/plugin-pack.ts  Rebuild the plugin skill and package the plugin ZIP
```

There is no viewer, server, or Markdown renderer in this package. gum-jsx-edit's
`/docs` route consumes the catalogs to show SVG cards and editable, live-rendered
code/figure popups. There are no runtime package dependencies;
gum-jsx-core, gum-jsx-math, gum-jsx-maps, and gum-jsx-mp4 are development dependencies
for checking examples. Video examples play in Gum Studio or render through the
CLI; their start, middle, and final frames are checked before applying the
ordinary preview checks.

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
Small previews may clip or crowd content. Whole-scene `fit` examples are checked
in fixed rectangles. Standalone
figures can set a design height, aspect, and font size; Studio scales the completed
SVG for display. Compact content may hug its children, and adaptive layouts can
use fill or wrapping when the composition calls for it.

## Portable documentation

`build_catalog()` assembles the maintained pages, the orientation in
`prompt/start.md`, and base64-encoded example fixtures. Page IDs are
`elements/<Name>`, `guides/<name>`, and `gallery/<name>`. Internal links resolve
to these IDs; links to example source resolve to the page's `#example` section.

The `gum-jsx` build embeds this snapshot in its npm bundle and standalone
executables. Retrieval and search have no filesystem or network dependency:

```ts
import { build_catalog } from '@gum-jsx/docs'
import { get_doc, search_docs, format_doc } from '@gum-jsx/docs/docs'

const catalog = build_catalog()
const matches = search_docs(catalog, 'axis labels', 5)
const markdown = format_doc(get_doc(catalog, 'elements/Plot'))
```

`list_docs(catalog, collection?)` lists all pages or one collection. Search
requires every query term and weights page names, titles, and descriptions above
body text and JSX. Exact names rank first. `get_doc` accepts an optional anchor
and returns the complete page. `@gum-jsx/docs/catalog` supplies a ready catalog
for source hosts; distribution builds replace that import with the snapshot.

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

Categories are core, layout, geometry, plotting, maps, networks, text, math, video, api,
external, and special. Every page needs YAML front matter with `category` and `description`.
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
See the parent workspace’s [design notes](https://github.com/CompendiumLabs/gum-jsx-meta/blob/master/docs/DESIGN.md)
and [development backlog](https://github.com/CompendiumLabs/gum-jsx-meta/blob/master/docs/TODO.md)
for implementation decisions and planned work.

## Build the skill

From this package directory:

```sh
bun run skill:build
bun run skill:pack
```

`skill:build` generates `dist/gum-jsx/SKILL.md` and its references in the
top-level repository. `skill:pack` rebuilds that directory and creates
`dist/gum-jsx-skill.zip`, containing the `gum-jsx/` skill directory.
These commands generate only the skill. Packaging requires the `zip` executable.
Both outputs are ignored by Git.

## Build the plugin

The [Gum plugin](../gum-jsx/plugins/gum-jsx/README.md) lives in the `gum-jsx`
repository and combines authoring prompts with
the layout, units, JSX, CLI, and rendering references. Its skill uses the `gum`
commands directly when `gum` is on PATH, with workspace scripts as an
alternative. From the workspace root or this package directory:

```sh
bun run plugin:build
bun run plugin:pack
```

`plugin:build` writes `plugins/gum-jsx/skills/gum-jsx/SKILL.md` and its references
in the top-level repository. `plugin:pack` rebuilds that directory and creates
`dist/gum-jsx-plugin.zip` in the top-level repository, with the plugin manifest at
the archive root. Packaging requires the `zip` executable; building the directory
alone does not. The scripts remain in `gum-jsx-docs/scripts/`.

Commit the plugin directory's
generated skill files in the top-level repository, and commit maintained prompt
and documentation changes in `gum-jsx-docs`. This lets GitHub marketplace
installations include the complete plugin. The ZIP remains
ignored by Git and can be attached to a release. Rebuilds replace the generated
skill directory, so make edits in `prompt/` and `docs/` rather than in that output.

The entrypoint is assembled from [head](./prompt/head.md),
[intro](./prompt/intro.md), [docs](./prompt/docs.md), [refs](./prompt/refs.md),
[gen](./prompt/gen.md), and [cli](./prompt/cli.md). It keeps the essential authoring rules together and links
to generated indexes for guides, elements by category, and gallery figures.
Element and gallery text and code are combined into one reference file per
category; guides keep their own files. Every current page and runnable example
is included, with local links rewritten to the relevant entry or embedded JSX
example. The separate PDF package's API link points to its upstream README.
The generated reference indexes include each page's description alongside its link.

The scripts read this package's inputs and write to the parent workspace,
independently of the caller's working directory. Run them from a full `gum-jsx-meta`
checkout. From the workspace root:

```sh
bun gum-jsx-docs/scripts/plugin-build.ts
bun gum-jsx-docs/scripts/plugin-pack.ts
```

`getSkillPrompt()` returns the shared authoring instructions without frontmatter
or CLI setup; pass `{ cli: true }` to append the CLI workflow. `buildSkillFiles()`
adds frontmatter and the linked reference pages, enabling CLI instructions by
default. It only assembles content in memory; `scripts/plugin-build.ts` writes
the plugin's skill directory. Tool-based hosts can use `buildSkillFiles({ cli: false })` and
`mapSkillLinks()` to adapt reference links without rewriting fenced examples.
The MCP server uses this shared assembly and appends its rendering-tool prompt.

Consumers can also read individual pieces through the exported `promptDir` or
`@gum-jsx/docs/prompt/*` subpath. Studio's own chat prompt and tool wiring remain
separate from this portable skill.

`bun run test` also tests skill coverage, link reachability, prompt-example
rendering, plugin rebuilds and packaging, and CLI behavior. Archive tests require
`zip` and `unzip`.

## Run an example

From the parent development workspace:

```sh
gum gum-jsx-docs/docs/guides/code/gum.jsx
gum gum-jsx-docs/docs/gallery/code/two_columns.jsx -o /tmp/two-columns.svg
gum gum-jsx-docs/docs/gallery/code/two_columns.jsx -o /tmp/two-columns.png --ratio 2
gum gum-jsx-docs/docs/elements/code/VStack.jsx -f tree --stats
bun --filter @gum-jsx/docs test
bun run visual-report
bun run typecheck
```

The CLI defaults to kitty graphics; use SVG or PNG output on other terminals.
Examples use the current evaluator's bindings. Set size and font props on the
figure itself or on an explicit **Svg** wrapper. Hosts add an **Svg** viewport
when the example returns a bare element and preserve an explicit **Svg** root.
No legacy packages, image files, custom fonts, network fetches, or generated assets
are required. The test command renders SVG in memory and leaves the checkout unchanged.
The workspace visual-report command renders element and gallery examples
into a searchable standalone HTML report at
`gum-jsx-cli/visual-report/dist/index.html`.
Core behavior tests and synthetic layout fixtures remain in gum-jsx-core.
The former core examples are consolidated into these collections; equivalent
examples share one docs source, and previews are generated on demand.

## Performance demos

Run `bun run perf` from this repository or
`bun run --cwd gum-jsx-docs perf` from the workspace root to benchmark
every JSX file under `demos/`. The suite measures evaluation, layout, SVG
serialization, and complete renders separately. Use `--smoke` for a quick check,
`--filter '^demos/render/'` for complete renders, and `--json` for saved results.
See the [workload notes](test/perf/README.md) for timing boundaries.

## Start reading

The main Gum README covers installation and first figures. This repository owns
its detailed [guides](docs/guides/text), [element references](docs/elements/text),
and [gallery explanations](docs/gallery/text), each paired with runnable JSX.
See [Gum](docs/guides/text/gum.md), [units](docs/guides/text/units.md), and
[sizing](docs/guides/text/sizing.md) when editing introductory examples.

## Elements

Element reference pages live in `docs/elements/text`, with matching sources in
`docs/elements/code`. The catalog groups them by their frontmatter category:
layout, geometry, plotting, maps, networks, text, math, video, and other API areas.
Use `getElements()` or `listElements()` to inspect the current inventory.

## Gallery and guides

`getGuides()` loads conceptual documentation from `docs/guides`; `getGallery()`
loads figures from `docs/gallery`. Both return text, JSX, categories, and
one-sentence descriptions. Studio, the editor, and generated agent references
consume these catalogs rather than maintaining separate copies of examples.

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
bun gum-jsx/src/cli.ts gum-jsx-docs/docs/gallery/code/world_choropleth.jsx -o /tmp/world.svg
```

## Old gallery ports

The former `gala` collection is consolidated into `docs/gallery`. Keep its
retained sources and explanations together, using the current layout engine,
coordinate APIs, and shared palette. The workspace
[development backlog](https://github.com/CompendiumLabs/gum-jsx-meta/blob/master/docs/TODO.md)
tracks remaining development work.
