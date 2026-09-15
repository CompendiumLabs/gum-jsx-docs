# TextMode

*Category*: math

Literal text within math. Spaces and adjacent-run kerning survive; `x^2` stays
literal. Nest [MathText](MathText.md) or [Tex](Tex.md) for mathematical notation.

| Property | Default | Meaning |
| --- | --- | --- |
| text / children | Empty | Literal strings, numbers, spans, or elements. |
| family | Main or selected text face | Choose `"main"`, `"sans"`, or `"mono"` for literal runs. |
| bold / italic | Selected text face | Override the literal face's weight and shape. |
| font-family | Main math text face | An explicit KaTeX face, such as `mathit`. |
| style / size-index | Inherited | Math style and TeX size table; scripts scale text once. |
| strut | `false` | Add the usual one-em math strut. |
| klass / left / right | `"mord"` | Treat the completed text as a math atom. |

The main family includes regular, bold, italic, and bold italic. Sans includes
regular, bold, and italic; mono has regular only. Unsupported combinations
report a missing bundled variant rather than silently changing the typeface.
The `family`, `bold`, and `italic` choices apply to literal runs; nested math
keeps its own math font. Spans can color or resize part of the literal content.

There is no automatic TeX spacing between children and no wrapping inside
`TextMode`. Source line endings and tabs become single spaces; ordinary spaces
are preserved. Use an explicitly sized [Text](Text.md) for a wrapping prose operand.
The TeX adapter uses this literal-run path for `\text`, `\textrm`, and
`\textnormal`, including math nested inside `$…$`. Other text-font commands remain
part of the later typography phase.

See [inline math](../../topics/text/InlineMath.md) and
[mixed composition](../../topics/text/MathComposition.md).
