---
category: geometry
description: "A piecewise linear path through {x,y} or [x,y] points."
---

# CoordLine

| Property | Default | Meaning |
|---|---|---|
| `points` | `[]` | Ordered points; null and nonfinite values split the path |
| `closed` | `false` | Close each finite run |
| `space` | Automatic | Use ambient data coordinates or local geometry |

A piecewise linear path through `{x,y}` or `[x,y]` points. Null/nonfinite samples break the path. closed closes each finite run. Paint uses ordinary fill/stroke styles.

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. `space="local"` opts out of an ambient graph,
and `space="data"` requires one. Pixel strokes keep their size.

Projected point inputs also accept named numeric records such as `{theta, r}`
or `{x, y, z}`; GeoMap uses `{lon, lat}`. Every dimension reaches the projection.
See [Projections](../../guides/text/projections.md) for units and visibility rules.
