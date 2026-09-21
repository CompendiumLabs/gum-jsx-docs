# Node

*Category*: networks

| Property | Default | Meaning |
|---|---|---|
| `id` | — | Nonempty identifier used by edges, as on any other element |
| `x` / `y` | `0` / `0` | Position in the parent coordinate system |
| `anchor` | `"center"` | Point of the allocated node placed at x/y |
| `width` | Content-sized | Measure the label; a length sets a wrapping width |
| `children` | — | Text, inline content, or one existing layout element |
| `padding` | `em(0.6)` | Space between the label and inside border |
| `border-width` | `px(1)` | Border thickness inside the frame |
| `border-radius` | `em(0.3)` | Corner radius, including **Box** side/corner forms |
| `align` | `"center"` | Align the label within the frame |
| `text-justify` | `"start"` | start, center, end, or a fraction from 0 to 1 for lines inside a generated label |
| `background` | `none` | Frame background paint |
| `clip` | `false` | Clip content inside the frame's border |

A compact [TextFrame](./TextFrame.md) with a centered placement anchor: the
conventional labeled node. Any element with an `id` can be a node, so **Node** adds
convenient defaults rather than a special capability. Other frame and style
options follow [Box](./Box.md). Text retains its
font size and reflows when given an explicit width. Existing element children,
including math and text stacks, keep their ordinary layout behavior.
`text-*` props configure the generated [Text](./Text.md) label through prefix
piping: `text-justify` sets `justify`, and `text-font-size` sets `font-size`.

The `id` is optional for a standalone node, and required to reference it from an
[Edge](./Edge.md). IDs must be unique within the enclosing [Network](./Network.md).
In Network, x/y are graph data coordinates; in **Group** they are layout lengths.
When wrapping a Node in **Rotate** or another container, put x/y/anchor
on the wrapper to position the whole result.

Connections meet the outer frame, including padding and the inside border.
Label ink and the inner `content` rectangle do not determine attachment points.
Rounded corners use the same radii for drawing and attachment. A frame with
`border-radius={[0.5, 0.5]}` has an elliptical outline.
