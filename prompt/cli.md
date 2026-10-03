## CLI setup

The `gum` command evaluates JSX, lays out the result, and writes SVG, PNG, PDF,
kitty graphics, a fragment tree, or JSON. **Prefer a local package installation
with npm and Node.js 24+**. The authoring plugin does not install an executable
automatically.

Use this discovery order:

1. Reuse an exact renderer invocation already established in this task.
2. Look for `gum` on PATH (`command -v gum` in a POSIX shell or
   `Get-Command gum` in PowerShell). If found, use it.
3. Otherwise, run `npm prefix` to find the current project's root and check
   `node_modules/.bin` for `gum` (`gum.cmd` on Windows). If found, use that path.

Use the first available renderer invocation.

Stop discovery after these checks: do not search Codex directories, plugin
caches, old tasks, user profiles, package-manager caches, or the filesystem for
a hidden installation. Do not use `bunx` or `npx` to probe.

If no renderer is found, explain that rendering requires downloading and running
Gum 2.0.0. Follow the host's approval flow before installing or running downloaded
software. Ask the user for setup approval when it is not already authorized.
Honor installation restrictions and the user's chosen scope. If setup is denied
or blocked, provide JSX source and rendering instructions.

## Local package installation

Create a dedicated directory under the task's writable tools or temporary
directory and put a minimal `package.json` containing `{"private":true}` there.
Run this command **from that directory**:

```sh
npm install --save-exact --ignore-scripts @gum-jsx/cli@2.0.0
```

If npm's default cache is not writable in a sandbox, set `npm_config_cache` to
a writable directory (such as a cache directory under the task's temporary
directory) and retry the installation.

The bundled package has no runtime package dependencies and needs no install
scripts. Keep the generated lockfile, including the registry integrity metadata.
Use the pinned version; if it is unavailable or integrity verification fails,
stop and report the error. Invoke
`node /absolute/tools-dir/node_modules/@gum-jsx/cli/dist/npm/cli.js`.
Retain the exact invocation for later renders. Run rendering commands from the caller's working directory so input
files resolve there.

Bun 1.4.2+ works equally well: install with `bun add --exact --ignore-scripts @gum-jsx/cli@2.0.0`
and use `bun` in place of `node` in the invocation above.

This installation needs no global install, PATH or shell-profile changes, or
changes to the user's project dependencies. Only install into the project when
the user requests integration.

If neither Node.js 24+ nor Bun 1.4.2+ is available and no existing Gum renderer
was found, provide JSX source and the npm installation and rendering instructions
for an environment with a supported runtime.

## Project and library integration

The bundled npm CLI runs under Node.js 24+ with no runtime package dependencies.

- **Project CLI:** install with `npm install --save-dev --save-exact --ignore-scripts @gum-jsx/cli@2.0.0`,
  then use `./node_modules/.bin/gum` (or its Windows wrapper).
- **Global CLI:** install with `npm install -g --ignore-scripts @gum-jsx/cli@2.0.0`, then use `gum`.
- **Library integration:** source packages require Bun or a browser bundler.
  Add the libraries the host code needs, for example
  `npm install --save-exact --ignore-scripts @gum-jsx/core@2.0.0 @gum-jsx/math@2.0.0`.
  See [Rendering](references/guides/rendering.md) for evaluation, layout, and export APIs, and
  [Math export](references/guides/math_export.md) for fonts and standalone formulas.

Choose project-local CLI installation when the user wants dependencies managed
with the project; use global installation when they ask for commands across
projects. Preserve any scope already chosen.
If installation is declined or commands cannot run, provide source and rendering
instructions without claiming to have rendered it.

## Render with the CLI

Save a draft `.jsx` file and render it with `gum`. The examples below assume
`gum` is on PATH; substitute the established local invocation when needed.
Pass a JSX file, multiple JSX files, or one deck directory; omit the input or
use `-` to read stdin. Input and output paths are relative to the current directory.

```sh
# With your source saved in figure.jsx:
gum figure.jsx -o figure.svg
gum figure.jsx -o figure.png --ratio 2
gum figure.jsx -o figure.pdf
gum figure.jsx -f tree --stats
gum figure.jsx -f json -o figure.json
gum --help
```

### Options

