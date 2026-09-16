# MathSpan

*Category*: math

A literal glyph run measured from font outlines. It does not parse TeX or add atom spacing.

| Property | Default | Meaning |
| --- | --- | --- |
| text / children | `""` | Literal string or number content. |
| font_family | `"KaTeX_Main"` | Exact font face; inherited KaTeX families are respected. |
| center | `false` | Center the ink on the math axis instead of using the font baseline. |
| skew | Font correction | Override character accent skew, in em. |
| klass / left / right | `"mord"` | Atom classes exposed to the containing math row. |

Common font, color, and sizing properties follow [Gum units](../../gallery/text/Units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../gallery/text/Math.md) for supported TeX and font setup.
