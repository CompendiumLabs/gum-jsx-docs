# TextFrame

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `width` | `"fill"` | Occupy available width; `"fit"` measures content; lengths set an explicit width |
| `text` | — | String converted to the single **Text** child |
| `padding` | `em(0.6)` | Length or [Box padding shorthand](./Box.md) |
| `border-width` | `px(1)` | Border thickness inside the frame |
| `border-color` | Resolved color | Border paint |
| `background` | `none` | **Box** background |
| `radius` | `0` | Scalar radius or independent `{ x, y }` / `[x, y]` radii |
| `align` | `{ x: "fill" }` | Fill the child's automatic width; start vertically |
| `clip` | `false` | Clip content inside the rounded border |

**TextFrame** accepts text or a string/**Span**/**Element** child, with 0.6em padding.
Other props follow [Box](./Box.md). **TextFrame** adds a 1px border. **Text** reflows at
the allocated width while font size remains fixed; existing **Element**s are
retained.

Like [TextBox](./TextBox.md), the frame fills an offered width and passes its
content width through padding and border to automatically sized children.
Explicit child widths, `width="fit"`, and min/max limits are respected.
Use `width="fit"` for a compact frame; with no width offer, content determines its size.
