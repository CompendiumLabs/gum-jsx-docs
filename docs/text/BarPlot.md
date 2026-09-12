# BarPlot

*Category*: plotting

Compose [Bars](Bars.md) and [Plot](Plot.md). Accepts values, positions, bases,
bar_width, direction, radius, and styles along with Plot props. Additional
children overlay bars and participate in limit inference.

fill sets the default bar color; entries returned by styles can override it.

Positions are numeric data coordinates. Supply [value,label] ticks for categories:
xticks for vertical bars, yticks for horizontal. Limits include baselines and
widths. Grouping and automatic stacking are deferred.

[Runnable source](../code/BarPlot.jsx).
