# SymField

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| `f` | — | `(x, y) => vector` sampling function |
| `xlim` | `[-1, 1]` | Horizontal sampling range |
| `ylim` | `[-1, 1]` | Vertical sampling range |
| `xvals` / `yvals` | `Generated` | Explicit grid coordinates |
| `samples` | `11` | Scalar count or `{ x, y }` counts |
| `scale` | `1` | Multiplier applied to every vector |
| `normalize` | `false` | Normalize vectors before applying `scale` |
| `head-size` | `px(5)` | Arrowhead length for built-in arrows |
| `head-width` | `1.3` | Full arrowhead width divided by its length |
| `shape` | — | Replacement **Element** or callback |
| `shape-height` | `px(8)` | Height allocated to replacement shapes |
| `space` | Automatic | Use ambient data coordinates or local geometry |

Sample `f(x,y)` on a rectangular grid and draw it with [Field](./Field.md).
The result may be {x,y}, [x,y], or null. xlim/ylim default to [-1,1];
xvals/yvals provide explicit grid coordinates. samples defaults to 11 per axis
or accepts {x,y} counts. All **Field** options are supported.

The grid has at most 100000 points, with generated counts at most 1000 per axis.
Callbacks run once; zero/nonfinite vectors are omitted. Choose scale to keep
arrows near their cells, and explicit **Plot** limits when arrow endpoints should
not expand the viewport.
