# Tex

*Category*: math

The text-style convenience for a complete formula. Embed it inside **Text** for
inline math, or use it in ordinary Gum containers. Inline formulas keep the
paragraph's font scale and stay on one line; see
[math inside prose](../../gallery/text/InlineMath.md).

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | TeX source or MathText-compatible children. |
| inline | `true` | Choose text style by default. |
| style | Inherited or text | Explicit math style overrides the default. |
| strut | `true` | Keep at least a one-em line box. |
| macros / warnings / on_error | MathText defaults | Parser options and visible error handling. |

Common font, color, and sizing properties follow [Gum units](../../guides/text/units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../guides/text/math.md) for supported TeX and font setup.
