---
category: plotting
description: "Trace the roots of x² + 2cx + 1 in three dimensions, with c, Re(x), and Im(x) on separate axes."
---

# Complex Roots in 3D

The roots x = −c ± √(c² − 1) of x² + 2cx + 1 = 0 trace two curves as c varies
from −2 to 2. The three axes show the parameter c, the real part of x, and the
imaginary part of x. Blue follows the plus branch; red follows the minus branch.

For |c| < 1, the roots are complex conjugates with real part −c and imaginary
parts ±√(1 − c²). Outside that interval, both roots lie in the gridded
Im(x) = 0 plane. The markers show the repeated roots at c = ±1, where the
branches meet: x = 1 at c = −1, and x = −1 at c = 1.

[Graph](../../elements/text/Graph.md) applies `isometric_projection()` to the
curves, axes, ticks, and labels. Each [SymLine](../../elements/text/SymLine.md)
samples a root as `{x: c, y: Re(x), z: Im(x)}`, keeping its real and imaginary
components together throughout the curve. The graph's limits describe the
projected view, and its aspect preserves equal scale in that view.

Compare [Complex Roots](complex_plot.md), which plots the real and imaginary
components separately, or see the [projection guide](../../guides/text/projections.md).
