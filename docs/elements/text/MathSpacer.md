# MathSpacer

*Category*: math

Explicit glue with a signed logical advance. Negative advance moves the next item left while the spacer's physical width stays nonnegative.

| Property | Default | Meaning |
| --- | --- | --- |
| advance | `em(0)` | A signed length, or thin, medium, thick, quad, or qquad. |
| height | `px(0)` | Optional logical height for a strut. |
| axis | Half the height | Math-axis position from the top; may lie outside the box. |

Common font, color, and sizing properties follow [Gum units](../../gallery/text/Units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../gallery/text/Math.md) for supported TeX and font setup.
