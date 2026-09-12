# Ray

*Category*: geometry

A finite ray from origin at a screen-space angle in degrees (positive clockwise). Defaults: center origin, angle 0, length 0.5 of the shorter frame side. length is a layout length; only the origin contributes data bounds. Use Arrow with from/to for a data-vector endpoint.

Inside [Graph](Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. space="local" opts out of an ambient graph,
and space="data" requires one. Pixel strokes keep their size.

[Runnable source](../code/Ray.jsx).
