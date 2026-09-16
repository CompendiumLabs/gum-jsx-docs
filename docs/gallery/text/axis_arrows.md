# Axes with Arrows

*Category*: plotting

A logarithmic curve with arrowheads on both directed axes. Plot measures the ticks and labels while two explicit Arrow elements draw the baselines and curved heads.

Ported from the old Gum gallery.

The built-in `xaxis-arrow` and `yaxis-arrow` options currently provide fixed-size straight heads. To preserve the old curved heads, this example disables the built-in baselines and draws arrows in data coordinates. Clipping is disabled so the heads can extend past the data rectangle. Pixel stroke widths and explicit sampling limits keep the result independent of the viewport.

See [Axis](../../elements/text/Axis.md) and [the runnable source](../code/axis_arrows.jsx).
