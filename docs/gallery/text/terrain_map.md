---
category: plotting
description: "Build a terraced terrain model from a 24-by-24 height field with shaded faces and an elevation legend."
---

# Terrain in tiles

A 24-by-24 field of square tiles forms a terraced landscape, with teal lowlands,
green slopes, and pale summits. Gaussian hills and a small sinusoidal ripple
define the elevation, rounded to steps of `0.3` to create the terraces.

Each tile uses closed [CoordLine](../../elements/text/CoordLine.md) paths for its
top and exposed sides. Their corners carry `{x, y, z}` coordinates; a custom
`projection` on [Graph](../../elements/text/Graph.md) maps them into an isometric
view. The example sorts tiles by `i + j` to draw distant cells first and adds
side faces where a tile stands above its neighbor. Interpolated elevation
colors and darker side fills give the terrain depth.

Stacks arrange the heading and elevation legend around the graph, while an
[Overlay](../../elements/text/Overlay.md) positions the compass beside the
terrain. The legend samples the same color function as the tile tops.

See [three-dimensional projection](projection_3d.md) for another example of
shared 3D coordinates on a Graph.
