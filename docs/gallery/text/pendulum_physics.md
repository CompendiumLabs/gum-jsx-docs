# Pendulum Physics

*Category*: geometry

A port of the old gallery's pendulum diagram: a clipped support, angle arc,
equilibrium line, bob, force arrows, and equation of motion. Change `angle` or
`length` to move the rod, bob, and force annotations together.

The drawing uses a downward-facing [Graph](../../elements/text/Graph.md) so its
data coordinates match the diagram's pixel proportions. `alongRod` derives
positions from the pivot and angle. [CoordLine](../../elements/text/CoordLine.md)
draws the rod and equilibrium line in that coordinate system; [Arc](../../elements/text/Arc.md)
uses the same center and screen-space angles.

The new layout uses explicit pixel dimensions and font sizes in place of the
old `pos`, `size`, and `ysize` props. The bob and its label are separate siblings;
frames now accept a single content element and do not take an arbitrary `shape`.
The enclosing rounded [Frame](../../elements/text/Frame.md) clips the support
while keeping its border inside the frame. Arrowheads use `head-size` and inherit
their shaft's color.

The faint grid uses `opacity`; separate `stroke-opacity` and `fill-opacity`
props are not currently supported by the shared paint style.

[View the source](../code/pendulum_physics.jsx).
