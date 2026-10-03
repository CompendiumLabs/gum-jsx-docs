---
category: geometry
description: "Polyline connects points in order with straight segments."
---

# Polyline

| Property | Default | Meaning |
|---|---|---|
| `points` | `[]` | Ordered points in the selected coordinate space |
| `closed` | `false` | Close each finite run back to its first point |
| `space` | Automatic | Use ambient data coordinates when available; otherwise local geometry |

**Polyline** connects `points` in order with straight segments. Each point is an
object `{ x, y }` or tuple `[x, y]`; both forms can be mixed. An empty list draws
nothing. The path remains open unless `closed` is set. With gaps, each finite
run is closed independently. [Polygon](./Polygon.md) is the convenience form
with closing always enabled and the same coordinate behavior.

```jsx
<Polyline width={px(240)} height={px(100)}
  points={[[0, 0.8], [0.4, 0.2], [1, 0.6]]}
  fill={none} stroke={green} stroke-width={px(3)} />
```

Outside a coordinate context, fractions map to the polyline's own allocated
axes, with y increasing downward. Pixels and em are also accepted. Point bounds
do not set its layout size or aspect.

Inside [Graph](./Graph.md), [Plot](./Plot.md), or [GeoMap](./GeoMap.md), each
numeric vertex uses the ambient coordinate context automatically, just like
[Points](./Points.md). Set `space="local"` to opt out, or `space="data"` to
require a coordinate context (and throw when none is available).
Numeric vertices contribute to ordinary Graph/Plot limit inference;
custom projections still require explicit output limits. Tagged px/em/% pairs
bypass data mapping, while a custom projection rejects mixed data/length pairs.
Data inputs also accept named numeric records such as `{theta, r}` or `{x, y, z}`.

```jsx
<Graph
  aspect={1} xlim={[-1, 1]} ylim={[-1, 1]}
  projection={({theta, r}) => ({x: r * cos(theta), y: r * sin(theta)})}
>
  <Polyline
    points={linspace(0, tau, 120, false).map(theta => ({theta, r: 0.8}))}
    closed
    fill={none} stroke={blue} stroke-width={px(2)}
  />
</Graph>
```

Only supplied vertices are projected; add enough samples for curved routes.
A null sample, any nonfinite dimension, or a projection returning `null` breaks
the path, so visible vertices on opposite
sides of a hidden point are not joined. Stroke widths remain ordinary layout
lengths. See [Projections](../../guides/text/projections.md).
[SymLine](./SymLine.md) supplies function sampling.

Paint is inherited. Set `fill={none}` for a line chart: if you supply a fill,
SVG fills the area as though the last point were connected to the first even
though the stroked path stays open. `stroke-linejoin` controls the joins, and
`stroke-linecap` controls the two open ends. There is no smoothing option; use
[Path](./Path.md) for Bézier curves.
