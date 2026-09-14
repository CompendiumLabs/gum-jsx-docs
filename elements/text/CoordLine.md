# CoordLine

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| points | `[]` | Ordered points; null and nonfinite values split the path |
| closed | `false` | Close each finite run |
| space | Automatic | Use ambient data coordinates or local geometry |

A piecewise linear path through `{x,y}` or `[x,y]` points. Null/nonfinite samples break the path. closed closes each finite run. Paint uses ordinary fill/stroke styles.

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. space="local" opts out of an ambient graph,
and space="data" requires one. Pixel strokes keep their size.
