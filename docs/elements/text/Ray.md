---
category: geometry
description: "A finite ray from origin at a screen-space angle in degrees (positive clockwise)."
---

# Ray

| Property | Default | Meaning |
|---|---|---|
| `origin` | `[0.5, 0.5]` | **Ray** origin |
| `angle` | `0` | Screen-space direction in degrees, clockwise positive |
| `length` | `0.5` | Distance relative to the shorter side, or a px/em length |
| `space` | Automatic | Use ambient data coordinates or local geometry |

A finite ray from origin at a screen-space angle in degrees (positive clockwise).
Defaults: center origin, angle 0, length 0.5 of the shorter frame side. length is
a layout length; only the origin contributes data bounds. Use **Arrow** with from/to
for a data-vector endpoint.

Point inputs accept `{x,y}` or `[x,y]`; see [Point values](../../guides/text/point_values.md).

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. `space="local"` opts out of an ambient graph,
and `space="data"` requires one. Pixel strokes keep their size.
