# SymPoints

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| f | — | Parametric `t => {x,y}` function |
| fx / fy | — | Coordinate functions or constants |
| xlim / ylim / tlim | `[0, 1]` | Sampling ranges when corresponding arrays are absent |
| xvals / yvals / tvals | — | Explicit coordinate or parameter arrays |
| samples | `101` | Number of generated samples |
| space | Automatic | Use ambient data coordinates or local geometry |
| point_size | `px(6)` | Marker size, pair, or callback |
| shape | `Circle` | Marker Element or callback |

Sample using [Sampling](../../topics/text/Sampling.md) and draw with [Points](./Points.md).
Null/nonfinite samples split paths or omit markers.
Use fy for y=f(x), fx for x=f(y), or f(t) for parametric points. Limits here
control sampling; enclosing Graph/Plot limits control the view.

All Points styling options are available. shape and point_size functions run once per finite sample.
Construction stores immutable sampled data; resizing never executes callbacks.


[Runnable source](../code/SymPoints.jsx).
