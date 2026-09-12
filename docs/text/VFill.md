# VFill

*Category*: geometry

Fill a region between points and boundary, arrays of {x,y} records. boundary
may be a scalar baseline (default 0). Arrays must have matching lengths; a gap
in either boundary splits the whole region.

direction defaults to vertical (horizontal for HFill). For vertical fills a
scalar supplies y; for horizontal fills it supplies x. VFill is the vertical
convenience. Defaults: pale blue fill, no stroke.

Numeric geometry follows [Graph](Graph.md) and participates in limits, including
the baseline. [SymFill](SymFill.md) samples function boundaries.

[Runnable source](../code/VFill.jsx).
