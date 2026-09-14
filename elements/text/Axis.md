# Axis

*Category*: plotting

An axis occupies the graph frame; ticks and labels extend outside it. **Plot**
measures that overflow to reserve margins. Use an axis inside **Graph** to compose
your own frame.

| Property | Default | Meaning |
|---|---|---|
| `lim` | `[0, 1]` | Directed tick domain; explicit outside **Plot** |
| `ticks` | `5` | Target count or explicit numbers / `[value, label]` pairs |
| `interval` | Automatic | Positive fixed step instead of automatic 1/2/5 intervals |
| `side` | `"bottom"` | Axis edge and orientation |
| `at` | Frame edge | Data location on the perpendicular axis |
| `tick-size` | `px(5)` | Tick length |
| `label-offset` | `px(4)` | Gap between ticks and labels |
| `format` | `format_tick` | `(value, index) => string` for numeric ticks |
| `rotate` | `0` | Label rotation in degrees |
| `labels` | `true` | Draw tick labels |
| `line` | `true` | Draw the baseline |
| `arrow` | `false` | Draw a head at the directed endpoint |
| `line-style` / `tick-style` / `label-style` | — | Nested styles for generated parts |
| `line-*` / `tick-*` / `label-*` | — | Flat overrides for generated-part styles |

Pair labels may be strings, numbers, or **Element**s. Out-of-domain ticks are omitted.
Scopes configure generated labels; supplied **Element**s keep their own props.
Flat props override matching fields of nested objects. `tick-size`, `label-offset`,
and ordinary `line-height` remain owner props. These scopes also work on **Axis**'s
directional, labels-only, and scale-only variants. See
[scoped props](../../topics/text/Style.md#scoped-component-props).

Automatic 1/2/5 intervals need not include every endpoint; public linear_ticks
and format_tick expose the helpers. Work is bounded to 10000 ticks.

Ticks and label descriptions are fixed at construction. A standalone **Axis** uses
lim for generation and the ambient graph for mapping; provide matching limits,
or let [Plot](./Plot.md) construct it. Minor ticks and collision avoidance are
deferred.
