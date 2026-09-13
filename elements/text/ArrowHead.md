# ArrowHead

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| tip | `{ x: 1, y: 0.5 }` | Tip position |
| angle | `0` | Screen-space direction in degrees, clockwise positive |
| head_size | `px(9)` | Head length |
| head_width | `0.65` | Full head width divided by its length |
| open | `false` | Draw stroked barbs instead of a closed head |
| space | Automatic | Use ambient data coordinates or local geometry |

A standalone head at tip, with a screen-space angle in degrees (positive clockwise). head_size defaults to px(9), head_width to 0.65. open draws two stroked barbs; a closed head uses fill. Curved barbs and per-end shape customization are deferred.

Point inputs accept `{x,y}` or `[x,y]`; see [Point values](../../topics/text/PointValues.md).

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. space="local" opts out of an ambient graph,
and space="data" requires one. Pixel strokes keep their size.

[Runnable source](../code/ArrowHead.jsx).
