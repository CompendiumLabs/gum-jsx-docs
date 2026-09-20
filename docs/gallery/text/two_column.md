# Two Columns

*Category*: layout

A damped-oscillation plot sits beside a paragraph and a short list containing inline math.

The slide supplies a definite body width. Its figure column uses `grow={1.15}`
and the prose uses `grow={1}`, so the plot gets a little more of the space after
the gap. No column widths or flex bases are needed. The plot's aspect ratio
determines its height, and its caption wraps at the column width.

One base font size controls the relative typography, gaps, dashes, and strokes.
SymLine samples both envelopes and the signal over the entire domain. The root's
`fit` prop scales the completed slide down when necessary, preserving both columns.

See [HStack](../../elements/text/HStack.md).
