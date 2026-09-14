# RoundedLine

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| `points` | `[]` | Ordered points; null and nonfinite values split the path |
| `radius` | `px(8)` | Quadratic corner radius, clamped to adjacent segments |
| `space` | Automatic | Use ambient data coordinates or local geometry |

A polyline with quadratic rounded corners. radius defaults to `px(8)`, resolves in layout units, and clamps to half each adjacent segment. Rounding stays stable under data scaling. These are quadratic corners, not an exact circular-arc router.

Point inputs accept `{x,y}` or `[x,y]`; see [Point values](../../topics/text/PointValues.md).

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. `space="local"` opts out of an ambient graph,
and `space="data"` requires one. Pixel strokes keep their size.