| Option | Meaning |
|---|---|
| `[files...]` | JSX files or one deck directory; omit or use `-` for stdin |
| `-f, --format <format>` | Image output: `kitty`, `svg`, `png`, `pdf`; layout inspection: `tree` or `json` |
| `-o, --output <file>` | Write to a file instead of stdout |
| `-W, --width <pixels>` | Exact viewport width in pixels |
| `-H, --height <pixels>` | Exact viewport height in pixels |
| `-r, --ratio <number>` | Positive PNG/kitty sampling ratio; default `1` |
| `--png-encoding <preset>` | Lossless PNG/kitty encoding: `fast` (default) or `standard` |
| `--select <x,y,width,height>` | Inspect a PNG/kitty region in source pixels; combine with `--ratio` to magnify |
| `-b, --background <color>` | Paint the viewport background |
| `-t, --theme <theme>` | `light` or `dark`; override the source root theme |
| `--title <text>` | SVG or PDF document title |
| `--id-prefix <name>` | SVG definition prefix; default `gum` |
| `--precision <digits\|full>` | Output decimal places, 0–100 or `full`; default `10` |
| `--text-mode <mode>` | SVG/PDF/PPTX text and math as `path`, `live`, or `mixed` (live prose, outlined math); defaults to `path` for SVG, `live` for PDF, and `mixed` for PPTX |
| `--plugin <module>` | Load element/helper exports from a package or file; repeatable, requires Bun |
| `--stats` | Machine-readable layout counters on stderr |
| `-V, --version` | Print the CLI version |
| `-h, --help` | Show help |

#### Inspect a region with `--select`

Use `--select` to examine fine details and alignment without shrinking the whole
figure to fit the viewer. Supply `x,y,width,height` in source pixels, with the
origin at the viewport's top-left. The CLI lays out the full figure, then crops
before rasterization; selecting a region does not reflow its contents.

```sh
gum figure.jsx --select 100,50,200,100 --ratio 3 -o detail.png
```

This produces a 600 × 300 PNG of the 200 × 100 region starting at `(100, 50)`.
`--ratio` increases sampling resolution, preserving sharp vector edges rather
than enlarging an existing bitmap. Use `-f kitty` instead of `-o detail.png` to
view the crop in a compatible terminal.

Selection works only with PNG and kitty. Width and height must be positive;
fractional coordinates and regions extending outside the viewport are allowed.
Outside areas are transparent unless `--background` supplies a paint. Compare
magnified crops with the full image to check both detail and composition.

#### Inspect layout with `-f tree` and `-f json`

These formats expose the fragments produced by layout:

- **`tree`** gives an indented view of fragment names, measured sizes, child
  offsets and transforms, ink and content bounds, overflow, guides, and clipping.
  Use it to trace unexpected spacing, alignment, or content extending beyond a box.
  `--precision full` preserves full numeric precision in this report.
- **`json`** serializes the fragment data, including drawing commands and nested
  child placements, for structured inspection or further processing. JSON retains
  full numeric precision regardless of `--precision`.

```sh
gum figure.jsx -f tree --precision full
gum figure.jsx -f json -o fragments.json
```

Both formats describe the result after layout. To inspect the source element
tree before layout, use the host APIs in the
[rendering guide](references/guides/rendering.md). Combine fragment inspection
with temporary `debug` props and a rendered image to connect numeric bounds to
visible geometry. `--stats` adds layout counters on stderr without mixing them
into the tree or JSON output.

### Output, sizing, and backgrounds

An explicit format wins; otherwise the output extension selects SVG, PNG, or
PDF. For a file or stdin, stdout defaults to kitty graphics even when piped or
redirected. Choose `-f svg` for SVG text on stdout or `-f pdf` for binary PDF.
Kitty display requires a compatible terminal. Directories and multiple files
require PDF output.

With neither `-W` nor `-H`, JSX gets a 640 × 480 offer; content can hug or exceed
it, and authored dimensions still win. Viewport overrides are independent: an
unspecified axis uses source dimensions or hugs content. `-W 320` reflows a
document without fixing its height; it does not uniformly scale fonts or strokes.
Use `fit` on the composition for uniform scaling. SVG/tree/JSON allow zero-sized
axes; PNG/PDF/kitty require positive dimensions.

`--ratio` changes raster resolution without changing layout.

`--precision` controls SVG, PDF, and tree numbers without changing layout.
PNG and kitty use full geometry precision. Both PNG encoding presets preserve
the same decoded pixels; they differ in compression policy.

