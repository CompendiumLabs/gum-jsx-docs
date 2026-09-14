# CLI

*Category*: core

gum-next-cli evaluates JSX, lays out the result with gum-next-core, and writes SVG,
PNG, kitty graphics, a fragment tree, or JSON. Run these commands from the
gum-next workspace.

```sh
bun run gum gum-next-docs/topics/code/CLI.jsx
bun run gum gum-next-docs/topics/code/CLI.jsx -o /tmp/cli.svg
bun run gum gum-next-docs/topics/code/CLI.jsx -W 320 -o /tmp/cli.png --ratio 2
bun run gum gum-next-docs/topics/code/CLI.jsx -f tree --stats
bun run gum --help
```

| Option | Meaning |
|---|---|
| [file] | Input JSX; omit or use - for stdin |
| -f, --format | kitty, svg, png, tree, or json |
| -o, --output | Output filename instead of stdout |
| -W, --width | Exact viewport width in pixels |
| -H, --height | Exact viewport height in pixels |
| --ratio | Positive PNG/kitty sampling ratio; default 1 |
| --background | Viewport background paint |
| --title | Escaped SVG title |
| --id-prefix | SVG definition prefix; default "gum" |
| --stats | Layout counters on stderr |
| -h, --help | Help |

An explicit format wins. Otherwise a filename's extension chooses the format,
and stdout defaults to **kitty**, even when piped or redirected. Choose `-f svg`
when you want text on stdout. Kitty display requires a compatible terminal.

Viewport overrides are independent. Omitted axes use source dimensions or hug
content; overriding width does not uniformly scale fonts and strokes.
The sampling ratio changes raster resolution without changing layout.
SVG/tree/JSON allow zero-sized axes; PNG/kitty require positive dimensions.

A bare element is wrapped in Svg by the CLI. The core evaluator itself does not
add this wrapper. Input and output paths are relative to the current directory.
Errors go to stderr and exit with status 1.

PNG and kitty use gum-next-png. Text is already encoded as SVG paths, so raster
output does not need separate font registration. Use
`bun run --silent gum ... --stats` to suppress Bun's script announcement.

PDF, watch mode, themes, zoom, TeX, and deck commands are not implemented.
Only run trusted JSX; the evaluator executes JavaScript.
