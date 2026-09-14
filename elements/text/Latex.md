# Latex

*Category*: math

A complete formula in display style, with a one-em minimum line box. The first implementation supports symbols, groups, signed glue, named operators, colors, and basic font commands.

| Property | Default | Meaning |
| --- | --- | --- |
| text / children | Empty | TeX source or MathText-compatible children. |
| inline | `false` | Choose text style instead of display style. |
| style | Inherited or display | Explicit math style overrides the default. |
| strut | `true` | Keep at least a one-em line box. |
| macros / warnings / on_error | MathText defaults | Parser options and visible error handling. |

Common font, color, and sizing properties follow [Gum units](../../topics/text/Units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../topics/text/Math.md) for supported TeX and font setup.
