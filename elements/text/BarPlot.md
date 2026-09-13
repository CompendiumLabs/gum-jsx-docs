# BarPlot

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| coord | Inferred | `[xmin, ymin, xmax, ymax]` shorthand for both limits |
| xlim / ylim | Inferred | Directed data limits |
| flip_x / flip_y | `false` / `true` | Reverse horizontal or vertical screen mapping |
| padding | `0.05` | Fractional padding applied to inferred data limits |
| values | `[]` | Bar endpoints |
| positions | Indices | Bar centers |
| bases | `0` | Scalar, array, or callback for bar baselines |
| bar_width | `0.8` | Scalar, array, or callback for widths in data units |
| direction | `"vertical"` | Vertical or horizontal bars |
| radius | `0` | Bar corner radius in layout units |
| styles | — | Per-bar style array or callback |
| axis | `true` | Enable or disable both axes by default |
| xaxis / yaxis | `axis` | Boolean or Axis props for one axis |
| xticks / yticks | `5` | Target count or explicit values / labeled pairs |
| grid | `true` | Draw grid lines at axis ticks |
| title / xlabel / ylabel | — | String or Element; the y title rotates −90° |
| legend | — | Legend Element or array of Legend entries |
| margin | `px(12)` | Extra outer space; accepts [Box padding forms](./Box.md) |
| label_gap | `px(8)` | Space between titles and measured axis extents |
| background | — | Full-frame background paint |
| plot_background | — | Data-area background paint |
| border_width | `px(0)` | Data-area border thickness |
| border_color | `"#cbd5e1"` | Data-area border paint |
| clip | `true` | Clip data marks to the data area |
| axis_* / xaxis_* / yaxis_* | — | Flat Axis option overrides |
| tick_* / label_* | — | Shared generated tick and label styles |
| title_* / xlabel_* / ylabel_* | — | Generated title text options |
| grid_* / xgrid_* / ygrid_* | — | Grid options and styles |
| legend_* | — | Generated Legend options |
| *_style | — | Nested options for the corresponding scopes |

Compose [Bars](./Bars.md) and [Plot](./Plot.md). Accepts values, positions, bases,
bar_width, direction, radius, and styles along with Plot props. Additional
children overlay bars and participate in limit inference.

fill sets the default bar color; entries returned by styles can override it.

Positions are numeric data coordinates. Supply [value,label] ticks for categories:
xticks for vertical bars, yticks for horizontal. Limits include baselines and
widths. Grouping and automatic stacking are deferred.

[Runnable source](../code/BarPlot.jsx).
