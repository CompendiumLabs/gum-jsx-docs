# SymSpline

*Category*: plotting

Sample using [Sampling](../../topics/text/Sampling.md) and draw with [Spline](./Spline.md).
Null/nonfinite samples split paths or omit markers.
Use fy for y=f(x), fx for x=f(y), or f(t) for parametric points. Limits here
control sampling; enclosing Graph/Plot limits control the view.

All Spline styling options are available. 
Construction stores immutable sampled data; resizing never executes callbacks.
Spline interpolation can overshoot its data points.

[Runnable source](../code/SymSpline.jsx).
