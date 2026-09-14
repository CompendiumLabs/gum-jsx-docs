# Anchor

*Category*: layout

A zero-size point or line frame around a naturally measured child. With no
dimensions it measures 0×0; width/height or exact requests can establish a
line or rectangle. align defaults to center and accepts a single alignment
value, an `{x,y}` object, or an `[x,y]` tuple. Ink and overflow retain the
visible child.

| Property | Default | Meaning |
|---|---|---|
| align | `"center"` | Position the child within the Anchor frame on both axes |

Use parent-owned x/y/anchor props to position the Anchor itself in Group or
Graph. `anchor` selects the wrapper's own attachment point; `align` positions
its child within the wrapper's frame. Positioning and child sizes remain separate.
