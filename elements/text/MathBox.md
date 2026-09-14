# MathBox

*Category*: math

Pad, allocate, and align one math child while preserving its baseline and axis. The wrapper is an ordinary grouped atom by default.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | One element or TeX string. |
| padding | `px(0)` | Inset lengths around the content. |
| align | `"start"` | Ordinary Box alignment; width changes allocate space without scaling glyphs. |
| klass / left / right | `"mord"` | Classes exposed by the wrapper. |

Common font, color, and sizing properties follow [Gum units](../../topics/text/Units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../topics/text/Math.md) for supported TeX and font setup.
