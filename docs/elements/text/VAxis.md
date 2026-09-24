---
category: plotting
description: "VAxis draws a baseline, ticks, and labels."
---

# VAxis

| Property | Default | Meaning |
|---|---|---|
| `lim` | `[0, 1]` | Directed tick domain |
| `ticks` | `5` | Target count or explicit values / `[value, label]` pairs |
| `interval` | Automatic | Positive fixed tick step |
| `side` | `"left"` | Axis edge and orientation |
| `at` | Frame edge | Data location on the perpendicular axis |
| `tick-size` | `px(5)` | Tick length |
| `tick-side` | `"outer"` | `"inner"`, `"outer"`, `"left"`, or `"right"` |
| `label-offset` | `px(4)` | Gap between ticks and labels |
| `format` | `format_tick` | `(value, index) => string` for numeric ticks |
| `rotate` | `0` | Label rotation in degrees |
| `labels` | `true` | Draw tick labels |
| `line` | `true` | Draw the baseline |
| `arrow` | `false` | Draw a head at the directed endpoint |
| `arrow-size` | `px(7)` | Arrowhead length |
| `arrow-width` | `1.3` | Full arrowhead width divided by its length |
| `arrow-style` / `arrow-*` | — | Arrowhead shape and paint options |
| `line-style` / `tick-style` / `label-style` | — | Nested styles for generated parts |
| `line-*` / `tick-*` / `label-*` | — | Flat overrides for generated-part styles |

**VAxis** draws a baseline, ticks, and labels. It defaults to `side="left"`.
It accepts the [Axis](./Axis.md) props, including lim, ticks, interval, side, at,
format, rotate, and nested styles. **Labels**-only elements account for `tick-size`
when `tick-side` is outer, so they align with a separate **Scale**.

lim defaults to [0,1]; specify the desired tick domain inside **Graph**. **Plot**
supplies matching limits automatically.
