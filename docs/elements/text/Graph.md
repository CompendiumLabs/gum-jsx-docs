---
category: plotting
description: "A finite canvas with a linear data coordinate system."
---

# Graph

| Property | Default | Meaning |
|---|---|---|
| `coord` | Inferred | `[xmin, ymin, xmax, ymax]` shorthand for both limits |
| `xlim` | Inferred or `[0, 1]` | Directed horizontal data limits |
| `ylim` | Inferred or `[0, 1]` | Directed vertical data limits |
| `flip-x` | `false` | Reverse horizontal screen mapping |
| `flip-y` | `true` | Reverse vertical screen mapping for Cartesian y-up coordinates |
| `padding` | `0` | Inferred-limit fractions: scalar, side/axis object, `[h, v]`, or `[t, b, l, r]` |
| `clip` | `false` | Clip children to the graph frame |

A finite canvas with a linear data coordinate system. **Graph** infers limits from
graphable children or accepts `xlim={[min,max]}`, `ylim={[min,max]}`, or
`coord={[xmin,ymin,xmax,ymax]}`. Individual limits override coord.

The default is Cartesian: x right, y up. `flip-x` defaults to false and `flip-y` to
true. Descending limits also reverse an axis. padding is a dimensionless fraction
of each inferred data span; explicit limits stay exact.
Empty axes use [0,1]. A singleton expands by `max(0.5, 5% of its magnitude)`;
explicit equal endpoints are errors.

Padding uses the same side and axis shorthands as [Box](./Box.md): a scalar,
`[h, v]`, `[t, b, l, r]`, or an object with `h`/`v`, `t`/`b`/`l`/`r`, or full
side names. Full names override short names, which override axis defaults;
missing sides are zero. The earlier `{x, y}` form remains an alias for `{h, v}`.
Values are nonnegative fractions of the inferred span, with no px/em units.
For example, `padding={[0.12, 0.1]}` adds 12% on each horizontal side and 10% on
each vertical side. Side names refer to displayed edges, including flipped axes.
These forms also work in **Plot**, **BarPlot**, and `infer_coordinates`.

**Graph** naturally measures 480×320, fills finite offers, and uses a 1.5 aspect to
derive a missing axis. An explicit aspect applies the ordinary shape sizing policy.
Nested **Graph**/**Plot** limits are independent and do not affect outer inference.

[CoordLine](./CoordLine.md), [Points](./Points.md), new geometry marks, bars, and
symbolic marks use data coordinates. Ordinary **Line**/**Polyline**/**Path** retain local
fractional geometry. For new marks, `space="local"` opts out; `space="data"` requires
a graph. px/em geometry stays local.

Direct-child x/y positions are data coordinates; omitted positions are at the
local origin. Use x/y/anchor with **Text** for upright annotations, and px/em sizes
for fixed geometry. Annotations do not affect inferred limits. Strokes, markers,
and fonts keep their layout sizes on resize.

clip defaults to false. Clipping hides paint but retains reported overflow.
Use [Plot](./Plot.md) for measured axes and margins, and [Coordinates](../../guides/text/coordinates.md)
for custom graphable elements.
