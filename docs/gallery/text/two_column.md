# Two Columns

*Category*: layout

A damped-oscillation plot sits beside a paragraph and a short list containing inline math.

The figure and prose use relative flex bases to establish their side-by-side
layout. SymLine samples both envelopes and the signal over the entire domain;
text wraps at its column allocation. The root's `fit` prop hugs the composition and
scales it down when necessary, preserving both columns.

See [HStack](../../elements/text/HStack.md).
