# TransformBox

*Category*: layout

Transform a naturally measured child using an affine matrix [a,b,c,d,e,f]:
x′=ax+cy+e, y′=bx+dy+f. Default is identity. A canvas child needs its own finite
dimensions.

resize defaults to true: transformed bounds set natural size, translated to
the local origin. resize=false keeps the original frame and reports overflow.
Exact allocations override wrapper size. The finished geometry, including
fonts and strokes, is transformed. [Rotate](Rotate.md) provides angles and
[Fit](Fit.md) fits content into an offer.

[Runnable source](../code/TransformBox.jsx).
