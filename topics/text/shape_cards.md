# Shape cards

Three cards are generated from data with a small functional JSX component. Each
card returns a **Frame** carrying its own outer flex props; its internal **VStack** is
responsible only for arranging its symbol, title, and description.

The row has a definite width and uses zero bases with equal grow factors. Its
stretch alignment makes the cards equally tall after their paragraphs have
been measured at the allocated widths. No fixed card height is necessary.

Each symbol lives in a short **Group** with a definite width and height. The leaf
has an explicit 88px size and a center anchor. **Group** positions the symbol;
it does not infer the canvas size from the symbol's bounds. Passing the symbol
as an **Element** value is normal immutable source composition.

Try adding another entry to the cards array. The row will divide the same width
among more cards; it does not wrap into another row automatically. For a dense
set of cards, build multiple HStacks explicitly—the current API has no Grid or
wrapping-row component.
