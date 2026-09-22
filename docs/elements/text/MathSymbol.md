# MathSymbol

*Category*: math

Select a glyph and its atom class from the TeX symbol table. The default face follows the symbol; prose font families do not override it.

| Property | Default | Meaning |
| --- | --- | --- |
| children | `""` | A character or TeX symbol command. |
| mode | `"math"` | Math or literal text symbol lookup. |
| font_family | Symbol face | Optional exact face; unsupported glyphs fall back per symbol. |
| klass / left / right | Symbol class | Override the atom's spacing classes. |

Common font, color, and sizing properties follow [Gum units](../../gallery/text/Units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../gallery/text/Math.md) for supported TeX and font setup.
