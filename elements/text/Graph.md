# Graph

*Category*: plotting

A finite canvas with a linear data coordinate system. Graph infers limits from
graphable children or accepts `xlim={[min,max]}`, `ylim={[min,max]}`, or
`coord={[xmin,ymin,xmax,ymax]}`. Individual limits override coord.

The default is Cartesian: x right, y up. flip_x defaults to false and flip_y to
true. Descending limits also reverse an axis. padding is a dimensionless fraction
of each inferred data span, either a number or {x,y}; explicit limits stay exact.
Empty axes use [0,1]. A singleton expands by max(0.5, 5% of its magnitude);
explicit equal endpoints are errors.

Graph naturally measures 480×320, fills finite offers, and uses a 1.5 aspect to
derive a missing axis. An explicit aspect applies the ordinary shape sizing policy.
Nested Graph/Plot limits are independent and do not affect outer inference.

[CoordLine](./CoordLine.md), [Points](./Points.md), new geometry marks, bars, and
symbolic marks use data coordinates. Ordinary Line/Polyline/Path retain local
fractional geometry. For new marks, space="local" opts out; space="data" requires
a graph. px/em geometry stays local.

Direct-child x/y positions are data coordinates; omitted positions are at the
local origin. Use x/y/anchor with Text for upright annotations, and px/em sizes
for fixed geometry. Annotations do not affect inferred limits. Strokes, markers,
and fonts keep their layout sizes on resize.

clip defaults to false. Clipping hides paint but retains reported overflow.
Use [Plot](./Plot.md) for measured axes and margins, and [Coordinates](../../topics/text/Coordinates.md)
for custom graphable elements.

[Runnable source](../code/Graph.jsx).
