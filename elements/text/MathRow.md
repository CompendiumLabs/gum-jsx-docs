# MathRow

*Category*: math

An explicit grouped atom. Children align on their math axes and keep their order; the row adds no inter-atom glue.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Elements or TeX strings; each string becomes its own spaced MathText. |
| klass / left / right | `"mord"` | Classes exposed by the complete group. |
| strut | `false` | Add a one-em minimum line box centered on the axis. |

Common font, color, and sizing properties follow [Gum units](../../topics/text/Units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../topics/text/Math.md) for supported TeX and font setup.
