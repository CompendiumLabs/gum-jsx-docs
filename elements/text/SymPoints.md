# SymPoints

*Category*: plotting

Sample using [Sampling](../../topics/text/Sampling.md) and draw with [Points](./Points.md).
Null/nonfinite samples split paths or omit markers.
Use fy for y=f(x), fx for x=f(y), or f(t) for parametric points. Limits here
control sampling; enclosing Graph/Plot limits control the view.

All Points styling options are available. shape and point_size functions run once per finite sample.
Construction stores immutable sampled data; resizing never executes callbacks.


[Runnable source](../code/SymPoints.jsx).
