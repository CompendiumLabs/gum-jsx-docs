## CLI setup

Rendering requires **Bun and an installed Gum CLI**. Installing
this skill or plugin does not install either dependency. Native rendering has
been tested on Linux x64, macOS, and Windows.

Before rendering:

1. Check for `gum` on PATH (`command -v gum`, or `Get-Command gum` in
   PowerShell) and a project-local executable in `node_modules/.bin/`, including
   the workspace root when applicable. Inspect the project's `package.json`
   for `@gum-jsx/cli` and existing Gum scripts. Run the selected executable with
   `--help` to confirm it is the JSX renderer with SVG, PNG, and PDF output.
   Reuse a working installation; prefer the project-local one when both exist.
   Do not use `bunx` or `npx` to check availability, since they can install packages.
2. If neither installation is available, ask whether the user wants a **global
   install** (available across projects) or a **local install** (adds the CLI to
   the current project's development dependencies). Wait for their choice, then
   carry out that installation. If they have already chosen a scope in this
   conversation, use it without asking again.

Use the tested CLI release for a new installation:

- **Global:** `bun install -g @gum-jsx/cli@2.0.0-beta.2`. Use `gum` afterward;
  if its binary directory is not on PATH, use the installed executable's full path.
- **Local:** run `bun add --dev --exact @gum-jsx/cli@2.0.0-beta.2` in the chosen
  project directory. Use `./node_modules/.bin/gum` afterward (the corresponding
  local executable on Windows), or the project's existing Gum script.

Verify the installed command with `--help`, then render the requested figure.
The examples below use `gum`; substitute the selected local executable or
project script as needed. The installation also provides `gum-tex` and `gum-mark`.
In a Gum source workspace, use the existing `bun run gum` script.

If the user declines installation or the host cannot run commands, provide the
JSX source and rendering instructions, and state that it has not been rendered.

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

Inspect a rendered PNG when image viewing is available. Use `-f tree` or `-f json`
to inspect allocations and overflow alongside temporary `debug` overlays. If
visual inspection is unavailable, report the checks actually performed.

## Plugins

Core bindings are mandatory, and math and maps are bundled by default. Map
elements and helpers, including `GeoMap`, `world_countries()`, and `us_states()`,
are available without extra flags. Add `--plugin <package>` for another installed
package or `--plugin ./elements.ts`
for a local JavaScript/TypeScript module. Package names and relative module
paths resolve from the current working directory, not the CLI installation or
the input's directory. Packages must already be installed in that project.

Named exports become available in the evaluated source; default exports are
ignored. Repeat `--plugin` to load multiple modules. Later exports override
earlier bindings, including math, maps, and core names. The same plugin bindings are
available to a file, stdin, and every prelude and slide in a deck.

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
