---
category: plotting
description: "Sample a function or parametric curve and close each finite run into a polygon."
---

# SymPoly

| Property | Default | Meaning |
|---|---|---|
| `f` | — | Parametric `t => {x,y}` function |
| `fx` / `fy` | — | Coordinate functions or constants |
| `xlim` / `ylim` / `tlim` | `[0, 1]` | Sampling ranges when corresponding arrays are absent |
| `xvals` / `yvals` / `tvals` | — | Explicit coordinate or parameter arrays |
| `samples` | `101` | Number of generated samples |
| `space` | Automatic | Use ambient data coordinates or local geometry |

Use the sampling options described by [SymLine](./SymLine.md) and draw with [CoordLine](./CoordLine.md).
Each finite run closes into a polygon.
Use fy for y=`f(x)`, fx for x=`f(y)`, or `f(t)` for parametric points. Limits here
control sampling; enclosing **Graph**/**Plot** limits control the view.

All **CoordLine** styling options are available.
Construction stores immutable sampled data; resizing never executes callbacks.
