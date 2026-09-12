# Arrow

*Category*: geometry

A shaft from from/to or through points. curve uses spline tangents; radius rounds a polyline. start_head defaults to false, end_head to true. head_size defaults to px(9), head_width to a width/length ratio of 0.65. head_style overrides head paint. The tip lands at the endpoint; a zero-length shaft has no head.

Inside [Graph](Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. space="local" opts out of an ambient graph,
and space="data" requires one. Pixel strokes keep their size.

[Runnable source](../code/Arrow.jsx).
