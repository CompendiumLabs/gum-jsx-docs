# MathCol

*Category*: math

Stack math elements vertically, with an explicit gap and horizontal alignment. The complete column is one atom, centered on its own math axis.

Use [MathArray](MathArray.md) for shared columns, row baselines, and table rules,
or [aligned equations](../../gallery/text/AlignedMath.md) for TeX multiline environments.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Elements or TeX strings. |
| gap | `em(0)` | Nonnegative vertical spacing. |
| justify | `"center"` | Horizontal start, center, end, or fractional alignment. |
| axis | Half the height | Optional axis position measured from the top. |
| klass / left / right | `"mord"` | Classes exposed by the complete column. |

Common font, color, and sizing properties follow [Gum units](../../guides/text/units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../guides/text/math.md) for supported TeX and font setup.
