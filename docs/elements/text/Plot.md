# Plot

*Category*: plotting

Compose graphable children with linear axes, grid lines, measured tick labels,
axis titles, an optional legend, and an optional background. Limits follow
[Graph](./Graph.md); inferred limits receive 5% padding by default.

| Property | Default | Meaning |
|---|---|---|
| `coord` | Inferred | `[xmin, ymin, xmax, ymax]` shorthand for both limits |
| `xlim` / `ylim` | Inferred | Directed data limits |
| `flip-x` / `flip-y` | `false` / `true` | Reverse horizontal or vertical screen mapping |
| `padding` | `0.05` | Inferred-limit fractions: scalar, side/axis object, `[h, v]`, or `[t, b, l, r]` |
| `axis` | `true` | Enable or disable both axes by default |
| `xaxis` / `yaxis` | `axis` | Boolean or **Axis** props for one axis |
| `xticks` / `yticks` | `5` | Target count or explicit values / labeled pairs |
| `grid` | `true` | Draw grid lines at axis ticks |
| `title` / `xlabel` / `ylabel` | — | String or **Element**; the y title rotates −90° |
| `legend` | — | **Legend** **Element** or array of **Legend** entries |
| `margin` | `px(12)` | Extra outer space; accepts [Box padding forms](./Box.md) |
| `label-gap` | `px(8)` | Space between titles and measured axis extents |
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

Padding uses [Graph's side and axis forms](./Graph.md), with numeric fractions
of inferred data spans. Explicit limits stay exact.

Fonts default to 12px. Margins come from measured axis overflow and title sizes.
Text uses `theme:text`, axes use `theme:muted`, and grid lines use `theme:grid`.
These paints follow the inherited [theme](../../gallery/text/Themes.md).
Title and x title wrap at the usable width. Explicit margin adds space to those
measurements. The fragment's content rectangle identifies the data area.

For example, `axis-stroke={slate}` affects both axes and
`xaxis-label-color={blue}` changes only the x tick labels. Common tick/label
settings precede common axis settings, then xaxis/yaxis option objects, then
flat `xaxis-`/`yaxis-` props. Part option records merge per field. At the same scope,
flat props override matching nested settings. `title-wrap={false}` disables title
wrapping. See [scoped props](../../gallery/text/Style.md#scoped-component-props).

Scopes preserve `label-gap` and do not enable an explicitly disabled axis. **Plot**
supplies axis/grid domains; explicit xticks/yticks override scoped axis tick
options. Callback props such as `xaxis-format` run when the axes are constructed.
Supplied title, label, and legend **Element**s retain their own descriptions.

**Plot** fills finite offers, naturally measures 480×320, and derives a missing axis
at 1.5 unless aspect is supplied. In a stack, give it a preferred height or an
explicit flex allocation. Small frames can exhaust the data area and report
overflow; they never shrink text to fit.

This first version has linear scales. Log/date scales, minor ticks, label
collision avoidance, automatic legend extraction, and legend placement
optimization are deferred. Use fewer ticks, shorter labels, or an axis rotate
option for crowded categories.
