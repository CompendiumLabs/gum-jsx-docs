# MathText

*Category*: math

A TeX-spaced source sequence. It parses string children, classifies atoms, cancels unary binary operators, and inserts the appropriate glue.

| Property | Default | Meaning |
| --- | --- | --- |
| text / children | Empty | TeX source, math elements, or an array of both. |
| style | Inherited or `"text"` | Math style; script styles scale once and use tight spacing. |
| strut | `false` | Add a one-em minimum line box. |
| klass / left / right | Sequence edges | Overrides turn a nested sequence into a grouped atom. |
| macros | Empty | Local map from TeX command names to replacement strings. |
| warnings | `"error"` | KaTeX compatibility warnings: error, warn, or ignore. |
| on_error | `"throw"` | Throw a typed formula error, or render a visible diagnostic. |

Common font, color, and sizing properties follow [Gum units](../../topics/text/Units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../topics/text/Math.md) for supported TeX and font setup.
