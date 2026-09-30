## CLI setup

Use **standalone `gum` by default** for authoring and rendering figures. It
includes the runtime, fonts, math, maps, and PNG renderer; no Bun installation or
project dependencies are needed. Installing this skill/plugin supplies the
instructions and references, not the executable.

Before rendering:

1. Keep discovery bounded: check `gum --version` on PATH, then the current
   project's or known workspace root's `node_modules/.bin/gum` (the `gum.cmd`
   wrapper on Windows) or an existing Gum script in its `package.json`.
   In a Gum source checkout, use `bun run gum --version`. Reuse a working
   executable, including an exact path already established in this task.
   Do not search Codex directories, plugin caches, past tasks, user profiles,
   package-manager caches, or the filesystem for another copy. Do not use
   `bunx` or `npx` as availability checks.
2. If those checks do not find a working renderer, install a fresh standalone
   copy and continue the requested render. Do not spend time locating an old
   installation or ask the user to choose an installation mode for an ordinary
   figure. Honor explicit installation restrictions and any setup choice already
   made. Use **development/library mode** when the user requests package
   integration or source development.
3. For standalone, detect the OS and architecture and use the matching
   [v2.0.0-beta.3 release](https://github.com/CompendiumLabs/gum-jsx-cli/releases/tag/v2.0.0-beta.3).
   Downloads are available for macOS ARM64 and x64, Linux x64 (glibc), and Windows x64.
   Follow the [CLI setup guide](references/guides/cli.md) for exact asset links,
   checksum verification, extraction, and optional package installation.
   Extract into a new directory under the task's writable tools or temporary
   directory. Invoke the executable by its full path and reuse that exact path
   for subsequent renders; there is no need to add it to PATH.
   For other platforms, offer the Bun package route or a source build instead
   of downloading an incompatible binary.
4. Verify the selected executable with `--version`, then render the requested
   figure. The examples below use `gum`; substitute its selected path or the
   existing project script. Standalone supports math through `Tex`/`Latex`
   and PDF decks.

Linux x64 standalone rendering has been tested. macOS ARM64/x64 and Windows x64
archives are published, but runtime verification on those platforms is pending.
If installation is declined or command execution is unavailable, provide JSX
source and rendering instructions and state that it has not been rendered.

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
