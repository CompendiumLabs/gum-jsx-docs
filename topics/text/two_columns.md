# Two columns

A small figure and its explanation share a definite row width. Both direct
children of HStack use basis={0} grow={1}, so they split the space remaining
after the gap equally. The figure's Frame includes its padding and border in
that allocation. The text column wraps at its allocated width without changing
font size.

The little bar diagram uses an HStack with a known height, end alignment, and
three explicit bar heights. Equal flexible widths keep the bars balanced. It
is ordinary geometry, not a Plot component or an automatic data scale.

Try changing the Svg width from 720px to 640px. The column widths, bar widths,
and paragraph line breaks change, while the fonts, padding, and bar heights
stay fixed. To give the figure more of the row, change its direct Frame's grow
to 2. Putting grow only on the nested bar stack would not affect the outer row.

[Runnable source](../code/two_columns.jsx) · [HStack](../../elements/text/HStack.md) ·
[Frame](../../elements/text/Frame.md) · [Text](../../elements/text/Text.md)
