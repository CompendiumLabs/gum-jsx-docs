# Plots and charts

Start with [Plot](../../docs/elements/text/Plot.md) for a Cartesian chart with
axes, ticks, grid lines, titles, or a legend. It measures these decorations and
keeps their domains synchronized. Curves, points, fills, and annotations are
children of the plot; they do not require rebuilding its frame.
Grid lines are off by default: set `grid` for both directions, or use `xgrid`
or `ygrid` alone for one direction.

Axes can cross inside the data area: use `xaxis-at={0}` and `yaxis-at={0}` for
axes through the origin. Axis scopes also accept arrowheads, line styles, tick
formatting, and label options; see [Axis](../../docs/elements/text/Axis.md).

Use [Graph and manual axes](graph.md) for a custom coordinate canvas or projection.
[Additional plot marks](plotting-marks.md) covers individual bars, vector fields,
and parametric shapes.

{{{Plot}}}

---

For a complete bar chart, use BarPlot. For a curve defined by a function, put
SymLine inside Plot; sampled data can use
[Polyline](../../docs/elements/text/Polyline.md) or
[Points](../../docs/elements/text/Points.md).

{{{BarPlot}}}

---

{{{SymLine}}}

---

{{{SymPoints}}}

---

{{{SymFill}}}

---

Pass a Legend or an array of entries through Plot's `legend` prop to include it
in the measured layout. Use a standalone Legend when the surrounding composition
owns its placement.

{{{Legend}}}

---

{{{LegendItem}}}
