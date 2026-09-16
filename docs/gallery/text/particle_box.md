# Particle in a Box

*Category*: plotting

A port of the old gallery's monochrome infinite-square-well illustration.
Four sinusoidal wavefunctions sit between hatched walls, with matching state
and energy labels. The vertical offsets are for comparison, not an energy scale.

`baseline(index)` supplies the same offset to the curve, guide, and labels.
[SymLine](../../elements/text/SymLine.md) samples each sine curve over the well;
241 samples provide smooth traces without interpolating a separate spline.
[CoordLine](../../elements/text/CoordLine.md) draws the diagonal hatching in data
coordinates, as well as the well walls and baselines. Ordinary **Line**, **HLine**,
and **VLine** geometry is local to its allocation in gum-next; the old `loc`/`lim`
props do not place them in data coordinates.

[Plot](../../elements/text/Plot.md) measures the math tick labels and reserves
their space. Explicit x limits include room for the side annotations, while the
y axis and grid are disabled. The title, plot, and final formula use a centered
stack with an explicit plot height; text keeps its specified font size.

[View the source](../code/particle_box.jsx).
