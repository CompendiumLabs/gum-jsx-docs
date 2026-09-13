# Field

*Category*: plotting

Draw `vectors=[{point,vector},...]`, with either `{x,y}` or `[x,y]` for each
point and vector. Each endpoint is point + scale ×
vector. scale defaults to 1; normalize divides by magnitude before scaling.
Zero/nonfinite vectors are omitted. Origins and endpoints both affect limits.

Default glyphs are arrows, with head_size px(5), head_width 0.65, and ordinary
stroke style. Directions are computed after mapping, so flips and unequal axis
scales orient heads correctly. Shafts stop inside their heads using the same
stroke/cap clearance as [Arrow](./Arrow.md); head tips remain at the mapped endpoints.

shape accepts an Element or (sample,index) function. A custom shape's local x
axis runs from origin to endpoint: width is the mapped vector length;
shape_height defaults to px(8). It receives a cleared data context before
rotation. Callbacks execute once at construction and always receive `{x,y}`
records in sample.point and sample.vector, including for tuple inputs.

[Runnable source](../code/Field.jsx).
