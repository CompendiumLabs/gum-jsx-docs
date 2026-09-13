# SymSpline

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| f | — | Parametric `t => {x,y}` function |
| fx / fy | — | Coordinate functions or constants |
| xlim / ylim / tlim | `[0, 1]` | Sampling ranges when corresponding arrays are absent |
| xvals / yvals / tvals | — | Explicit coordinate or parameter arrays |
| samples | `101` | Number of generated samples |
| space | Automatic | Use ambient data coordinates or local geometry |
| tension | `1` | Catmull–Rom tangent strength; 0 makes straight segments |
| closed | `false` | Close each finite run |

Sample using [Sampling](../../topics/text/Sampling.md) and draw with [Spline](./Spline.md).
Null/nonfinite samples split paths or omit markers.
Use fy for y=f(x), fx for x=f(y), or f(t) for parametric points. Limits here
control sampling; enclosing Graph/Plot limits control the view.

All Spline styling options are available. 
Construction stores immutable sampled data; resizing never executes callbacks.
Spline interpolation can overshoot its data points.

[Runnable source](../code/SymSpline.jsx).
