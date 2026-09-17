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
| `tick-side` | `"outer"` | `"inner"`, `"outer"`, or an explicit side |
| `label-offset` | `px(4)` | Gap between ticks and labels |
| `label-anchor` | Side-dependent | Point on each label attached to its tick position |
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

Pair labels may be strings, numbers, or **Element**s. Out-of-domain ticks are omitted.
Use `tick-side="inner"` for inward ticks. `"outer"` follows `side`; explicit
cardinal values such as `side="bottom"` with `tick-side="top"` are also accepted.
Labels remain on `side`; when ticks point the other way, `label-offset` is measured
from the baseline.
Label anchors use the standard point forms. For example, a rotated bottom-axis
label can hang from its top-right corner with
`label-anchor={['end', 'start']}`. The default centers labels along the axis and
selects the edge facing the axis.
Arrowhead options follow [ArrowHead](./ArrowHead.md): for example, `arrow-open`,
`arrow-curve`, `arrow-barb`, and `arrow-stroke` control the head drawn by `arrow`.
Scopes configure generated labels; supplied **Element**s keep their own props.
Flat props override matching fields of nested objects. `tick-size`, `tick-side`,
`label-offset`, `arrow-size`, `arrow-width`, and ordinary `line-height` remain owner props.
These scopes also work on **Axis**'s
directional, labels-only, and scale-only variants. See
[scoped props](../../gallery/text/Style.md#scoped-component-props).

Automatic 1/2/5 intervals need not include every endpoint; public linear_ticks
and format_tick expose the helpers. Work is bounded to 10000 ticks.

Ticks and label descriptions are fixed at construction. A standalone **Axis** uses
lim for generation and the ambient graph for mapping; provide matching limits,
or let [Plot](./Plot.md) construct it. Minor ticks and collision avoidance are
deferred.
