# TextBox

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `width` | `"fill"` | Occupy available width; `"fit"` measures content; lengths set an explicit width |
| `text` | — | String converted to the single **Text** child |
| `padding` | `em(0.6)` | Length or [Box padding shorthand](./Box.md) |
| `border-width` | `px(0)` | Border thickness inside the frame |
| `border-color` | Resolved color | Border paint |
| `background` | `none` | **Box** background |
| `radius` | `0` | Scalar radius or independent `{ x, y }` / `[x, y]` radii |
| `align` | `{ x: "fill" }` | Fill the child's automatic width; start vertically |
| `clip` | `false` | Clip content inside the rounded border |

**TextBox** accepts text or a string/**Span**/**Element** child, with 0.6em padding.
Other props follow [Box](./Box.md). **TextFrame** adds a 1px border. **Text** reflows at
the allocated width while font size remains fixed; existing **Element**s are
retained.

The panel fills its offered width, including padding and border, and fills its
child's unspecified width inside that content area. Explicit child widths,
`width="fit"`, and min/max limits are respected. With no width offer, the panel
measures its content. Height remains content-sized.

Use **TextCol** for multiple block children. A single element inside JSX fragments
or conditional children is preserved; strings and **Span** children form inline text.
An explicit `align` replaces the default. See [Sizing](../../topics/text/Sizing.md).
