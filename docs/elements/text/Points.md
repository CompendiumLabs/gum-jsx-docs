---
category: geometry
description: "Repeat a marker at each {x,y} or [x,y] in points."
---

# Points

| Property | Default | Meaning |
|---|---|---|
| `points` | `[]` | Marker positions; null and nonfinite values are omitted |
| `point-size` | `px(6)` | Marker size, pair, or `(point, index) => size` callback |
| `shape` | `Circle` | Marker **Element** or `(point, index) => Element` callback |
| `children` | — | Single marker **Element**, as an alternative to `shape` |
| `space` | Automatic | Use ambient data coordinates or local geometry |

Repeat a marker at each `{x,y}` or `[x,y]` in points. Projected graphs also accept
named numeric records such as `{theta, r}` and `{x, y, z}`. The forms can be mixed.
Null/nonfinite entries are omitted
without changing callback indices. Positions use ambient [Graph](./Graph.md)
coordinates or local fractions outside it.

`point-size` is full marker diameter/size, default `px(6)`. Scalar fractions use the
shorter frame side; `{x,y}` or `[x,y]` sizes resolve per axis. It may be a (point,index)
function returning a scalar or pair. shape is an **Element** or (point,index) function;
the default is **Circle**.

Pass a reusable marker as a single child or through `shape`. Use the `shape`
callback for per-point markers. Supplying both a marker child and `shape`, or
multiple marker children, is an error.

```jsx
<Points points={[[0, 0], [1, 1]]} point-size={px(8)}>
  <Rect fill="red" />
</Points>
```

Callbacks receive complete frozen source records; tuples expand to `{x,y}`.
They execute once at construction, retaining original indices. Shapes receive exact marker dimensions
and a cleared data context, then are centered on their points. The same immutable
shape can be reused everywhere. **Rotate** and **TransformBox** pass those dimensions
through to their wrapped shape before transforming it. The default circle uses the
theme foreground fill and no stroke. Custom shapes use normal style inheritance
and their own styling; no marker fill or stroke defaults are added. Explicit fill
and stroke on **Points** are inherited by shapes unless the shapes override them.
Return styled shapes for individual colors. Marker sizes do not contribute to data limits.
