---
category: plotting
description: "Use the sampling options described by SymLine and draw with Points."
---

# SymPoints

| Property | Default | Meaning |
|---|---|---|
| `f` | — | Parametric function returning a numeric coordinate record, `[x,y]`, or null |
| `fx` / `fy` | — | Coordinate functions or constants |
| `xlim` / `ylim` / `tlim` | `[0, 1]` | Sampling ranges when corresponding arrays are absent |
| `xvals` / `yvals` / `tvals` | — | Explicit coordinate or parameter arrays |
| `samples` | `101` | Number of generated samples |
| `space` | Automatic | Use ambient data coordinates or local geometry |
| `point-size` | `px(6)` | Marker size, pair, or callback |
| `shape` | `Circle` | Marker **Element** or callback |
| `children` | — | Single marker **Element**, as an alternative to `shape` |

Use the sampling options described by [SymLine](./SymLine.md) and draw with [Points](./Points.md).
Null/nonfinite samples split paths or omit markers.
Use fy for y=`f(x)`, fx for x=`f(y)`, or `f(t)` for parametric points. Limits here
control sampling; enclosing **Graph**/**Plot** limits control the view.
Named records such as `{theta, r}` retain every dimension until the enclosing
Graph projects them. Any nonfinite dimension creates a gap. `fx`, `fy`,
`xvals`, and `yvals` retain their Cartesian meanings.

All **Points** styling options are available. shape and `point-size` functions run once per finite sample.
Pass one marker element as a child or use `shape`; supplying both or multiple
marker children is an error. Use a `shape` callback for per-sample markers.

```jsx
<SymPoints fy={sin} samples={12}>
  <Rect fill="red" />
</SymPoints>
```

The default circle uses the theme foreground fill and no stroke. Custom shapes
use normal style inheritance and their own styling, including explicit fill and
stroke passed through **SymPoints**.
Construction stores immutable sampled data; resizing never executes callbacks.
