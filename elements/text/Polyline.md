# Polyline

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| `points` | `[]` | Ordered local points joined by straight segments |

**Polyline** connects `points` in order with straight segments. Each point is an
object `{ x, y }` or tuple `[x, y]`; both forms can be mixed. An empty list draws nothing. The path remains
open; use [Polygon](./Polygon.md) to close the final edge.

```jsx
<Polyline width={px(240)} height={px(100)}
  points={[[0, 0.8], [0.4, 0.2], [1, 0.6]]}
  fill={none} stroke={green} stroke-width={px(3)} />
```

Fractions map to the polyline's own allocated axes. Pixels and em are also
accepted. Point bounds do not set its size, and there is no automatic data-domain
or aspect inference. For sampled data, explicitly map values into the rectangle;
remember that SVG y increases downward. The [sampled curve showcase](../../topics/text/sampled_curve.md)
demonstrates this without a **Plot** component.

Paint is inherited. Set `fill={none}` for a line chart: if you supply a fill,
SVG fills the area as though the last point were connected to the first even
though the stroked path stays open. `stroke-linejoin` controls the joins, and
`stroke-linecap` controls the two open ends. There is no smoothing option; use
[Path](./Path.md) for Bézier curves.
