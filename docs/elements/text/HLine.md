---
category: geometry
description: "Draw a horizontal line across a local drawing frame."
---

# HLine

| Property | Default | Meaning |
|---|---|---|
| `y` | `0.5` | Fixed y coordinate |
| `lim` | `[0, 1]` | Start and end x coordinates |
| `space` | `"local"` | `"data"` maps the endpoints through the enclosing coordinate context |

**HLine** draws from `[lim[0], y]` to `[lim[1], y]`. By default it spans the width
of its own allocated rectangle at half its height. Position and span accept
lengths: fractions, px, em, and unit strings such as `"25%"` or `"12px"`.
Reversed and equal span endpoints are allowed. Geometry does not change the
element's layout size.

```jsx
<HLine y={0.3} lim={[0.1, 0.9]} stroke={blue} stroke-width={px(3)} />
```

Geometry stays local inside a Graph or Plot unless `space="data"` is set. Data
numbers use the enclosing coordinate context and contribute to limit inference;
tagged lengths retain [Line](./Line.md)'s local-length behavior. Custom projections
map the two endpoints, so the resulting segment need not be horizontal on screen.

`from` and `to` are not supported; use **Line** for arbitrary endpoints.
Use [VLine](./VLine.md) for a fixed x coordinate and a span along y.
