# Positioned diagram

*Category*: layout

An **HStack** arranges three labeled **Frame** nodes and two connectors inside a
**Slide**. Nodes use `grow={1}` and connectors use `grow={0.65}`. The row itself
uses 90% of the slide's content width and is centered; none of its parts need a
pixel width.

The slide paints the background and passes its body allocation to **TextCol**.
The column's two **Spacer** children distribute spare vertical space around the
diagram. A base font size sets the scale for the title, node labels, padding,
connector height, and gaps. The outer aspect ratio determines the canvas shape;
`fit` shrinks the completed slide into a smaller host.

Each connector is a **Group** containing an **Arrow** and a **Text** label. The arrow
runs from `[0, 0.5]` to `[1, 0.5]` in that group's local rectangle, and the label is
anchored below it. Nodes stretch to the row's height and center their text inside
their frames.

Try changing the diagram's relative width or the node and connector grow weights. The row
allocates each part directly; the connectors do not query node bounds or route
automatically.
