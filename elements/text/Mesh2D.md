# Mesh2D

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| `xlim` | `[0, 1]` | Domain for vertical grid lines |
| `ylim` | `[0, 1]` | Domain for horizontal grid lines |
| `xticks` | `5` | Target count or explicit x values / labeled pairs |
| `yticks` | `5` | Target count or explicit y values / labeled pairs |

Combine **HMesh** and **VMesh**. Supply xlim, ylim, xticks, and yticks; each domain
defaults to [0,1] and each count to 5. The graph provides mapping; these props
provide tick values. **Plot** automatically synchronizes grids and axes.
