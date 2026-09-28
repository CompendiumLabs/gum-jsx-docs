---
category: geometry
description: "Draw a vertical line across a local drawing frame."
---

# VLine

| Property | Default | Meaning |
|---|---|---|
| `x` | `0.5` | Fixed x coordinate |
| `lim` | `[0, 1]` | Start and end y coordinates |
| `space` | `"local"` | `"data"` maps the endpoints through the enclosing coordinate context |

**VLine** draws from `[x, lim[0]]` to `[x, lim[1]]`. By default it spans the height
of its own allocated rectangle at half its width. Position and span accept
lengths: fractions, px, em, and unit strings such as `"25%"` or `"12px"`.
Reversed and equal span endpoints are allowed. Geometry does not change the
element's layout size.

```jsx
<VLine x={0.7} lim={[0.2, 0.8]} stroke={blue} stroke-width={px(3)} />
```

Geometry stays local inside a Graph or Plot unless `space="data"` is set. Data
numbers use the enclosing coordinate context and contribute to limit inference;
tagged lengths retain [Line](./Line.md)'s local-length behavior. Custom projections
map the two endpoints, so the resulting segment need not be vertical on screen.

`from` and `to` are not supported; use **Line** for arbitrary endpoints.
Use [HLine](./HLine.md) for a fixed y coordinate and a span along x.
