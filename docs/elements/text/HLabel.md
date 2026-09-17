# HLabel

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| `value` | `0` | Tick value and position |
| `label` | Formatted `value` | String, number, or **Element** used as the label |
| `lim` | `[0, 1]` | Directed domain used to place the value |
| `side` | `"bottom"` | Edge and orientation |
| `at` | Frame edge | Data location on the perpendicular axis |
| `tick-size` | `px(5)` | Invisible tick length included in label placement |
| `tick-side` | `"outer"` | Tick direction used to position the label |
| `label-offset` | `px(4)` | Gap after the tick position |
| `rotate` | `0` | Label rotation in degrees |
| `label-style` / `label-*` | — | Nested or flat styles for generated text |

One tick label. value defaults to 0; label is a string, number, or **Element**
(omitted text formats the value). Other props follow [Axis](./Axis.md), including
lim, side, at, `tick-size`, `tick-side`, `label-offset`, rotate, and `label-style`. The value must
lie in lim. **VLabel** defaults to the left side, **Label** and **HLabel** to the bottom.
