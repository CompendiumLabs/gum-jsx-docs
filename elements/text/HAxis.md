# HAxis

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| lim | `[0, 1]` | Directed tick domain |
| ticks | `5` | Target count or explicit values / `[value, label]` pairs |
| interval | Automatic | Positive fixed tick step |
| side | `"bottom"` | Axis edge and orientation |
| at | Frame edge | Data location on the perpendicular axis |
| tick_size | `px(5)` | Tick length |
| label_offset | `px(4)` | Gap between ticks and labels |
| format | `format_tick` | `(value, index) => string` for numeric ticks |
| rotate | `0` | Label rotation in degrees |
| labels | `true` | Draw tick labels |
| line | `true` | Draw the baseline |
| arrow | `false` | Draw a head at the directed endpoint |
| line_style / tick_style / label_style | — | Nested styles for generated parts |
| line_* / tick_* / label_* | — | Flat overrides for generated-part styles |

HAxis draws a baseline, ticks, and labels. It defaults to side="bottom".
It accepts the [Axis](./Axis.md) props, including lim, ticks, interval, side, at,
format, rotate, and nested styles. Labels-only elements still account for
tick_size when positioning text, so they align with a separate Scale.

lim defaults to [0,1]; specify the desired tick domain inside Graph. Plot
supplies matching limits automatically.

[Runnable source](../code/HAxis.jsx).
