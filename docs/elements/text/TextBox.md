# TextBox

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `width` | Content-sized | `"fill"` occupies available width; lengths set an explicit width |
| `text` | — | String converted to the single **Text** child |
| `padding` | `em(0.6)` | Length or [Box padding shorthand](./Box.md) |
| `border-width` | `px(0)` | Border thickness inside the frame |
| `border-color` | Resolved color | Border paint |
| `background` | `none` | **Box** background |
| `radius` | `0` | Scalar, `{ x, y }` / `[x, y]` pair, or [side/corner object](./Box.md) |
| `align` | `{ x: "fill" }` | Fill the child's automatic width; start vertically |
| `clip` | `false` | Clip content inside the rounded border |

**TextBox** accepts text or a string/**Span**/**Element** child, with 0.6em padding.
Other props follow [Box](./Box.md). **TextFrame** adds a 1px border. **Text** reflows at
the allocated width while font size remains fixed; existing **Element**s are
retained.

The panel measures its content, including padding and border. Use `width="fill"`
when it should occupy the offered width. Within an established content area,
its child's unspecified width fills by default. Explicit child widths and min/max
limits are respected; `align-self="start"` keeps a child compact. Height remains
content-sized.

Use **TextCol** for multiple block children. A single element inside JSX fragments
or conditional children is preserved. Mixed strings, **Span**s, and formulas
form one paragraph. Wrap several elements without prose in **Text** to request
inline layout explicitly.
An explicit `align` replaces the default. See [Sizing](../../gallery/text/Sizing.md).
