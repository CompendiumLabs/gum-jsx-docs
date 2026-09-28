---
category: plotting
description: "Draw a log–log graph with explicit tick labels and logarithmic grid spacing."
---

# Logarithmic projection

`log_projection()` maps both data coordinates with base-10 logarithms. The
[Graph](../../elements/text/Graph.md) limits `[0, 3]` therefore cover values
from `1` to `1000`. Use `log_projection({axes: 'x'})` or
`log_projection({axes: 'y'})` for a semilog view, and `base` to choose another base.

[SymLine](../../elements/text/SymLine.md) supplies the original data values.
Sampling `10 ** t` spreads points evenly across decades. The curves `y = x`
and `y = sqrt(x)` become straight lines with slopes `1` and `0.5`; the markers
show the decade values.

Axes and meshes use projected coordinates directly. The example explicitly
pairs `log10(value)` positions with the original values as labels. Minor grid
lines mark values `2` through `9` in each decade. The projection does not
generate ticks or format labels.

Zero or negative values on a logged axis project to `null`, omitting markers
and breaking curves. Stroke widths, marker sizes, and text stay in layout units.
See [Projections](../../guides/text/projections.md) for the full helper options
and coordinate contract.
