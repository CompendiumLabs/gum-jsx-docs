# Slick Bars

*Category*: plotting

Rounded bars, angled category labels, and percentage annotations form a styled bar chart.

The model names and numbers are illustrative chart-demo data. No benchmark, methodology, or source was supplied; this is not a measured model comparison. BarPlot supplies rounded top corners, measured ticks, and an explicit domain with headroom for annotations.

The x-axis combines `xaxis-rotate={-40}` with
`xaxis-label-anchor={['end', 'start']}`. The anchor attaches each label's
top-right corner to its tick, so labels of different lengths hang down and to
the left instead of being centered by their rotated bounds. On a standalone
axis, the equivalent properties are `rotate` and `label-anchor`.

See [BarPlot](../../elements/text/BarPlot.md) and
[Axis](../../elements/text/Axis.md).
