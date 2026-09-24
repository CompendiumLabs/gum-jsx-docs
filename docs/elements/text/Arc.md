---
category: geometry
description: "An ellipse segment with center, scalar or paired radius, and start/end angles in degrees."
---

# Arc

| Property | Default | Meaning |
|---|---|---|
| `center` | `[0.5, 0.5]` | Center of the ellipse |
| `radius` | `0.5` | Scalar radius or independent `{ x, y }` / `[x, y]` radii |
| `start` | `0` | Starting screen-space angle in degrees |
| `end` | `360` | Ending screen-space angle in degrees |
| `space` | Automatic | Use ambient data coordinates or local geometry |

An ellipse segment with center, scalar or paired radius, and start/end angles in degrees. Defaults: center {x:0.5,y:0.5}, radius 0.5, angles 0–360. The span may be at most one turn. In data space, numeric radii are data distances and flips affect orientation. Cubic pieces approximate the ellipse.

Center and paired radii accept `{x,y}` or `[x,y]`.

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. `space="local"` opts out of an ambient graph,
and `space="data"` requires one. Pixel strokes keep their size.
