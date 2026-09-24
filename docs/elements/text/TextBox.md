# TextBox

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `width` | Content-sized | `"fill"` occupies available width; lengths set an explicit width |
| `children` | — | Text, inline content, or one existing layout element |
| `padding` | `em(0.6)` | Length or [Box padding shorthand](./Box.md) |
| `border-width` | `px(0)` | Border thickness inside the frame |
| `border-color` | Resolved color | Border paint |
| `background` | `none` | **Box** background |
| `border-radius` | `0` | Scalar, `{ x, y }` / `[x, y]` pair, or [side/corner object](./Box.md) |
| `align` | `{ x: "fill" }` | Fill the child's automatic width; start vertically |
| `text-justify` | `"start"` | start, center, end, or a fraction from 0 to 1 for lines inside generated text |
| `clip` | `false` | Clip content inside the rounded border |

**TextBox** accepts string/**Span**/**Element** children, with 0.6em padding.
Other props follow [Box](./Box.md). **TextFrame** adds a 1px border. **Text** reflows at
the allocated width while font size remains fixed; existing **Element**s are
retained.
`text-*` props configure generated [Text](./Text.md) children through prefix
piping, for example `text-justify="center"` or `text-wrap={false}`.

The panel measures its content, including padding and border. Use `width="fill"`
when it should occupy the offered width. Within an established content area,
its child's unspecified width fills by default. Explicit child widths and min/max
limits are respected; `align-self="start"` keeps a child compact. Height remains
content-sized.

Use **TextCol** for multiple block children. A single element inside JSX fragments
or conditional children is preserved. Mixed strings, **Span**s, and formulas
form one paragraph. Wrap several elements without prose in **Text** to request
inline layout explicitly.
An explicit `align` replaces the default. See [Sizing](../../guides/text/sizing.md).
