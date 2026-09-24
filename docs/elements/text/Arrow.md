---
category: geometry
description: "Draw a straight, curved, or rounded shaft with optional arrowheads between points."
---

# Arrow

A shaft from from/to or through points. curve makes a spline; radius rounds a
polyline. Both heads follow the original route's endpoint directions.

| Property | Default | Meaning |
| --- | --- | --- |
| `from` | `[0, 0]` | Start point when `points` is omitted |
| `to` | `[1, 1]` | End point when `points` is omitted |
| `points` | `from`, `to` | Full shaft route; overrides `from` and `to` |
| `curve` | `false` | Connect the route with a spline |
| `tension` | `1` | Spline tangent strength when `curve` is true |
| `radius` | `0` | Rounded-corner radius for a non-curved route |
| `start-head` | `false` | Draw a head at the first point |
| `end-head` | `true` | Draw a head at the last point |
| `head-size` | `px(9)` | Head length, using layout units |
| `head-width` | `1.3` | Full head width divided by its length |
| `head-curve` | `0` | Barb curvature from `0` (straight) to `1` (tangent to the shaft at the tip) |
| `head-open` | `false` | Draw stroked barbs; the shaft reaches their tip |
| `head-barb` | `"both"` | Draw both barbs, or only `"left"` / `"right"` relative to each head's direction |
| `head-style` | — | Head shape and paint overrides: `open`, `curve`, `barb`, and style fields |
| `head-*` | — | Flat overrides for fields in `head-style` |
| `space` | Automatic | Use ambient data coordinates or local geometry |

Use scoped props such as `head-fill={red}`, `head-stroke={none}`, or
`head-stroke-width={px(2)}` to set head styles directly. Head options are shared
with [ArrowHead](./ArrowHead.md): `head-open` forwards `open`, `head-curve` forwards
`curve`, and paint options follow the same rule. Flat props override matching
fields in `head-style`, so `head-style={{open: true, curve: 0.7}}` can also set
the shape. `head-size` and `head-width` already have the same names on ArrowHead
and remain separate geometry props. Head lengths in em use the head's font size.
See [scoped props](../../guides/text/style.md#scoped-component-props).

`head-curve={0.7}` gives LaTeX-like barbs. It is independent of `curve`, which
controls the shaft's spline. See [ArrowHead](./ArrowHead.md) for the curvature scale.
For a harpoon, combine `head-open` with `head-barb="left"` or `head-barb="right"`.
Sides are relative to each head's direction, so start and end heads face opposite
ways. Single-barbed heads meet the shaft at the tip, whether open or filled.

Open heads default to the shaft's stroke color, width, caps, and joins; `head-*`
paint options can override them. They always have no fill. The shaft reaches
the tip to meet the barbs, including on short routes and curved shafts.

Closed heads default to a fill matching the shaft stroke and no outline.
Head tips stay at the requested endpoints. The shaft retreats at closed, two-sided heads so
its cap fits behind the tip. Clearance accounts for the resolved stroke width,
head width, head curvature, and butt/round/square cap style. It is computed in
pixels after coordinate mapping, so fixed pixel strokes keep the same clearance
when a graph resizes or flips.

Ends without heads keep their original shaft endpoints and caps. Setting
`head-size` to zero disables both heads and shortening. A zero-length route has
no heads. Very short terminal segments are consumed by the inset; if shortening
uses the entire route, only the heads remain. For a head narrower than the shaft,
the cap stops at the head's base to keep them connected.

Straight, rounded, and spline shafts use the shortened route. Original points
still determine inferred graph limits. The same clearance applies to the arrows
in [Field](./Field.md) and [SymField](./SymField.md).

Point inputs accept `{x,y}` or `[x,y]`; see [Point values](../../guides/text/point_values.md).

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. `space="local"` opts out of an ambient graph,
and `space="data"` requires one. Pixel strokes keep their size.
