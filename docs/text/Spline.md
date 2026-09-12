# Spline

*Category*: geometry

A cubic spline through points. tension defaults to 1; zero makes straight segments. closed joins the final point to the first. Null/nonfinite samples separate runs. Uniform Catmull–Rom tangents may overshoot sample extrema; inference covers samples. Custom endpoint directions and monotone interpolation are deferred.

Point inputs accept `{x,y}` or `[x,y]`; see [Point values](PointValues.md).

Inside [Graph](Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. space="local" opts out of an ambient graph,
and space="data" requires one. Pixel strokes keep their size.

[Runnable source](../code/Spline.jsx).
