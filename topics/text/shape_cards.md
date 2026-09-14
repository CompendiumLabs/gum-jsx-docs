# Shape cards

Three cards are generated from data with a small functional JSX component. Each
card returns a **TextFrame** carrying its own outer flex props; its internal **TextCol** is
responsible only for arranging its symbol, title, and description.

The row has a definite width; its unsized cards use `grow={1}`, which defaults
their bases to zero. Its stretch alignment makes the cards equally tall after their paragraphs have
been measured at the allocated widths. No fixed card height is necessary.

Each symbol lives in a padded **Box** with a fixed height and `align-self="center"`.
The box keeps its measured width and is centered in the column. The surrounding
**TextBox**, **TextFrame**, and **TextCol** components carry document width through
their content without repeating width declarations. Passing the symbol as an
**Element** value is normal immutable source composition.

Try adding another entry to the cards array. The row will divide the same width
among more cards; it does not wrap into another row automatically. For a dense
set of cards, build multiple HStacks explicitly—the current API has no Grid or
wrapping-row component.
