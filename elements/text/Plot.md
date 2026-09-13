# Plot

*Category*: plotting

Compose graphable children with linear axes, grid lines, measured tick labels,
axis titles, an optional legend, and an optional background. Limits follow
[Graph](./Graph.md); inferred limits receive 5% padding by default.

| Prop | Default / behavior |
|---|---|
| title, xlabel, ylabel | String or Element; y title rotates −90° |
| axis, xaxis, yaxis | Enabled; each axis accepts false or an [Axis](./Axis.md) props object |
| xticks, yticks | Target count 5 or explicit numbers / [value,label] pairs |
| grid | true; uses the same ticks as each axis |
| axis_*, xaxis_*, yaxis_* | Axis options, including xaxis_tick_size and xaxis_label_color |
| tick_*, label_*, title_*, xlabel_*, ylabel_* | Tick styles and generated text options; title defaults to 1.35em bold |
| grid_*, xgrid_*, ygrid_*, legend_* | Mesh and legend options, including legend_label_font_size |
| axis_style, tick_style, label_style, title_style, grid_style | Compatible nested part options |
| xlabel_style, ylabel_style, xgrid_style, ygrid_style, legend_style | Nested options for the corresponding scopes |
| margin | Extra outer space: px(12), a length or named sides |
| label_gap | px(8) between titles and axis extents |
| background, plot_background | Optional full-frame / data-area paints |
| border_width, border_color | Optional data-area border; width defaults to zero |
| legend | An Element or array of [Legend](./Legend.md) entries, inside top right |
| clip | true for data; axes, grid, and labels remain separate |

Fonts default to 12px. Margins come from measured axis overflow and title sizes.
Title and x title wrap at the usable width. Explicit margin adds space to those
measurements. The fragment's content rectangle identifies the data area.

For example, `axis_stroke={slate}` affects both axes and
`xaxis_label_color={blue}` changes only the x tick labels. Common tick/label
settings precede common axis settings, then xaxis/yaxis option objects, then
flat xaxis_/yaxis_ props. Part option records merge per field. At the same scope,
flat props override matching nested settings. `title_wrap={false}` disables title
wrapping. See [scoped props](../../topics/text/Style.md#scoped-component-props).

Scopes preserve label_gap and do not enable an explicitly disabled axis. Plot
supplies axis/grid domains; explicit xticks/yticks override scoped axis tick
options. Callback props such as xaxis_format run when the axes are constructed.
Supplied title, label, and legend Elements retain their own descriptions.

Plot fills finite offers, naturally measures 480×320, and derives a missing axis
at 1.5 unless aspect is supplied. In a stack, give it a preferred height or an
explicit flex allocation. Small frames can exhaust the data area and report
overflow; they never shrink text to fit.

This first version has linear scales. Log/date scales, minor ticks, label
collision avoidance, automatic legend extraction, and legend placement
optimization are deferred. Use fewer ticks, shorter labels, or an axis rotate
option for crowded categories.

[Runnable source](../code/Plot.jsx).
