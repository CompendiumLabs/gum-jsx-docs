# Stokes' Theorem

This one mixes a mathematical diagram with a short explanatory panel. The layout is a [TextRow](/docs/TextRow): a [TextFigure](/docs/TextFigure) eleven ems tall on one side and a [TextCol](/docs/TextCol) taking the rest of the width on the other, with the formula in a [TextFrame](/docs/TextFrame) and the text wrapped beneath it at the slide's em. The surface drawing itself is doing the real work.

The key idea is that the surface is parameterized in `(u, v)` coordinates and then projected into the plane by hand. Once that machinery is in place, the boundary curve, mesh lines, tangent arrows, and normal arrows can all be generated from the same underlying surface data. That is a nice pattern for geometric figures: define the math once, then derive multiple visual layers from it.

There is also a bit of vector calculus baked in here. The normal arrows come from a cross product of the surface derivatives, so the picture is not just decorative; it is tied to the geometry behind the theorem. So even though gum doesn't have 3D vector ops build in, it's still possible to do some pretty sophisticated geometric diagrams.