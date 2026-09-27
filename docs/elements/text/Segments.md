---
category: geometry
description: "Independent segments in one drawing. segments is an array of pairs of {x,y} or [x,y] endpoints."
---

# Segments

| Property | Default | Meaning |
|---|---|---|
| `segments` | `[]` | Independent pairs of segment endpoints |
| `space` | Automatic | Use ambient data coordinates or local geometry |

Independent segments in one drawing. segments is an array of pairs of `{x,y}` or `[x,y]` endpoints. Pairs never connect to one another; fill is ignored.

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. `space="local"` opts out of an ambient graph,
and `space="data"` requires one. Pixel strokes keep their size.

Projected point inputs also accept named numeric records such as `{theta, r}`
or `{x, y, z}`; GeoMap uses `{lon, lat}`. Every dimension reaches the projection.
See [Projections](../../guides/text/projections.md) for units and visibility rules.
