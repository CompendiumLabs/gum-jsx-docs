# Tex

*Category*: math

The inline-style convenience for a complete formula. It currently composes with ordinary Gum containers; embedding formulas within a prose Text paragraph is a later phase.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | TeX source or MathText-compatible children. |
| inline | `true` | Choose text style by default. |
| style | Inherited or text | Explicit math style overrides the default. |
| strut | `true` | Keep at least a one-em line box. |
| macros / warnings / on_error | MathText defaults | Parser options and visible error handling. |

Common font, color, and sizing properties follow [Gum units](../../gallery/text/Units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../gallery/text/Math.md) for supported TeX and font setup.
