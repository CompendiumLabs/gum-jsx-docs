# Segments

*Category*: geometry

Independent segments in one drawing. segments is an array of pairs of `{x,y}` or `[x,y]` endpoints. Pairs never connect to one another; fill is ignored.

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. space="local" opts out of an ambient graph,
and space="data" requires one. Pixel strokes keep their size.

[Runnable source](../code/Segments.jsx).
