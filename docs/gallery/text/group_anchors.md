---
category: layout
description: "Compare how anchors position children in three side-by-side panels."
---

# Anchors in nested canvases
Each nested **Group** has its own local reference rectangle. All three boxes use
the same fractional position, `(0.5, 0.5)`, marked by a dark dot. Their anchors
place the start, center, or end of the allocated box at that point.

The three panels stay side by side. Their measured sizes and gaps determine the
outer size; `fit` on the root preserves the comparison in smaller viewports.

The child box includes its inside border when determining its anchor. See
[Group](../../elements/text/Group.md) for positioning and reference rules and
[Point values](../../guides/text/point_values.md) for coordinate and anchor forms.
