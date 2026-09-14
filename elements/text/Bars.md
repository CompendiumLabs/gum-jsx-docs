# Bars

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| `values` | `[]` | Bar endpoints |
| `positions` | Indices | Bar centers; must match `values` |
| `bases` | `0` | Scalar, array, or callback for bar baselines |
| `bar-width` | `0.8` | Scalar, array, or callback for widths in data units |
| `direction` | `"vertical"` | Vertical or horizontal bars |
| `radius` | `0` | Scalar, elliptical pair, or [side/corner object](./Box.md) in layout units |
| `styles` | — | Per-bar style array or `(value, index) => style` callback; may override `radius` |
| `space` | Automatic | Use ambient data coordinates or local geometry |

Draw bars from values. positions supplies centers (default indices starting at
zero), bases defaults to zero, and `bar-width` to 0.8 data units. bases and
`bar-width` accept a scalar, a same-length array, or (value,index) function.
Values are endpoints, not lengths relative to a base.

direction defaults to vertical, or horizontal for **HBars**. Negative values work
in either direction. Widths and bases contribute to inferred limits. Nonfinite
values are omitted without shifting category indices.

styles accepts a same-length array or (value,index) function returning style
objects, evaluated once at construction. Defaults: blue fill, no stroke.
radius rounds corners in layout units such as `px(4)`. Use [Graph](./Graph.md) or
[Plot](./Plot.md) for data coordinates.

Return `radius` in a style entry to override the shared radius for that bar:
`styles={(value) => ({ radius: px(abs(value) / 4) })}`. Style arrays support the
same field. An omitted radius inherits the shared value; `radius: 0` keeps that
bar square. Callbacks receive the original value and index, skipping nonfinite
values, and are not rerun during resizing. Per-bar radii accept all forms below;
their `em` lengths use the bar's resolved font size.

Radius also accepts an elliptical `[x, y]` / `{ x, y }` pair or a side/corner
object using `t`, `b`, `l`, `r`, `tl`, `tr`, `bl`, and `br`, as on [Box](./Box.md).
Each entry can be a scalar or pair. For positive vertical bars, round only the
top with `radius={{ t: px(6) }}` to keep the baseline square. For positive
horizontal bars, use `radius={{ r: px(6) }}`.

Sides refer to screen edges, including for negative values and flipped axes.
Use `b` for the exposed end of a negative vertical bar and `l` for a negative
horizontal bar under the default axes. Scalar fractions use the mark allocation's
shorter side; pairs use its width and height. Each bar then caps the resolved
radii at half its own dimensions. px/em radii keep the same size across bars.
