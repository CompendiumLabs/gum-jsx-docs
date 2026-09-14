# Frame

*Category*: layout

Frame is [Box](./Box.md) with a default `border_width={px(1)}`. It has the same
single-content rule, sizing, padding, background, radius, alignment, and clipping.

| Property | Default | Meaning |
|---|---|---|
| padding | `0` | Length or [Box padding shorthand](./Box.md) |
| border_width | `px(1)` | Border thickness inside the frame |
| border_color | Resolved color | Border paint |
| background | `none` | This Frame's background |
| radius | `0` | Scalar radius, `{ x, y }`, or `[x, y]` radii |
| align | `"start"` | Content alignment on both axes, or `{ x, y }` / `[x, y]` |
| clip | `false` | Clip content inside the rounded border |

The default border color comes from inherited color. Supplying border_width
overrides the default; setting it to zero removes the border.
There is no default padding or default background.

Frame's border occupies space inside its outer dimensions. A naturally sized
frame adds two border widths to each content dimension, plus any padding.
The example uses em padding so the space around the label follows its font size.

In a stack, put basis/grow/shrink on the Frame if the frame is the allocated item.
Neither a border nor an unsized shape inside it makes a Frame automatically flexible.
