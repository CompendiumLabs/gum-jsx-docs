# Sampling

*Category*: api

`sample_points(options)` returns an immutable array of {x,y} or null gaps.
sample_curve also includes the parameter: {t,point}. linspace(a,b,n) generates
inclusive values; n=0 is empty, n=1 returns a. Pass false as its fourth argument
to omit the closing endpoint for periodic data. See [Arrays](Arrays.md) for
range, linspace, and grid generation, and [Math helpers](MathHelpers.md) for
functions such as sin, cos, and exp, available directly in JSX.

| Inputs | Sampling rule |
|---|---|
| fy + xlim/xvals | y = fy(x) |
| fx + ylim/yvals | x = fx(y) |
| f + tlim/tvals | f(t) returns {x,y} or [x,y] |
| fx + fy | Independent coordinate functions of t |
| xvals + yvals | Paired explicit samples |
| Only one value array | Missing values span the other limit, default [0,1] |

fx/fy may be constants. samples defaults to 101 for generated arrays; explicit
arrays determine count and must agree. Domains default to [0,1]. With one scalar
function, tvals/tlim can supply its independent values. Empty input produces no
samples. Defining one coordinate with both a function and values is an error.

Null/nonfinite samples remain gaps. Lines and fills split there; points omit
them. An asymptote between two finite samples cannot be detected automatically:
insert a gap or split the domain. Callback failures report the sample index.
Counts are integers bounded at 100000.

Sampling runs once at construction. Callbacks and closure state are not stored
in source descriptions. Build a new element to resample; resizing reuses data.
Adaptive sampling is deferred.

[Runnable source](../code/Sampling.jsx).
