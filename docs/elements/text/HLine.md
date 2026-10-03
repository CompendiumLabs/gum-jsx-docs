---
category: geometry
description: "Draw a horizontal line in ambient data coordinates or local geometry."
---

# HLine

| Property | Default | Meaning |
|---|---|---|
| `y` | `0.5` | Fixed y coordinate |
| `lim` | `[0, 1]` | Start and end x coordinates |
| `space` | Automatic | Use ambient data coordinates when available; otherwise local geometry |

**HLine** draws from `[lim[0], y]` to `[lim[1], y]`. Outside a coordinate
context, the defaults span the width
of its own allocated rectangle at half its height. Position and span accept
lengths: fractions, px, em, and unit strings such as `"25%"` or `"12px"`.
Reversed and equal span endpoints are allowed. Geometry does not change the
element's layout size.

```jsx
<HLine y={0.3} lim={[0.1, 0.9]} stroke={blue} stroke-width={px(3)} />
```

Inside Graph, Plot, or GeoMap, numeric endpoints use ambient coordinates
automatically and contribute to ordinary Graph/Plot limit inference.
Set `space="local"` for a local rule, or `space="data"` to require a coordinate
context. Defaults remain `[0, 1]` for `lim` and `0.5` for the fixed position;
they do not expand to the graph limits. Tagged lengths retain [Line](./Line.md)'s local-length behavior. Custom projections
map the two endpoints, so the resulting segment need not be horizontal on screen.

`from` and `to` are not supported; use **Line** for arbitrary endpoints.
Use [VLine](./VLine.md) for a fixed x coordinate and a span along y.
