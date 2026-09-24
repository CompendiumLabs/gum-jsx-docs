---
category: plotting
description: "Draw grid lines at generated or explicit tick values."
---

# Mesh

| Property | Default | Meaning |
|---|---|---|
| `lim` | `[0, 1]` | Directed domain used to place grid lines |
| `ticks` | `5` | Target count or explicit values / labeled pairs |
| `interval` | Automatic | Positive fixed tick step |
| `direction` | `"x"` | `"x"` draws vertical lines; `"y"` draws horizontal lines |

Grid lines at ticks using the count/explicit/interval rules of [Axis](./Axis.md).
lim supplies the generation domain (default [0,1]).

`direction="x"` draws vertical lines at x values; `direction="y"` draws horizontal
lines at y values. **Mesh**/**HMesh** default to x, **VMesh** to y: H/V names the scale
direction. Ambient **Graph** limits map values. Style lines with stroke,
`stroke-width`, `stroke-dasharray`, and opacity.
