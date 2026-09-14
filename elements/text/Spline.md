# Spline

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| `points` | `[]` | Ordered points; null and nonfinite values split the path |
| `tension` | `1` | Catmull–Rom tangent strength; 0 makes straight segments |
| `closed` | `false` | Close each finite run |
| `space` | Automatic | Use ambient data coordinates or local geometry |

A cubic spline through points. tension defaults to 1; zero makes straight segments. closed joins the final point to the first. Null/nonfinite samples separate runs. Uniform Catmull–Rom tangents may overshoot sample extrema; inference covers samples. Custom endpoint directions and monotone interpolation are deferred.

Point inputs accept `{x,y}` or `[x,y]`; see [Point values](../../topics/text/PointValues.md).

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. `space="local"` opts out of an ambient graph,
and `space="data"` requires one. Pixel strokes keep their size.
