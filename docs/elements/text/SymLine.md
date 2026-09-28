---
category: plotting
description: "Sample a function at the specified values and draw with CoordLine."
---

# SymLine

| Property | Default | Meaning |
|---|---|---|
| `f` | — | Parametric function returning a numeric coordinate record, `[x,y]`, or null |
| `fx` / `fy` | — | Coordinate functions or constants |
| `xlim` / `ylim` / `tlim` | `[0, 1]` | Sampling ranges when corresponding arrays are absent |
| `xvals` / `yvals` / `tvals` | — | Explicit coordinate or parameter arrays |
| `samples` | `101` | Number of generated samples |
| `space` | Automatic | Use ambient data coordinates or local geometry |
| `closed` | `false` | Close each finite run |

Sample a function at the specified values and draw with [CoordLine](./CoordLine.md).
Null/nonfinite samples split paths or omit markers.
Use fy for y=`f(x)`, fx for x=`f(y)`, or `f(t)` for parametric points. Limits here
control sampling; enclosing **Graph**/**Plot** limits control the view.
Named records such as `{theta, r}` retain every dimension until the enclosing
Graph projects them. Any nonfinite dimension creates a gap. `fx`, `fy`,
`xvals`, and `yvals` retain their Cartesian meanings.

All **CoordLine** styling options are available.
Use [SymArrow](./SymArrow.md) for the same sampling options with optional arrowheads.
Construction stores immutable sampled data; resizing never executes callbacks.
