---
category: plotting
description: "Draw a series of vertical bars from values, positions, and baselines."
---

# VBars

| Property | Default | Meaning |
|---|---|---|
| `values` | `[]` | Bar endpoints |
| `positions` | Indices | Bar centers; must match `values` |
| `bases` | `0` | Scalar, array, or callback for bar baselines |
| `bar-width` | `0.8` | Scalar, array, or callback for widths in data units |
| `direction` | `"vertical"` | Vertical or horizontal bars |
| `border-radius` | `0` | Scalar, elliptical pair, or [side/corner object](./Box.md) in layout units |
| `styles` | — | Per-bar style array or `(value, index) => style` callback; may override `border-radius` |
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
`border-radius` rounds corners in layout units such as `em(0.25)`. Use [Graph](./Graph.md) or
[Plot](./Plot.md) for data coordinates.

Use `border-radius={{ t: em(0.5) }}` for rounded tops and square bottoms, or specify
individual `tl`, `tr`, `bl`, and `br` corners. Each entry accepts a length or
elliptical pair. See [Bars](./Bars.md) for all forms and screen-edge semantics.
For value-dependent rounding, return `border_radius` from `styles`, for example
`styles={(v) => ({ border_radius: v < 0 ? { b: em(0.5) } : { t: em(0.5) } })}`.
