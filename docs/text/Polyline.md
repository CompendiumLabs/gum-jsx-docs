# Polyline

*Category*: geometry

Polyline connects `points` in order with straight segments. Each point is an
object `{ x, y }`, not an array. An empty list draws nothing. The path remains
open; use [Polygon](Polygon.md) to close the final edge.

```jsx
<Polyline width={px(240)} height={px(100)}
  points={[{ x: 0, y: 0.8 }, { x: 0.4, y: 0.2 }, { x: 1, y: 0.6 }]}
  fill="none" stroke="#2c7567" stroke_width={px(3)} />
```

Fractions map to the polyline's own allocated axes. Pixels and em are also
accepted. Point bounds do not set its size, and there is no automatic data-domain
or aspect inference. For sampled data, explicitly map values into the rectangle;
remember that SVG y increases downward. The [sampled curve showcase](../../gala/text/sampled_curve.md)
demonstrates this without a Plot component.

Paint is inherited. Set fill="none" for a line chart: if you supply a fill,
SVG fills the area as though the last point were connected to the first even
though the stroked path stays open. stroke_linejoin controls the joins, and
stroke_linecap controls the two open ends. There is no smoothing option; use
[Path](Path.md) for Bézier curves.

[Runnable source](../code/Polyline.jsx) · [Style](Style.md)
