# ArrowHead

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| `tip` | `[1, 0.5]` | Tip position |
| `angle` | `0` | Screen-space direction in degrees, clockwise positive |
| `head-size` | `px(9)` | Head length |
| `head-width` | `0.65` | Full head width divided by its length |
| `curve` | `0` | Barb curvature from `0` (straight) to `1` (tangent to the shaft at the tip) |
| `open` | `false` | Draw stroked barbs instead of a closed head |
| `barb` | `"both"` | Draw both barbs, or only `"left"` / `"right"` relative to the arrow's direction |
| `space` | Automatic | Use ambient data coordinates or local geometry |

A standalone head at tip, with a screen-space angle in degrees (positive clockwise).
`head-size` defaults to `px(9)`, `head-width` to `0.65`. `open` draws two stroked barbs; a closed
head uses fill. `curve` bows both barbs toward the shaft while keeping the tip
and the two rear endpoints fixed. It accepts a finite number from `0` to `1`;
`0.7` gives a LaTeX-like shape. Both open and filled heads support curved barbs.

`barb="left"` or `barb="right"` selects one side for harpoons. Left and right are
relative to the direction of travel: a right-pointing arrow's left barb is above
the shaft. A closed single-barbed head fills the half-head between the selected
barb and the shaft. `head-width` still describes the full two-sided width.

On [Arrow](./Arrow.md), the same shape and paint options use the `head-` scope:
`head-open`, `head-curve`, `head-barb`, `head-stroke`, and so on. `head-size` and `head-width`
keep their existing names. Head position and direction follow the arrow's route.

Point inputs accept `{x,y}` or `[x,y]`; see [Point values](../../guides/text/point_values.md).

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. `space="local"` opts out of an ambient graph,
and `space="data"` requires one. Pixel strokes keep their size.
