---
category: plotting
description: "Six stylized angular profiles show s, p, and d lobes with separate positive and negative phases."
---

# Atomic Orbitals

Six stylized angular profiles show s, p, and d lobes with separate positive and
negative phases.

Each [SymPoly](../../elements/text/SymPoly.md) samples `{theta, r}` from its
angular radius function. The graphs share one `polar_projection()` to convert
those records to Cartesian drawing coordinates. Phase intervals split the lobes
for blue/red styling. The origin marker also uses polar coordinates, while
[HLine](../../elements/text/HLine.md) and [VLine](../../elements/text/VLine.md)
draw crosshairs in the local frame. See [Projections](../../guides/text/projections.md).

These are schematic 2D angular profiles, not probability-density plots or full
3D orbital surfaces. The pz profile is shown diagonally, and the py phase
intervals meet at its angular zero crossings. The 1 / 3 / 2 groups use wrapping
rows, preserving that arrangement when space permits and adding rows on narrower
hosts.
