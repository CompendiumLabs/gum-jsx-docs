# Axis

*Category*: plotting

An axis occupies the graph frame; ticks and labels extend outside it. Plot
measures that overflow to reserve margins. Use an axis inside Graph to compose
your own frame.

| Prop | Meaning |
|---|---|
| lim | Directed tick domain, default [0,1]; explicit outside Plot |
| ticks | Target count 5 or explicit numbers / [value,label] pairs |
| interval | Positive fixed step instead of automatic 1/2/5 intervals |
| side | bottom (default), top, left, or right; selects orientation |
| at | Optional data location on the perpendicular axis; otherwise the frame edge |
| tick_size, label_offset | px(5) tick and px(4) gap |
| format | (value,index) → string for numeric ticks, called at construction |
| rotate | Label rotation in degrees |
| labels, line | true; independently hide text or baseline |
| arrow | false; head at the directed endpoint |
| line_style, tick_style, label_style | Nested styles |

Pair labels may be strings, numbers, or Elements. Out-of-domain ticks are omitted.
Automatic 1/2/5 intervals need not include every endpoint; public linear_ticks
and format_tick expose the helpers. Work is bounded to 10000 ticks.

Ticks and label descriptions are fixed at construction. A standalone Axis uses
lim for generation and the ambient graph for mapping; provide matching limits,
or let [Plot](Plot.md) construct it. Minor ticks and collision avoidance are
deferred.

[Runnable source](../code/Axis.jsx).
