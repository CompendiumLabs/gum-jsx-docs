# Arrow

*Category*: geometry

A shaft from from/to or through points. curve makes a spline; radius rounds a
polyline. Both heads follow the original route's endpoint directions.

| Property | Default | Meaning |
| --- | --- | --- |
| start_head | false | Draw a head at the first point |
| end_head | true | Draw a head at the last point |
| head_size | px(9) | Head length, using layout units |
| head_width | 0.65 | Full head width divided by its length |
| head_style | — | Overrides for head paint; the default fill matches the shaft stroke |

Head tips stay at the requested endpoints. The shaft retreats at headed ends so
its cap fits behind the triangular tip. Clearance accounts for the resolved
stroke width, head width, and butt/round/square cap style. It is computed in
pixels after coordinate mapping, so fixed pixel strokes keep the same clearance
when a graph resizes or flips.

Ends without heads keep their original shaft endpoints and caps. Setting
head_size to zero disables both heads and shortening. A zero-length route has
no heads. Very short terminal segments are consumed by the inset; if shortening
uses the entire route, only the heads remain. For a head narrower than the shaft,
the cap stops at the head's base to keep them connected.

Straight, rounded, and spline shafts use the shortened route. Original points
still determine inferred graph limits. The same clearance applies to the arrows
in [Field](./Field.md) and [SymField](./SymField.md).

Point inputs accept `{x,y}` or `[x,y]`; see [Point values](../../topics/text/PointValues.md).

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. space="local" opts out of an ambient graph,
and space="data" requires one. Pixel strokes keep their size.

[Runnable source](../code/Arrow.jsx) · [Cap comparison](../../topics/text/arrow_caps.md).
