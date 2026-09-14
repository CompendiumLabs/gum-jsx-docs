# HBars

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| `values` | `[]` | Bar endpoints |
| `positions` | Indices | Bar centers; must match `values` |
| `bases` | `0` | Scalar, array, or callback for bar baselines |
| `bar-width` | `0.8` | Scalar, array, or callback for widths in data units |
| `direction` | `"horizontal"` | Vertical or horizontal bars |
| `radius` | `0` | Scalar, elliptical pair, or [side/corner object](./Box.md) in layout units |
| `styles` | — | Per-bar style array or `(value, index) => style` callback |
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

Use `radius={{ r: px(6) }}` for rounded right ends and square left ends, or
specify individual `tl`, `tr`, `bl`, and `br` corners. Each entry accepts a length
or elliptical pair. See [Bars](./Bars.md) for all forms and screen-edge semantics.
