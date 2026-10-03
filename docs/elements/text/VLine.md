---
category: geometry
description: "Draw a vertical line in ambient data coordinates or local geometry."
---

# VLine

| Property | Default | Meaning |
|---|---|---|
| `x` | `0.5` | Fixed x coordinate |
| `lim` | `[0, 1]` | Start and end y coordinates |
| `space` | Automatic | Use ambient data coordinates when available; otherwise local geometry |

**VLine** draws from `[x, lim[0]]` to `[x, lim[1]]`. Outside a coordinate
context, the defaults span the height
of its own allocated rectangle at half its width. Position and span accept
lengths: fractions, px, em, and unit strings such as `"25%"` or `"12px"`.
Reversed and equal span endpoints are allowed. Geometry does not change the
element's layout size.

```jsx
<VLine x={0.7} lim={[0.2, 0.8]} stroke={blue} stroke-width={px(3)} />
```

Inside Graph, Plot, or GeoMap, numeric endpoints use ambient coordinates
automatically and contribute to ordinary Graph/Plot limit inference.
Set `space="local"` for a local rule, or `space="data"` to require a coordinate
context. Defaults remain `[0, 1]` for `lim` and `0.5` for the fixed position;
they do not expand to the graph limits. Tagged lengths retain [Line](./Line.md)'s local-length behavior. Custom projections
map the two endpoints, so the resulting segment need not be vertical on screen.

`from` and `to` are not supported; use **Line** for arbitrary endpoints.
Use [HLine](./HLine.md) for a fixed y coordinate and a span along x.
