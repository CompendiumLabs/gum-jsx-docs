# TextFrame

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `width` | Content-sized | `"fill"` occupies available width; lengths set an explicit width |
| `text` | — | String converted to the single **Text** child |
| `padding` | `em(0.6)` | Length or [Box padding shorthand](./Box.md) |
| `border-width` | `px(1)` | Border thickness inside the frame |
| `border-color` | Resolved color | Border paint |
| `background` | `none` | **Box** background |
| `radius` | `0` | Scalar, `{ x, y }` / `[x, y]` pair, or [side/corner object](./Box.md) |
| `align` | `{ x: "fill" }` | Fill the child's automatic width; start vertically |
| `clip` | `false` | Clip content inside the rounded border |

**TextFrame** accepts text or a string/**Span**/**Element** child, with 0.6em padding.
Other props follow [Box](./Box.md). **TextFrame** adds a 1px border. **Text** reflows at
the allocated width while font size remains fixed; existing **Element**s are
retained.

Like [TextBox](./TextBox.md), the frame measures its content by default. Set
`width="fill"` to occupy an offered width. It passes an established content width
through padding and border to automatically sized children, respecting their
explicit widths and min/max limits. `align-self="start"` keeps a child compact.
