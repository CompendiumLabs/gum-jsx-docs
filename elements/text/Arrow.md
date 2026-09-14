# Arrow

*Category*: geometry

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
| `start_head` | `false` | Draw a head at the first point |
| `end_head` | `true` | Draw a head at the last point |
| `head_size` | `px(9)` | Head length, using layout units |
| `head_width` | `1.3` | Full head width divided by its length |
| `head_style` | — | Overrides for head paint; the default fill matches the shaft stroke |
| `head_*` | — | Flat overrides for fields in `head_style` |
| `space` | Automatic | Use ambient data coordinates or local geometry |

Use scoped props such as `head_fill={red}`, `head_stroke={none}`, or
`head_stroke_width={px(2)}` to set head styles directly. They override matching
fields in `head_style`. `head_size` and `head_width` retain their geometry meanings.
See [scoped props](../../topics/text/Style.md#scoped-component-props).

Head tips stay at the requested endpoints. The shaft retreats at headed ends so
its cap fits behind the triangular tip. Clearance accounts for the resolved
stroke width, head width, and butt/round/square cap style. It is computed in
pixels after coordinate mapping, so fixed pixel strokes keep the same clearance
when a graph resizes or flips.

Ends without heads keep their original shaft endpoints and caps. Setting
`head_size` to zero disables both heads and shortening. A zero-length route has
no heads. Very short terminal segments are consumed by the inset; if shortening
uses the entire route, only the heads remain. For a head narrower than the shaft,
the cap stops at the head's base to keep them connected.

Straight, rounded, and spline shafts use the shortened route. Original points
still determine inferred graph limits. The same clearance applies to the arrows
in [Field](./Field.md) and [SymField](./SymField.md).

Point inputs accept `{x,y}` or `[x,y]`; see [Point values](../../topics/text/PointValues.md).

Inside [Graph](./Graph.md), numeric geometry uses data coordinates; outside it,
geometry uses local fractions/px/em. `space="local"` opts out of an ambient graph,
and `space="data"` requires one. Pixel strokes keep their size.
