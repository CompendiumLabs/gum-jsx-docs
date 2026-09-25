---
category: geometry
description: "Polyline connects points in order with straight segments."
---

# Polyline

| Property | Default | Meaning |
|---|---|---|
| `points` | `[]` | Ordered points in the selected coordinate space |
| `space` | `"local"` | `"data"` uses the enclosing Graph, Plot, or GeoMap coordinate context |

**Polyline** connects `points` in order with straight segments. Each point is an
object `{ x, y }` or tuple `[x, y]`; both forms can be mixed. An empty list draws nothing. The path remains
open; use [Polygon](./Polygon.md) to close the final edge.

```jsx
<Polyline width={px(240)} height={px(100)}
  points={[[0, 0.8], [0.4, 0.2], [1, 0.6]]}
  fill={none} stroke={green} stroke-width={px(3)} />
```

By default, fractions map to the polyline's own allocated axes, with y increasing
downward. Pixels and em are also accepted. Point bounds do not set its layout
size or aspect. This local behavior remains the default inside Graph or GeoMap.

Set `space="data"` to project each supplied vertex through the enclosing
[Graph](./Graph.md), Plot, or [GeoMap](./GeoMap.md). A coordinate context is
required. Numeric vertices contribute to ordinary Graph/Plot limit inference;
custom projections still require explicit output limits. Tagged px/em/% pairs
bypass data mapping, while a custom projection rejects mixed data/length pairs.

```jsx
<Graph
  aspect={1} xlim={[-1, 1]} ylim={[-1, 1]}
  projection={([theta, r]) => [r * cos(theta), r * sin(theta)]}
>
  <Polyline
    space="data"
    points={linspace(0, tau, 121).map(theta => [theta, 0.8])}
    fill={none} stroke={blue} stroke-width={px(2)}
  />
</Graph>
```

Only supplied vertices are projected; add enough samples for curved routes.
A projection returning `null` breaks the path, so visible vertices on opposite
sides of a hidden point are not joined. Stroke widths remain ordinary layout
lengths. See [Projections](../../guides/text/projections.md).
[CoordLine](./CoordLine.md) uses ambient data coordinates by default and also
accepts explicit null gaps; [SymLine](./SymLine.md) supplies function sampling.

Paint is inherited. Set `fill={none}` for a line chart: if you supply a fill,
SVG fills the area as though the last point were connected to the first even
though the stroked path stays open. `stroke-linejoin` controls the joins, and
`stroke-linecap` controls the two open ends. There is no smoothing option; use
[Path](./Path.md) for Bézier curves.
