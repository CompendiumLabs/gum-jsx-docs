# TextBox

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| text | — | String converted to the single Text child |
| padding | `em(0.6)` | Length or [Box padding shorthand](./Box.md) |
| border_width | `px(0)` | Border thickness inside the frame |
| border_color | Resolved color | Border paint |
| background | `none` | Box background |
| radius | `0` | Scalar radius or independent `{ x, y }` / `[x, y]` radii |
| align | `"start"` | Content alignment on both axes |
| clip | `false` | Clip content inside the rounded border |

TextBox accepts text or a string/Span/Element child, with 0.6em padding.
Other props follow [Box](./Box.md). TextFrame adds a 1px border. Text reflows at
the allocated width while font size remains fixed; existing Elements are
retained.

[Runnable source](../code/TextBox.jsx).
