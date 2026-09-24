---
category: geometry
description: "Three cards are generated from data with a small functional JSX component."
---

# Shape cards

Three cards are generated from data with a small functional JSX component. Each
card returns a **TextFrame** carrying its own outer flex props; its internal **TextCol** is
responsible only for arranging its symbol, title, and description.

The wrapping row receives its width from the host. Cards start with an 11em
basis and use `grow={1} shrink={1}` to share each row. Its stretch alignment
makes the cards on that row equally tall after their paragraphs have been
measured at the allocated widths. No fixed card height is necessary.

Each symbol lives in a padded **Box** with a fixed height and `align-self="center"`.
The box keeps its measured width and is centered in the column. The surrounding
**TextBox**, **TextFrame**, and **TextCol** components carry document width through
their content without repeating width declarations. Passing the symbol as an
**Element** value is normal immutable source composition.

Try adding another entry to the cards array or rendering with `gum -W 320`.
`HStack wrap` starts another row when the next card's basis would not fit.
Each row distributes its remaining width independently.
