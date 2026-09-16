# Two columns

*Category*: layout

A small figure and its explanation share a definite row width. Both direct
children of **HStack** use `grow={1}` with no explicit width or basis, so they split
the space remaining after the gap equally. The figure's **TextFrame** includes its padding and border in
that allocation. The text column wraps at its allocated width without changing
font size.

The row's finite width makes unsized growing children start from zero; their
different natural content widths do not affect the equal allocation.

The little bar diagram uses an **HStack** with a known height, end alignment, and
three explicit bar heights. Equal flexible widths keep the bars balanced. It
is ordinary geometry, not a **Plot** component or an automatic data scale.

Try changing the **Svg** width from 720px to 640px. The column widths, bar widths,
and paragraph line breaks change, while the fonts, padding, and bar heights
stay fixed. To give the figure more of the row, change its direct **TextFrame**'s grow
to 2. Putting grow only on the nested bar stack would not affect the outer row.

**TextBox**, **TextFrame**, and **TextCol** carry the available width through the
nested document layout. Their fill defaults preserve the bar diagram's explicit height.
