# CLI

*Category*: core

gum-jsx-cli evaluates JSX, lays out the result with gum-jsx-core, and writes SVG,
PNG, PDF, kitty graphics, a fragment tree, or JSON. Run these commands from the
gum-jsx workspace.

```sh
bun run gum gum-jsx-docs/docs/gallery/code/CLI.jsx
bun run gum gum-jsx-docs/docs/gallery/code/CLI.jsx -o /tmp/cli.svg
bun run gum gum-jsx-docs/docs/gallery/code/CLI.jsx -o /tmp/cli.pdf
bun run gum gum-jsx-docs/docs/gallery/code/CLI.jsx -W 320 -o /tmp/cli.png --ratio 2
bun run gum gum-jsx-docs/docs/gallery/code/CLI.jsx -f tree --stats
bun run gum --help
```

| Option | Meaning |
|---|---|
| [file] | Input JSX; omit or use - for stdin |
| -f, --format | kitty, svg, png, pdf, tree, or json |
| -o, --output | Output filename instead of stdout |
| -W, --width | Exact viewport width in pixels |
| -H, --height | Exact viewport height in pixels |
| --ratio | Positive PNG/kitty sampling ratio; default 1 |
| --select | PNG/kitty crop as `x,y,width,height` in source-image pixels |
| --background | Viewport background paint |
| --theme | `light` or `dark`; overrides the source root theme |
| --title | SVG or PDF document title |
| --id-prefix | SVG definition prefix; default "gum" |
| --stats | Layout counters on stderr |
| -h, --help | Help |

An explicit format wins. Otherwise a filename's extension chooses the format,
and stdout defaults to **kitty**, even when piped or redirected. Choose `-f svg`
when you want text on stdout, or `-f pdf` for binary PDF output. Kitty display
requires a compatible terminal.

The root theme defaults to dark for kitty and light for all other formats.
A source `<Svg theme="dark">` or `<Svg theme="light">` takes precedence over
that default; `--theme` overrides the root selection. Explicit paint props and
nested themes still apply. Themes leave backgrounds transparent. `--background`
paints a backdrop at render time, behind any explicit source backgrounds.
See [Themes](./Themes.md).

Viewport overrides are independent. Omitted axes use source dimensions or hug
content; overriding width does not uniformly scale fonts and strokes.
The sampling ratio changes raster resolution without changing layout.
For example, `--select 100,50,200,100 --ratio 3` renders a 200-by-100-pixel
region starting at `(100, 50)` as a 600-by-300 PNG. Coordinates start at the
top-left of the source viewport; width and height must be positive. Cropping
happens before rasterization, preserving sharp vector edges when magnified.
Selection is supported for PNG and kitty in both CLI commands.
SVG/tree/JSON allow zero-sized axes; PNG/PDF/kitty require positive dimensions.

A bare element is wrapped in **Svg** by the CLI. The core evaluator itself does not
add this wrapper. Input and output paths are relative to the current directory.
Errors go to stderr and exit with status 1.

PNG and kitty use gum-jsx-png. **Text** is already encoded as SVG paths, so raster
output does not need separate font registration. Use
`bun run --silent gum ... --stats` to suppress Bun's script announcement.

PDF uses gum-jsx-pdf to write a single vector page at 96 pixels per inch, with
the same viewport, themes, and backgrounds. Text and math are outlines rather
than selectable text; debug overlays are omitted. `--ratio` and `--id-prefix`
do not affect PDF output. See the [PDF API](../../../../gum-jsx-pdf/README.md)
for supported colors and page-size limits.

Watch mode and deck commands are not implemented.
Only run trusted JSX; the evaluator executes JavaScript.

## TeX input

`gum-tex` uses the same output formats and viewport options as `gum`. Pass a
literal formula, `-i formula.tex` for a file, or omit input to read stdin:

```sh
bun run gum-tex 'e^{i\pi}+1=0' -o /tmp/euler.svg
bun run gum-tex 'e^{i\pi}+1=0' -o /tmp/euler.pdf
bun run gum-tex '\frac{a+b}{c+d}' -s 48 -p 0.25 -o /tmp/fraction.png --ratio 2
bun run gum-tex -i formula.tex --inline -f tree --stats
printf '%s\n' 'x^2+y^2=1' | bun run gum-tex -f svg
bun run gum-tex 'x^2+y^2=1' --fit -W 400
bun run gum-tex 'x^2+y^2=1' --theme dark
```

Quote literal TeX with single quotes and omit surrounding `$` delimiters.
Use `--` before a formula starting with a dash. `-s` sets font size in pixels
(default 64); `-p` adds padding in em (default 0). `--inline` selects text style,
`--no-strut` removes the minimum line box, `--color` overrides the theme foreground, and repeatable
`--macro` definitions use command=expansion, such as `'\RR=\mathbb{R}'`.

The natural viewport includes the logical formula box and visible overhang.
An empty axis has a one-pixel floor. `-W` and `-H` alone clip at the original
font size; `--fit` explicitly scales to those dimensions. `--ratio` changes
only raster sampling. See [standalone exports](MathExport.md) for the matching
library API and [math authoring](Math.md) for supported formulas.
