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
npm install --save-exact @gum-jsx/cli@beta
```

If npm's default cache is not writable in a sandbox, set `npm_config_cache` to
a writable directory (such as a cache directory under the task's temporary
directory) and retry the installation.

The bundled package has no runtime package dependencies. Invoke
`node /absolute/tools-dir/node_modules/@gum-jsx/cli/dist/npm/cli.js`.
Verify with `--version` and retain the exact invocation for later
renders. Run rendering commands from the caller's working directory so input
files resolve there.

Bun 1.4.2+ works equally well: install with `bun add --exact @gum-jsx/cli@beta`
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

- **Project CLI:** install with `npm install --save-dev @gum-jsx/cli@beta`,
  then use `./node_modules/.bin/gum` (or its Windows wrapper).
- **Global CLI:** install with `npm install -g @gum-jsx/cli@beta`, then use `gum`.
- **Library integration:** source packages require Bun or a browser bundler.
  Add the libraries the host code needs, for example
  `npm install --save-exact @gum-jsx/core@2.0.0-beta.4 @gum-jsx/math@2.0.0-beta.4`.
  See [Rendering](references/guides/rendering.md) for evaluation, layout, and export APIs, and
  [Math export](references/guides/math_export.md) for fonts and standalone formulas.

Choose project-local CLI installation when the user wants dependencies managed
with the project; use global installation when they ask for commands across
projects. Preserve any scope already chosen. Verify the selected CLI with
`--version`.
If installation is declined or commands cannot run, provide source and rendering
instructions without claiming to have rendered it.

## Render with the CLI

Save a draft `.jsx` file and render it with `gum`. The command accepts one input
file or deck directory; omit the input or use `-` to read stdin. See the
[CLI guide](references/guides/cli.md) for the complete options.

```sh
# With your source saved in figure.jsx:
gum figure.jsx -o figure.svg
gum figure.jsx -o figure.png --ratio 2
gum figure.jsx -o figure.pdf
gum figure.jsx -f tree --stats
gum figure.jsx -f json -o figure.json
```

For a file or stdin, choose `-f svg` explicitly for SVG on stdout; the CLI defaults
to kitty graphics even when redirected. Output extensions select SVG, PNG, or PDF when `-f` is
omitted. With neither `-W` nor `-H`, JSX gets a 640 × 480 offer; content can hug
or exceed it, and authored dimensions still win.
`-W` and `-H` impose exact viewport dimensions; an unspecified axis uses source
dimensions or hugs content. Use `fit` on the composition for uniform scaling.
`--ratio` changes raster resolution without changing layout. For a detailed PNG
crop, `--select x,y,width,height` uses source-image pixels.

Kitty defaults to a dark theme; file exports default to light. Use `--theme` to
override the root theme and `--background` when the export needs a backdrop.
For a fully opaque white PNG, use `--background '#FFFFFF'`: a white root Box
can leave transparency along the last pixel row or column when fractional
dimensions round up to whole pixels.

Inspect a rendered PNG when image viewing is available. Use `-f tree` or `-f json`
to inspect allocations and overflow alongside temporary `debug` overlays. If
visual inspection is unavailable, report the checks actually performed.

## Multipage PDFs and decks

Pass one directory of slides to render a multipage PDF:

```sh
gum slides/ -o talk.pdf
gum slides/ > talk.pdf
```

Directory input defaults to PDF; other output formats are rejected. Each slide
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

Manifest and prelude handling applies to directory input. A single file or stdin
uses ordinary core and math bindings without loading neighboring `index.json`
files. A slide rendered as an individual file must be self-contained. Pass the
deck directory to use its prelude.

The `gum-jsx-docs/decks/gum` sample deck demonstrates a shared page layout,
reusable panels, and a five-page manifest.
