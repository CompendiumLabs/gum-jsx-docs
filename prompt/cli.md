## CLI setup

Use an existing Gum CLI when available, or install `@gum-jsx/cli` globally if needed:

```sh
bun install -g @gum-jsx/cli
```

This provides the `gum`, `gum-tex`, and `gum-mark` commands. The examples assume
they are available on your PATH. In a workspace checkout, run `bun install` at
the root and use `bun run gum` (or `bun run gum-tex`) instead.

## Render with the CLI

Save a draft `.jsx` file and render it with `gum`. See the
[CLI guide](references/guides/CLI.md) for the complete options.

```sh
# With your source saved in figure.jsx:
gum figure.jsx -o figure.svg
gum figure.jsx -o figure.png --ratio 2
gum figure.jsx -f tree --stats
gum figure.jsx -f json -o figure.json
```

Choose `-f svg` explicitly for SVG on stdout; the CLI defaults to kitty graphics
even when redirected. Output extensions select SVG, PNG, or PDF when `-f` is
omitted. With neither `-W` nor `-H`, JSX gets a 640 × 480 offer; content can hug
or exceed it, and authored dimensions still win. `--natural` removes that offer.
`-W` and `-H` impose exact viewport dimensions; an unspecified axis uses source
dimensions or hugs content. Use `fit` on the composition for uniform scaling.
`--ratio` changes raster resolution without changing layout. For a detailed PNG
crop, `--select x,y,width,height` uses source-image pixels.

Kitty defaults to a dark theme; file exports default to light. Use `--theme` to
override the root theme and `--background` when the export needs a backdrop.

Inspect a rendered PNG when image viewing is available. Use `-f tree` or `-f json`
to inspect allocations and overflow alongside temporary `debug` overlays. If
visual inspection is unavailable, report the checks actually performed.
