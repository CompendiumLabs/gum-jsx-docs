# TextFigure

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `caption` | — | String or **Element** placed after the figure children |
| `caption-style` / `caption-*` | — | Nested or flat text options for a generated caption |
| `gap` | `em(0.5)` | Space between the figure and caption |
| `padding` | `0` | Length or [Box padding shorthand](./Box.md) |
| `border-width` | `px(0)` | Border thickness inside the frame |
| `border-color` | Resolved color | Border paint |
| `background` | `none` | **Box** background |
| `radius` | `0` | Scalar radius or independent `{ x, y }` / `[x, y]` radii |
| `align` | `"start"` | Content alignment on both axes |
| `clip` | `false` | Clip content inside the rounded border |

A figure followed by an optional caption (string or **Element**). `caption-style`
styles generated text, gap defaults to 0.5em, and **Box** props control outer
decoration. Children must be figure **Element**s. Give a figure an em/px height;
the caption reflows at the shared column width.

Scoped `caption-` props accept generated text options, including `caption-color`,
`caption-font-size`, and `caption-wrap`. They override matching fields in
`caption-style`. Supplied caption **Element**s retain their own props.
