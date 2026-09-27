---
category: plotting
description: "Project a three-dimensional helix, markers, axes, and labels into one graph."
---

# Three-dimensional projection

Each point in this figure carries `{x, y, z}`. One orthographic projection on
[Graph](../../elements/text/Graph.md) maps these three dimensions to `{x, y}`
on the page. The graph's limits describe that output space.

[SymLine](../../elements/text/SymLine.md) samples the helix in three dimensions.
The axes use the same source records in Arrow's `from` and `to`, while Text
annotations use `pos`. Points receives the full source record in its
`point-size` callback, so marker sizes can depend on `z` before projection.
Use named records for three-dimensional inputs; tuples always mean `[x, y]`.

Gum draws the projected paths in child order. This example does not compute
surface visibility or depth sorting. Line widths, marker shapes, and text
remain ordinary two-dimensional drawing geometry. See the
[projection guide](../../guides/text/projections.md) for the coordinate contract
and geometry rules.
