---
category: layout
description: "A small figure and its explanation share a definite row width."
---

# Two columns

A small figure and its explanation share a definite row width. Both direct
children of **HStack** use `grow={1}`, so they split
the space remaining after the gap equally. The figure's **TextFrame** includes its padding and border in
that allocation. The text column wraps at its allocated width without changing
font size.

The row does not wrap: keeping the diagram beside its explanation is part of
the composition. **Slide** supplies the body allocation without an authored
pixel width. One base font size, an outer aspect ratio, and relative gaps describe
the layout; the root's `fit` prop reduces the whole figure when the host is smaller.

The little bar diagram uses an **HStack** with an `em(10)` height and end alignment.
Its three bar heights are fractions of that shared reference: `0.4`, `0.7`, and `1`.
Equal flexible widths keep the bars balanced. It
is ordinary geometry, not a **Plot** component or an automatic data scale.

Try changing the host width with `gum example.jsx -W 640` or `-W 320`: both
columns remain side by side. Change their grow weights to adjust the layout and paragraph
line breaks before fitting. The final transform scales fonts, padding, and bars
together. Flex belongs on the direct children; putting grow only on the nested
bar stack would not affect the outer row.

**TextFrame** and **TextCol** pass their established content width to automatically
sized children. The bar stack establishes its own height independently.
