---
category: geometry
description: "Polygon connects points in order and closes the path back to the first point."
---

# Polygon

| Property | Default | Meaning |
|---|---|---|
| `points` | `[]` | Ordered vertices; null and nonfinite samples split the path |
| `space` | Automatic | Use ambient data coordinates when available; otherwise local geometry |

**Polygon** is a [Polyline](./Polyline.md) with `closed` enabled. It connects
points in order and closes each finite run back to its first point. Null,
nonfinite, and hidden projected samples split the path.

Inside [Graph](./Graph.md), [Plot](./Plot.md), or [GeoMap](./GeoMap.md), numeric
vertices use ambient coordinates and contribute to ordinary Graph/Plot limit
inference. Custom projections need explicit output limits and can accept named
records such as `{theta, r}`, `{x, y, z}`, or geographic `{lon, lat}`.

Outside a coordinate context, `{ x, y }` objects and `[x, y]` tuples use local
fractions, px, or em. Set `space="local"` to retain that behavior inside a graph;
explicit `space="data"` requires a coordinate context. Tagged px/em/% pairs stay
local. The point list does not establish the polygon's layout size.

```jsx
<Polygon space="local" width={px(120)} height={px(100)}
  points={[[0.5, 0], [1, 1], [0, 1]]}
  fill={green} stroke={none} />
```

Shared sizing and paint props work as on [Rect](./Rect.md). There is no default
fill; set one explicitly for a solid silhouette. `stroke-linejoin` and
`stroke-miterlimit` control stroked corners. Empty points produce no drawing.
Vertices outside the allocated rectangle remain outside; clipping belongs to a
container or the root viewport.

The example uses `linspace(90,450,count,false)` and `polard` to generate regular
polygons in graph coordinates without duplicating their closing vertices. See [Arrays](../../guides/text/arrays.md) and
[Vectors](../../guides/text/vectors.md) for these helpers. There is no point-list
bounding-box fit. Use [Polyline](./Polyline.md) for an open outline or [Path](./Path.md)
for curved edges.
