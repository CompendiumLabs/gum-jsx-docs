---
category: geometry
description: "Draw a unit-length horizontal line in a local frame."
---

# UnitLine

| Property | Default | Meaning |
|---|---|---|
| `from` | `[0, 0.5]` | Segment start in the local rectangle |
| `to` | `[1, 0.5]` | Segment end in the local rectangle |

**UnitLine** is a [Line](./Line.md) convenience that defaults to a horizontal
segment from `x=0` to `x=1` at `y=0.5` in its local rectangle. `from` and `to`
can override these defaults, and `space="data"` opts into the enclosing coordinate
context, as on **Line**.

Use [HLine](./HLine.md) or [VLine](./VLine.md) to specify a fixed position and
`lim` span instead of arbitrary endpoints.