Kitty defaults to a dark theme; other formats default to light. A source root
`<Svg theme="light">` or `<Svg theme="dark">` overrides that default, and
`--theme` overrides the root selection. Explicit paints and nested themes still
apply. Themes leave backgrounds transparent; `--background` paints behind
explicit source backgrounds. See [Themes](references/guides/themes.md).
For a fully opaque white PNG, use `--background '#FFFFFF'`: a white root Box
can leave transparency along the last pixel row or column when fractional
dimensions round up to whole pixels.

### Rendering behavior

Core, math, and map bindings are included by default; `GeoMap`,
`world_countries()`, and `us_states()` need no extra flags. The CLI wraps a bare
element in `Svg`; the core evaluator itself does not add this wrapper.
Errors go to stderr and exit with status 1. `--stats` writes layout counters
independently of the rendered output.

PNG and kitty render fragments directly through `@gum-jsx/png`'s WebAssembly
renderer. Text and math always use glyph outlines, including when
`--text-mode live` selects live SVG text. No native addon or host font
registration is needed. Emoji without outlines cannot be rasterized; export
SVG for a browser with suitable fonts.

PDF uses `@gum-jsx/pdf` to write vector pages at 96 pixels per inch with the
same viewport, themes, and backgrounds. Text and math glyphs default to selectable
native text with embedded font subsets shared across pages. Use `--text-mode path`
for outlines. Math decorations remain vector geometry; debug overlays are omitted.
`--ratio` and `--id-prefix` do not affect PDF output.

PPTX defaults to `mixed`: editable prose with fixed line breaks and styled runs,
plus outlined math. It references installed prose fonts without embedding them.
Use `--text-mode live` to make math glyphs editable too; this requires matching math fonts.
Use `--text-mode path` for outlines or for reflected/skewed/nonuniformly scaled text.

Watch mode is not implemented. Only run trusted JSX; evaluation executes JavaScript.

Inspect a rendered PNG when image viewing is available. Use `-f tree` or `-f json`
to inspect allocations and overflow alongside temporary `debug` overlays. If
visual inspection is unavailable, report the checks actually performed.

## Multipage PDFs and decks

Pass JSX files in argument order or one directory of slides to render a multipage PDF:

```sh
gum slides/ -o talk.pdf
gum slides/ > talk.pdf
```

Directories and multiple files default to PDF; other output formats are rejected.
Directories and stdin cannot be combined with other inputs. Each slide
must return a Gum element and becomes one page with its own viewport size. Long
content is not automatically split into pages. Put multiple figures in a deck
directory to combine them into a PDF. `-W` and `-H` apply to every page; `--stats`
writes one JSON line per page to stderr.

### Deck manifest

A deck directory can contain an `index.json`:

```json
{
  "title": "My talk",
  "prelude": "prelude.jsx",
  "slides": ["intro.jsx", "results.jsx", "conclusion.jsx"]
}
```

All three fields are optional. Paths in the manifest are relative to its
directory. `slides` sets the exact page order. When omitted, Gum uses that
directory's `.jsx` files in natural filename order (`slide_2.jsx` before
`slide_10.jsx`), excluding the named prelude. It does not recurse into
subdirectories. `title` supplies PDF document metadata; `--title` overrides it.

### Shared preludes

Use a prelude for shared colors, data, and reusable JSX components. It contains
ordinary declarations, without imports or exports, and does not need to return
a figure. For example, `prelude.jsx` can define:

```jsx
const accent = '#167C73'
function Card({ children, ...props }) {
  return (
    <Frame padding={em(0.75)} border-color={accent} {...props}>
      <Text>{children}</Text>
    </Frame>
  )
}
```

Each prelude is evaluated once per command, and its top-level bindings are shared
by the slides that use it. Core and math helpers remain available. Each slide has
its own local declarations and can be a bare JSX element or JavaScript ending
with an explicit `return`:

```jsx
<Slide title="Shared components">
  <HStack gap={em(1)}>
    <Card grow={1}>First idea</Card>
    <Card grow={1}>Second idea</Card>
  </HStack>
</Slide>
```

Manifest and prelude handling applies to directory input. Explicit files or stdin
use the standard core, math, and map bindings without loading neighboring `index.json`
files. A slide rendered as an individual file must be self-contained. Pass the
deck directory to use its prelude.

The `gum-jsx-docs/decks/gum` sample deck demonstrates a shared page layout,
reusable panels, and a five-page manifest.
