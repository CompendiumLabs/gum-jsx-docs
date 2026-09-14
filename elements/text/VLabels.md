# VLabels

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| lim | `[0, 1]` | Directed tick domain |
| ticks | `5` | Target count or explicit values / `[value, label]` pairs |
| interval | Automatic | Positive fixed tick step |
| side | `"left"` | Edge and orientation |
| at | Frame edge | Data location on the perpendicular axis |
| tick_size | `px(5)` | Invisible tick length included in label placement |
| label_offset | `px(4)` | Gap after the tick position |
| format | `format_tick` | `(value, index) => string` for numeric ticks |
| rotate | `0` | Label rotation in degrees |
| label_style / label_* | — | Nested or flat styles for generated labels |

VLabels draws labels only, without a baseline or ticks. It defaults to side="left".
It accepts the [Axis](./Axis.md) props, including lim, ticks, interval, side, at,
format, rotate, and nested styles. Labels-only elements still account for
tick_size when positioning text, so they align with a separate Scale.

lim defaults to [0,1]; specify the desired tick domain inside Graph. Plot
supplies matching limits automatically.
