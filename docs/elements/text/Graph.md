---
category: plotting
description: "A finite canvas with data coordinates and an optional projection."
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
| `projection` | None | Pure record-to-record callback returning `{x, y}` or `null`, or a core `Projection` |

A finite canvas with a linear data coordinate system by default. **Graph** infers limits from
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
symbolic marks use data coordinates. **Line** and **Polyline** default to local
fractional geometry; set `space="data"` to use the graph's coordinate mapping.
**Path** retains local geometry. For marks that use data coordinates by default,
`space="local"` opts out; `space="data"` requires a coordinate context.
px/em geometry stays local.

Direct-child numeric `pos` values are data coordinates. Children with `pos`
default to `anchor="center"`; without `pos`, they default to `anchor="start"`
at the local origin. Use `anchor="start"` for a positioned child's top-left corner.
Use `pos` and `anchor` with **Text** for upright annotations, and px/em sizes
for fixed geometry. Annotations do not affect inferred limits. Strokes, markers,
and fonts keep their layout sizes on resize.

See [Positioning](../../guides/text/positioning.md) for the shared `pos` and
`anchor` rules, including local lengths and placement of wrapped content.

With `projection`, numeric records retain every dimension and tuples expand to
`{x, y}` before the usual limits and flips map them to pixels. For `{theta, r}`
polar data, use `projection={({theta, r}) => ({x: r * cos(theta), y: r * sin(theta)})}`. Supply both
`xlim` and `ylim` (or `coord`) in the **output** coordinate space; custom
projections do not infer limits. A square canvas with limits `[-1, 1]` on both
axes displays a unit polar disk.

Numeric child `pos` annotations use the same projection. Tuples expand to
`{x, y}`; named records such as `{theta, r}` or `{x, y, z}` reach the callback
with every dimension intact. Cartesian positions require both components.
Omitting `pos` keeps the child at the local origin; `pos={[0, 0]}` maps data zero.
Two tagged lengths bypass projection; mixing
a data number with a tagged length is an error. `space="local"` still opts marks
out. A callback may return `null` to hide a point or break a sampled path.

For a custom annotation space, for example:

```jsx
<Graph
  xlim={[-1, 1]} ylim={[-1, 1]}
  projection={({theta, r}) => ({x: r * cos(theta), y: r * sin(theta)})}
>
  <Text pos={{theta: pi / 4, r: 0.8}} anchor="center">45°</Text>
</Graph>
```

Built-in marks and parametric `f(t)` samples accept the same named records.
Points callbacks receive the complete source record before projection; any
nonfinite dimension creates a gap. Scalar Fill boundaries and Field vector
arithmetic stay Cartesian.

Callbacks must be pure and stable for the lifetime of the element. They run
during layout, unlike construction-time style callbacks. Elements project only
the points they already have: supply a sampled route to **Arrow** or **CoordLine**
when a nonlinear projection should bend it. Text and marker shapes stay upright;
paths are not automatically resampled. See [Projections](../../guides/text/projections.md)
for a polar plot, the core API, and geometry limitations.

clip defaults to false. Clipping hides paint but retains reported overflow.
Use [Plot](./Plot.md) for measured axes and margins, and [Coordinates](../../guides/text/coordinates.md)
for custom graphable elements.
