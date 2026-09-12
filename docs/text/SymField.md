# SymField

*Category*: plotting

Sample f(x,y) on a rectangular grid and draw it with [Field](Field.md).
The result may be {x,y}, [x,y], or null. xlim/ylim default to [-1,1];
xvals/yvals provide explicit grid coordinates. samples defaults to 11 per axis
or accepts {x,y} counts. All Field options are supported.

The grid has at most 100000 points, with generated counts at most 1000 per axis.
Callbacks run once; zero/nonfinite vectors are omitted. Choose scale to keep
arrows near their cells, and explicit Plot limits when arrow endpoints should
not expand the viewport.

[Runnable source](../code/SymField.jsx).
