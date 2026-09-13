# Bars

*Category*: plotting

Draw bars from values. positions supplies centers (default indices starting at
zero), bases defaults to zero, and bar_width to 0.8 data units. bases and
bar_width accept a scalar, a same-length array, or (value,index) function.
Values are endpoints, not lengths relative to a base.

direction defaults to vertical, or horizontal for HBars. Negative values work
in either direction. Widths and bases contribute to inferred limits. Nonfinite
values are omitted without shifting category indices.

styles accepts a same-length array or (value,index) function returning style
objects, evaluated once at construction. Defaults: blue fill, no stroke.
radius rounds corners in layout units such as px(4). Use [Graph](./Graph.md) or
[Plot](./Plot.md) for data coordinates.

[Runnable source](../code/Bars.jsx).
