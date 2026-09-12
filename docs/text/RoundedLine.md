# RoundedLine

*Category*: geometry

A polyline with quadratic rounded corners. radius defaults to px(8), resolves in layout units, and clamps to half each adjacent segment. Rounding stays stable under data scaling. These are quadratic corners, not an exact circular-arc router.

Point inputs accept `{x,y}` or `[x,y]`; see [Point values](PointValues.md).

Inside [Graph](Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. space="local" opts out of an ambient graph,
and space="data" requires one. Pixel strokes keep their size.

[Runnable source](../code/RoundedLine.jsx).
