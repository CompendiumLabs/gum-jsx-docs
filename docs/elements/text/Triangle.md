---
category: geometry
description: "A Polygon with vertices at top center and both bottom corners."
---

# Triangle

| Property | Default | Meaning |
|---|---|---|
| `points` | `[{x:0.5,y:0}, {x:1,y:1}, {x:0,y:1}]` | Ordered local vertices joined and closed |
| `space` | `"local"` | Use local geometry; `"data"` requires an enclosing coordinate context |

A [Polygon](./Polygon.md) with vertices at top center and both bottom corners.
Unlike **Polygon**, it keeps local fractional geometry by default, including
inside a graph. It accepts **Polygon** props, including a points override and
explicit `space="data"`.
