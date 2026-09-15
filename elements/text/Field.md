# Field

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| `vectors` | `[]` | `{ point, vector }` samples |
| `scale` | `1` | Multiplier applied to every vector |
| `normalize` | `false` | Normalize vectors before applying `scale` |
| `head-size` | `px(5)` | Arrowhead length for built-in arrows |
| `head-width` | `1.3` | Full arrowhead width divided by its length |
| `head-curve` | `0` | Barb curvature from `0` to `1`, as in [Arrow](Arrow.md) |
| `head-open` | `false` | Draw stroked barbs connected to the shaft tip |
| `head-barb` | `"both"` | Draw both barbs, or only `"left"` / `"right"` relative to each vector |
| `head-style` / `head-*` | — | Shared ArrowHead shape and paint options, as in [Arrow](Arrow.md) |
| `shape` | — | Replacement **Element** or `(sample, index) => Element` callback |
| `shape-height` | `px(8)` | Height allocated to replacement shapes |
| `space` | Automatic | Use ambient data coordinates or local geometry |

Draw `vectors=[{point,vector},...]`, with either `{x,y}` or `[x,y]` for each
point and vector. Each endpoint is point + scale ×
vector. scale defaults to 1; normalize divides by magnitude before scaling.
Zero/nonfinite vectors are omitted. Origins and endpoints both affect limits.

Default glyphs are arrows, with `head-size` `px(5)`, `head-width` 1.3, and ordinary
stroke style. Directions are computed after mapping, so flips and unequal axis
scales orient heads correctly. Shafts stop inside their heads using the same
stroke/cap clearance as [Arrow](./Arrow.md); head tips remain at the mapped endpoints.
With `head-open`, the shaft reaches the tip and the barbs inherit its stroke.

shape accepts an **Element** or (sample,index) function. A custom shape's local x
axis runs from origin to endpoint: width is the mapped vector length;
`shape-height` defaults to `px(8)`. It receives a cleared data context before
rotation. Callbacks execute once at construction and always receive `{x,y}`
records in sample.point and sample.vector, including for tuple inputs.
