# Two columns

*Category*: layout

A small figure and its explanation share a definite row width. Both direct
children of **HStack** use `grow={1} shrink={1} basis={em(16)}`, so they split
the space remaining after the gap equally. The figure's **TextFrame** includes its padding and border in
that allocation. The text column wraps at its allocated width without changing
font size.

The row does not wrap: keeping the diagram beside its explanation is part of
the composition. The two `em(16)` bases and the gap supply its natural width,
without a fixed pixel width on the root. The root's `fit` prop hugs
that layout and reduces the whole figure when the host is smaller.

The little bar diagram uses an **HStack** with a known height, end alignment, and
three explicit bar heights. Equal flexible widths keep the bars balanced. It
is ordinary geometry, not a **Plot** component or an automatic data scale.

Try changing the host width with `gum example.jsx -W 640` or `-W 320`: both
columns remain side by side. Change their bases to adjust the layout and paragraph
line breaks before fitting. The final transform scales fonts, padding, and bars
together. Flex belongs on the direct children; putting grow only on the nested
bar stack would not affect the outer row.

**TextBox**, **TextFrame**, and **TextCol** carry the available width through the
nested document layout. Their fill defaults preserve the bar diagram's explicit height.
