## CLI setup

The `gum` command evaluates JSX, lays out the result, and writes SVG, PNG, PDF,
kitty graphics, a fragment tree, or JSON. **Prefer a local package installation
with npm and Node.js 24+**. The authoring plugin does not install an executable
automatically.

Use this discovery order:

1. Reuse an exact renderer path already established in this task and verify it
   with `--version`.
2. Run `npm prefix` to find the current project's root; append
   `node_modules/.bin`.
   Check for `gum` there (`gum.cmd` on Windows), then run that exact path with
   `--version`. This lookup returns a directory, not confirmation that
   Gum is installed or working.
3. If no working local renderer is found, try `gum --version` on PATH.

Stop discovery after these checks: do not search Codex directories, plugin
caches, old tasks, user profiles, package-manager caches, or the filesystem for
a hidden installation. Do not use `bunx` or `npx` to probe.

If no working renderer is found, check `npm --version` and `node --version`,
then install locally with npm and Node.js 24+. Continue the requested
render without a separate installation-mode question. Honor explicit
installation restrictions and setup choices already made.

## Local package installation

Create a dedicated directory under the task's writable tools or temporary
directory and put a minimal `package.json` containing `{"private":true}` there.
Run this command **from that directory**:

```sh
npm install --save-exact @gum-jsx/cli
```

If npm's default cache is not writable in a sandbox, set `npm_config_cache` to
a writable directory (such as a cache directory under the task's temporary
directory) and retry the installation.

The bundled package has no runtime package dependencies. Invoke
`node /absolute/tools-dir/node_modules/@gum-jsx/cli/dist/npm/cli.js`.
Verify with `--version` and retain the exact invocation for later
renders. Run rendering commands from the caller's working directory so input
files resolve there.

Bun 1.4.2+ works equally well: install with `bun add --exact @gum-jsx/cli`
and use `bun` in place of `node` in the invocation above.

This installation needs no global install, PATH or shell-profile changes, or
changes to the user's project dependencies. Only install into the project when
the user requests integration.

If neither Node nor Bun is available, download the standalone archive for your
OS and CPU architecture from [GitHub releases](https://github.com/CompendiumLabs/gum-jsx-cli/releases),
extract it into a writable directory, and run the included `gum` executable
(`gum.exe` on Windows). It includes its runtime; verify it with `--version`.

## Project and library integration

The bundled npm CLI runs under Node.js 24+ with no runtime package dependencies.

- **Project CLI:** install with `npm install --save-dev @gum-jsx/cli`,
  then use `./node_modules/.bin/gum` (or its Windows wrapper).
- **Global CLI:** install with `npm install -g @gum-jsx/cli`, then use `gum`.
- **Library integration:** source packages require Bun or a browser bundler.
  Add the libraries the host code needs, for example
  `npm install --save-exact @gum-jsx/core @gum-jsx/math`.
  See [Rendering](references/guides/rendering.md) for evaluation, layout, and export APIs, and
  [Math export](references/guides/math_export.md) for fonts and standalone formulas.

Choose project-local CLI installation when the user wants dependencies managed
with the project; use global installation when they ask for commands across
projects. Preserve any scope already chosen. Verify the selected CLI with
`--version`.
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
| `-f, --format <format>` | `kitty`, `svg`, `png`, `pdf`, `tree`, or `json` |
| `-o, --output <file>` | Write to a file instead of stdout |
| `-W, --width <pixels>` | Exact viewport width in pixels |
| `-H, --height <pixels>` | Exact viewport height in pixels |
| `-r, --ratio <number>` | Positive PNG/kitty sampling ratio; default `1` |
| `--png-encoding <preset>` | Lossless PNG/kitty encoding: `fast` (default) or `standard` |
| `--select <x,y,width,height>` | PNG/kitty crop in source-image pixels |
| `-b, --background <color>` | Paint the viewport background |
| `-t, --theme <theme>` | `light` or `dark`; override the source root theme |
| `--title <text>` | SVG or PDF document title |
| `--id-prefix <name>` | SVG definition prefix; default `gum` |
| `--precision <digits\|full>` | Output decimal places, 0–100 or `full`; default `10` |
| `--text-mode <mode>` | SVG text and math as `path` (default) or `live` text |
| `--plugin <module>` | Load element/helper exports from a package or file; repeatable, requires Bun |
| `--stats` | Machine-readable layout counters on stderr |
| `-V, --version` | Print the CLI version |
| `-h, --help` | Show help |

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

`--ratio` changes raster resolution without changing layout. For example,
`--select 100,50,200,100 --ratio 3` renders a 200 × 100 region starting at
`(100, 50)` as a 600 × 300 PNG. Coordinates start at the source viewport's
top-left; selection width and height must be positive. Cropping happens before
rasterization, preserving sharp vector edges when magnified. Selection applies
only to PNG and kitty.

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
same viewport, themes, and backgrounds. Text and math are outlines rather than
selectable text; debug overlays are omitted. `--ratio` and `--id-prefix` do not
affect PDF output.

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
