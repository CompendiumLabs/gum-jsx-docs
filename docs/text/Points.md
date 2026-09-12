# Points

*Category*: geometry

Repeat a marker at each {x,y} in points. Null/nonfinite entries are omitted
without changing callback indices. Positions use ambient [Graph](Graph.md)
coordinates or local fractions outside it.

point_size is full marker diameter/size, default px(6). Scalar fractions use the
shorter frame side; {x,y} sizes resolve per axis. It may be a (point,index)
function returning either form. shape is an Element or (point,index) function;
the default is Circle.

Callbacks execute once at construction. Shapes receive exact marker dimensions
and a cleared data context, then are centered on their points. The same immutable
shape can be reused everywhere. Defaults: black fill, no stroke. Return styled
shapes for individual colors. Marker sizes do not contribute to data limits.

[Runnable source](../code/Points.jsx).
