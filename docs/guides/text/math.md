---
category: math
description: "Math is available in the CLI and editor through the optional gum-jsx-math package."
---

# Math authoring

Math is available in the CLI and editor through the optional `gum-jsx-math`
package. Start with [Latex](../../elements/text/Latex.md) for a complete formula,
[Tex](../../elements/text/Tex.md) for text style, or
[MathText](../../elements/text/MathText.md) to mix TeX with explicit math elements.

```jsx
<Box font-size={px(36)} padding={em(0.5)}>
  <Latex>{String.raw`\sin x+\cos y=\operatorname{rank}(A)`}</Latex>
</Box>
```

Symbols, ordinary groups, named operators, atom-class overrides, signed glue,
color changes, composed font commands, and local macros are implemented.
Scripts, fractions, indexed radicals, large operators and limits, and scalable
delimiters (including `\middle`) are also available. See
[ordinary mathematical expressions](../../gallery/text/math_expressions.md) for parsed and direct
JSX examples. Formulas also work [inside prose](../../gallery/text/inline_math.md), and ordinary
Gum elements work [inside math](../../gallery/text/math_composition.md). [Matrices, arrays, and cases](../../gallery/text/math_arrays.md)
and [aligned equations](../../gallery/text/aligned_math.md) are available, together with
[accents, braces, and arrows](../../gallery/text/math_decorations.md), [math boxes](../../gallery/text/math_boxes.md),
and [composed fonts and macros](math_fonts.md). Unsupported constructs throw
an error; they never disappear.

[TextMode](../../elements/text/TextMode.md) treats strings literally, preserving
spaces and run kerning, while nested `MathText` continues to parse TeX. Use it
for labels such as “distance” in a fraction or “average” in a subscript.

## Spacing and groups

`MathText` supplies TeX atom spacing: `a+b`, `-x`, and `a+-b` have different
binary-operator behavior. Explicit glue such as `\,` or `\!` does not reset the
neighboring classes. In particular, `a\!b` is narrower than `ab` by one sixth of
the active em.

A nested `MathText` stays part of the surrounding sequence when it changes only
style or color. Thus `a<MathText color={red}>+b</MathText>` keeps binary spacing.
Sizing, atom-class overrides, a strut, or visible error handling make a nested
sequence an atom. [MathRow](../../elements/text/MathRow.md),
[MathBox](../../elements/text/MathBox.md), and TeX braces always group their
contents: `a{+}b` treats the inner plus as an ordinary atom.

`MathText` preserves the baseline across local style and size declarations.
`MathRow` aligns children on their math axes without automatic inter-atom glue.
Use [MathSpacer](../../elements/text/MathSpacer.md) for explicit signed advances.
[MathCol](../../elements/text/MathCol.md) stacks independent formulas.
[MathArray](../../elements/text/MathArray.md) aligns columns and row baselines,
with explicit gaps and table rules.

## Size, color, and export

Use `font-size={px(36)}` to set the base em. All eight math styles are accepted
as element props, including cramped variants; script and scriptscript glyphs
use factors of 0.7 and 0.5 without repeated scaling through nested groups.
TeX style commands and `\mathchoice` select the active style. Size declarations
from `\tiny` through `\Huge` use TeX's table of text/script/scriptscript sizes;
the equivalent JSX property is `size-index={1}` through `size-index={11}`, with
normal size at `6`. The selected size index is part of layout cache identity.
Ordinary Gum sizing props use the inherited Gum font size; math-specific glue,
rule thickness, and gaps use the active math em.

`\limits` and `\nolimits` override a large or named operator's normal policy.
Direct JSX uses `limits="auto"`, `limits="always"`, or `limits="never"` on
`MathOp` or `SupSub`. Generalized fractions preserve requested style, rule
thickness, and delimiters. Continued fractions reserve the numerator strut.

Whole standalone formulas [shrink automatically](./sizing.md#fitting) to finite
offers and maximum sizes. Inline formulas and internal TeX allocations keep their
normal font scale. Set `fit={false}` for unscaled overflow. MathSpacer, MathRule,
and MathStretch instead obey their allocations; explicit `fit` can scale their
whole drawing. Formula ink inherits `color`; `MathRule` also
accepts an explicit `fill`.

Outlines retain ink beyond the logical advance, including italic glyphs and
negative kerns. An explicit `Svg` viewport clips at its edges, so leave padding
for overhang. The comparison script expands to the union of logical size and
ink before rendering. [Standalone helpers and gum-tex](math_export.md) now
provide that viewport directly, with synchronous and asynchronous SVG export.
See also [formula labels on plots](../../gallery/text/math_plot_labels.md) and [math in slides](../../gallery/text/math_slides.md).

## Library setup

```ts
import { LayoutPass, Box, Svg, px, em, render_svg, evaluate } from '@gum-jsx/core'
import * as math from '@gum-jsx/math'

const fonts = math.createMathFonts()
// Browser hosts preload before layout. Bun can also load local faces on demand.
await fonts.load()
const source = evaluate('<Latex>a+b=c</Latex>', { scope: math })
const viewport = new Svg({ font_size: px(36),
  children: new Box({ padding: em(0.5), children: source }) })
const pass = new LayoutPass({ fonts: { value: fonts, version: fonts.version } })
const svg = render_svg(pass.layout(viewport))
```

Registration and element construction perform no font I/O. `loadBaseMathFonts`
preloads the seven base faces; `loadMathFonts` preloads all eighteen, or a
selected list. Browser bundlers must support TTF asset imports. SVG output uses
paths and needs no installed fonts or page CSS. Keep a pass's font resource
version current after replacing registered faces.

`MathError.kind` distinguishes parse failures, unsupported syntax, unknown
symbols, and missing glyphs. Core wraps layout failures in `LayoutError`, whose
`cause` retains the typed error and source location. `on-error="render"` renders
a visible formula diagnostic; missing font resources and programming errors
still propagate to the host.

## Development: compare renderers

Contributors with a repository checkout can compare renderers from the workspace root:

```sh
gum gum-jsx-docs/docs/guides/code/math.jsx -o /tmp/math.png --ratio 2
bun run compare 'a+b=c' -S 48 -o /tmp/math-compare.png
bun run compare --suite -S 48 -o /tmp/math-gallery.png
bun run compare --suite 3 --inline -S 48 -o /tmp/math-inline.png
bun run compare --suite 4 -S 48 -o /tmp/math-text.png
bun run compare --suite 5 -S 48 -o /tmp/math-arrays.png
bun run compare --suite 5 --inline -S 48 -o /tmp/math-arrays-inline.png
bun run compare --suite 6 -S 48 -o /tmp/math-typography.png
bun run compare --suite 6 --inline -S 48 -o /tmp/math-typography-inline.png
bun run compare --suite 7 -S 48 -o /tmp/math-exports.png
```

The comparison script requires Chromium, `pdflatex`, and `pdftoppm`. It places
Gum, KaTeX HTML, and LaTeX side by side at equal pixels per em. Use `--artifacts`
to keep SVG, HTML, individual PNGs, and LaTeX logs. A failed renderer gets a
visible error panel and a nonzero exit status. `--no-latex` explicitly requests
a two-renderer comparison.
