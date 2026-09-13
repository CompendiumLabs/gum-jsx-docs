# HScale

*Category*: plotting

HScale draws ticks only, without a baseline or labels. It defaults to side="bottom".
It accepts the [Axis](./Axis.md) props, including lim, ticks, interval, side, at,
format, rotate, and nested styles. Labels-only elements still account for
tick_size when positioning text, so they align with a separate Scale.

lim defaults to [0,1]; specify the desired tick domain inside Graph. Plot
supplies matching limits automatically.

[Runnable source](../code/HScale.jsx).
