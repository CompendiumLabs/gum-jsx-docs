---
category: geometry
description: "A pendulum diagram with a clipped support, angle arc, equilibrium line, bob, force arrows, and equation of motion."
---

# Pendulum Physics

A pendulum diagram with a clipped support, angle arc,
equilibrium line, bob, force arrows, and equation of motion. Change `angle` or
`length` to move the rod, bob, and force annotations together.

The drawing uses a downward-facing [Graph](../../elements/text/Graph.md) so its
data coordinates match the diagram's pixel proportions. `alongRod` derives
positions from the pivot and angle. [CoordLine](../../elements/text/CoordLine.md)
draws the rod and equilibrium line in that coordinate system; [Arc](../../elements/text/Arc.md)
uses the same center and screen-space angles.

The layout uses explicit pixel dimensions and font sizes. The bob and its label
are separate siblings inside the graph; frames accept a single content element.
The enclosing rounded [Frame](../../elements/text/Frame.md) clips the support
while keeping its border inside the frame. Arrowheads use `head-size` and inherit
their shaft's color.

The faint grid uses `opacity`; separate `stroke-opacity` and `fill-opacity`
props are not currently supported by the shared paint style.

[View the source](../code/pendulum_physics.jsx).
