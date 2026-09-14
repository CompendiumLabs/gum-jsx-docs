# Sampled curve

This small chart combines numeric helpers with **Group**, **Line**, **Text**, **Circle**, and
**Polyline**. `linspace`, `exp`, and `sin` generate the data; `rescale` maps it into
pixels; `range` generates ticks; and `slice` selects every 25th sample marker.
The example spells out the transform, axes, and labels. The
[Plot showcase](./plot_wave.md) provides automatic axes and measured margins.

The function is `exp(-0.24t)` `sin(2.5t)`, sampled at 101 evenly spaced points from
0 to 8. The vertical domain is fixed at -1 to 1. Mapping y subtracts from the top
of the pixel domain because larger SVG y coordinates go down the page.

All plotted points use px lengths in a shared **Group** canvas. The **Polyline**'s
allocation is the whole canvas, not a data-derived bounding box. This keeps
axes, markers, and labels in the same known coordinate system. The surrounding
**TextCol** handles the title and caption independently, using the content width
provided by the outer **TextBox**.

Try changing the damping coefficient or sample count. Change the explicit plot
rectangle too if you want a wider graph; merely enlarging the **Svg** does not
rescale these pixel coordinates. For a reusable chart abstraction, turn the
mapping into a functional component with explicit size and domain parameters.
