# VMesh

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| `lim` | `[0, 1]` | Directed domain used to place grid lines |
| `ticks` | `5` | Target count or explicit values / labeled pairs |
| `interval` | Automatic | Positive fixed tick step |
| `direction` | `"y"` | Draw horizontal lines; may be overridden |

Grid lines at ticks using the count/explicit/interval rules of [Axis](./Axis.md).
lim supplies the generation domain (default [0,1]).

`direction="x"` draws vertical lines at x values; `direction="y"` draws horizontal
lines at y values. **Mesh**/**HMesh** default to x, **VMesh** to y: H/V names the scale
direction. Ambient **Graph** limits map values. Style lines with stroke,
`stroke_width`, `stroke_dasharray`, and opacity.
