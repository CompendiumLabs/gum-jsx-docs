# TextMode

*Category*: math

Literal text within math. Spaces and adjacent-run kerning survive; `x^2` stays
literal. Nest [MathText](MathText.md) or [Tex](Tex.md) for mathematical notation.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Literal strings, numbers, spans, or elements. |
| family | Main or selected text face | Choose `"main"`, `"sans"`, or `"mono"` for literal runs. |
| bold / italic | Selected text face | Override the literal face's weight and shape. |
| font-family | Main math text face | An explicit KaTeX face, such as `mathit`. |
| style / size-index | Inherited | Math style and TeX size table; scripts scale text once. |
| strut | `false` | Add the usual one-em math strut. |
| klass / left / right | `"mord"` | Treat the completed text as a math atom. |

The main family includes regular, bold, italic, and bold italic. Sans includes
regular, bold, and italic; mono has regular only. Sans bold italic and styled
mono fall back to the corresponding Main face to retain weight and shape.
KaTeX's current renderer instead errors on these unavailable combinations.
Glyphs missing from the selected face fall back to their ordinary text face;
glyphs absent there too produce an error.
The `family`, `bold`, and `italic` choices apply to literal runs; nested math
keeps its own math font. Spans can color or resize part of the literal content.

There is no automatic TeX spacing between children and no wrapping inside
`TextMode`. Source line endings and tabs become single spaces; ordinary spaces
are preserved. Use an explicitly sized [Text](Text.md) for a wrapping prose operand.
The TeX adapter uses this literal-run path for composed family, weight, and
shape commands, including math nested inside `$…$`. See
[math fonts and macros](../../gallery/text/MathFonts.md) for the command list,
local resets, emphasis, accents, and verbatim text.

See [inline math](../../gallery/text/InlineMath.md) and
[mixed composition](../../gallery/text/MathComposition.md).
