---
category: core
description: "The gum command evaluates JSX, lays out the result, and writes SVG, PNG, PDF, kitty graphics, a fragment tree, or JSON."
---

# CLI

The `gum` command evaluates JSX, lays out the result, and writes SVG, PNG, PDF,
kitty graphics, a fragment tree, or JSON. Once the 2.0 candidate is published,
install it with `bun install -g @gum-jsx/cli@beta`. In a workspace checkout,
run `bun install` at the root and use `bun run gum` instead of `gum`.
Save the example below as `figure.jsx`:

```sh
gum figure.jsx
gum figure.jsx -o figure.svg
gum figure.jsx -o figure.pdf
gum figure.jsx -W 320 -o figure.png --ratio 2
gum figure.jsx -f tree --stats
gum --help
```

| Option | Meaning |
|---|---|
| [file] | Input JSX; omit or use - for stdin |
| -f, --format | kitty, svg, png, pdf, tree, or json |
| -o, --output | Output filename instead of stdout |
| -W, --width | Exact viewport width in pixels |
| -H, --height | Exact viewport height in pixels |
| --natural | Disable the default 640 × 480 offer for JSX |
| --ratio | Positive PNG/kitty sampling ratio; default 1 |
| --select | PNG/kitty crop as `x,y,width,height` in source-image pixels |
| --background | Viewport background paint |
| --theme | `light` or `dark`; overrides the source root theme |
| --title | SVG or PDF document title |
| --id-prefix | SVG definition prefix; default "gum" |
| --precision | Output decimal places, 0–100 or `full`; default 10 |
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
See [Themes](./themes.md).

With neither viewport override, `gum` offers 640 × 480 pixels. Unsized canvases
use this budget, explicit source dimensions still win, and content may hug or
grow beyond the offer. Use `--natural` for unbounded intrinsic measurement.
Viewport overrides are independent: when either is supplied, the other axis
uses source dimensions or hugs content. `-W 320` reflows a document without
fixing its height. Overriding width does not uniformly scale fonts and strokes.
The sampling ratio changes raster resolution without changing layout.
For example, `--select 100,50,200,100 --ratio 3` renders a 200-by-100-pixel
region starting at `(100, 50)` as a 600-by-300 PNG. Coordinates start at the
top-left of the source viewport; width and height must be positive. Cropping
happens before rasterization, preserving sharp vector edges when magnified.
Selection is supported for PNG and kitty in both CLI commands.
SVG/tree/JSON allow zero-sized axes; PNG/PDF/kitty require positive dimensions.
`--precision` applies to SVG, PDF, and tree numeric output, and to the SVG used for
PNG and kitty. It does not change the laid-out geometry.

A bare element is wrapped in **Svg** by the CLI. The core evaluator itself does not
add this wrapper. Input and output paths are relative to the current directory.
Errors go to stderr and exit with status 1.

PNG and kitty use gum-jsx-png. **Text** is already encoded as SVG paths, so raster
output does not need separate font registration. `--stats` writes machine-readable
layout counters to stderr independently of the rendered output.

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
gum-tex 'e^{i\pi}+1=0' -o euler.svg
gum-tex 'e^{i\pi}+1=0' -o euler.pdf
gum-tex '\frac{a+b}{c+d}' -s 48 -p 0.25 -o fraction.png --ratio 2
gum-tex -i formula.tex --inline -f tree --stats
printf '%s\n' 'x^2+y^2=1' | gum-tex -f svg
gum-tex 'x^2+y^2=1' --fit -W 400
gum-tex 'x^2+y^2=1' --theme dark
```

Quote literal TeX with single quotes and omit surrounding `$` delimiters.
Use `--` before a formula starting with a dash. `-s` sets font size in pixels
(default 64); `-p` adds padding in em (default 0). `--inline` selects text style,
`--no-strut` removes the minimum line box, `--color` overrides the theme foreground, and repeatable
`--macro` definitions use command=expansion, such as `'\RR=\mathbb{R}'`.

The natural viewport includes the logical formula box and visible overhang.
An empty axis has a one-pixel floor. `-W` and `-H` shrink the formula when needed;
`--fit` also permits enlargement, and `--no-fit` clips at the original font size.
`--ratio` changes
only raster sampling. See [standalone exports](math_export.md) for the matching
library API and [math authoring](math.md) for supported formulas.
