---
category: plotting
description: "Combine bars, axes, labels, and other plot features in one chart."
---

# BarPlot

| Property | Default | Meaning |
|---|---|---|
| `coord` | Inferred | `[xmin, ymin, xmax, ymax]` shorthand for both limits |
| `xlim` / `ylim` | Inferred | Directed data limits |
| `flip-x` / `flip-y` | `false` / `true` | Reverse horizontal or vertical screen mapping |
| `padding` | `0.05` | Inferred-limit fractions: scalar, side/axis object, `[h, v]`, or `[t, b, l, r]` |
| `values` | `[]` | Bar endpoints |
| `positions` | Indices | Bar centers |
| `bases` | `0` | Scalar, array, or callback for bar baselines |
| `bar-width` | `0.8` | Scalar, array, or callback for widths in data units |
| `direction` | `"vertical"` | Vertical or horizontal bars |
| `border-radius` | `0` | Scalar, elliptical pair, or [side/corner object](./Box.md) in layout units |
| `styles` | — | Per-bar style array or `(value, index) => style` callback; may override `border-radius` |
| `axis` | `true` | Enable or disable both axes by default |
| `xaxis` / `yaxis` | `axis` | Boolean or **Axis** props for one axis |
| `xticks` / `yticks` | `5` | Target count or explicit values / labeled pairs |
| `grid` | `true` | Draw grid lines at axis ticks |
| `title` / `xlabel` / `ylabel` | — | String or **Element**; the y title rotates −90° |
| `legend` | — | **Legend** **Element** or array of **Legend** entries |
| `margin` | `px(12)` | Extra outer space; accepts [Box padding forms](./Box.md) |
| `label-gap` | `px(8)` | Space between titles and measured axis extents |
| `bounds` | `"outer"` | `"frame"` makes the allocation the data area alone; see below |
| `background` | — | Full-frame background paint |
| `plot-background` | — | Data-area background paint |
| `border-width` | `px(0)` | Data-area border thickness |
| `border-color` | `"theme:border"` | Data-area border paint |
| `clip` | `true` | Clip data marks to the data area |
| `axis-*` / `xaxis-*` / `yaxis-*` | — | Flat **Axis** option overrides |
| `tick-*` / `label-*` | — | Shared generated tick and label styles |
| `title-*` / `xlabel-*` / `ylabel-*` | — | Generated title text options |
| `grid-*` / `xgrid-*` / `ygrid-*` | — | Grid options and styles |
| `legend-*` | — | Generated **Legend** options |
| `*-style` | — | Nested options for the corresponding scopes |

Compose [Bars](./Bars.md) and [Plot](./Plot.md). Accepts values, positions, bases,
`bar-width`, direction, border radius, and styles along with **Plot** props. Additional
children overlay bars and participate in limit inference.

For rounded tops with square baselines on positive vertical bars, use
`border-radius={{ t: em(0.5) }}`. Horizontal bars can use `border-radius={{ r: em(0.5) }}`.
Sides refer to screen edges, so negative bars may need `b` or `l` instead.
Scalar, paired, and individual corner radii follow [Bars](./Bars.md).

Padding follows [Graph](./Graph.md): values are fractions of inferred data spans.
Use `padding={[0.12, 0.1]}` for horizontal/vertical padding, or **Box**-style side
shorthands for individual edges. `margin` adds layout space around the plot.

`fill` and `border-radius` set shared bar defaults; entries returned by `styles` can
override either. For a value-dependent radius, return it from `styles`:

```jsx
<BarPlot
  values={[28, -17, 43]}
  styles={(value) => ({
    fill: value < 0 ? red : green,
    border_radius: value < 0 ? { b: em(0.5) } : { t: em(0.5) },
  })}
/>
```

This rounds the exposed ends under the default vertical axes. `border_radius: 0`
keeps an individual bar square; an omitted radius uses the shared default.
Callbacks receive the endpoint value and original index, and run once at
construction. Use `styles` for per-bar callbacks; `border-radius` itself takes a shared
radius value.

Positions are numeric data coordinates. Supply [value,label] ticks for categories:
xticks for vertical bars, yticks for horizontal. Limits include baselines and
widths. Grouping and automatic stacking are deferred.
