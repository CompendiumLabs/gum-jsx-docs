---
category: plotting
description: "Sample a function and draw its path with optional arrowheads."
---

# SymArrow

| Property | Default | Meaning |
| --- | --- | --- |
| `f` | — | Parametric function returning a numeric coordinate record, `[x, y]`, or null |
| `fx` / `fy` | — | Cartesian coordinate functions or constants |
| `xlim` / `ylim` / `tlim` | `[0, 1]` | Sampling ranges when corresponding arrays are absent |
| `xvals` / `yvals` / `tvals` | — | Explicit coordinate or parameter arrays |
| `samples` | `101` | Number of generated samples |
| `start-head` | `false` | Draw a head at the first sample |
| `end-head` | `true` | Draw a head at the last sample |
| `head-size` | `px(9)` | Head length, using layout units |
| `curve` | `false` | Connect projected samples with a spline |
| `tension` | `1` | Spline tangent strength when `curve` is true |
| `radius` | `0` | Rounded-corner radius for a non-curved route |
| `space` | Automatic | Use ambient data coordinates or local geometry |

Use the sampling options described by [SymLine](./SymLine.md) and draw with
[Arrow](./Arrow.md). All Arrow styling and `head-*` options are available.
Sampling supplies the path, so `points`, `from`, and `to` are not inputs.
Set `start-head` for heads at both ends, or `end-head={false}` to omit the end head.

`f(t)` can return named numeric records such as `{theta, r}`, `{lon, lat}`, or
`{x, y, z}`. Every dimension reaches the enclosing projection; only the projected
samples determine shaft geometry and head directions. Head sizes remain layout
lengths. See [Projections](../../guides/text/projections.md) for a polar spiral.
`tlim` controls the parameter range; Graph limits describe the projected view.
`fx`, `fy`, `xvals`, and `yvals` keep their Cartesian meanings.

Null/nonfinite samples and hidden projected points split the shaft. Heads appear
only at visible original endpoints with a usable segment; cuts do not acquire
heads. Construction stores immutable sampled data, so resizing never executes
the sampling callbacks again.
