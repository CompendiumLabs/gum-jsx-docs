# Positioned diagram

*Category*: layout

An **HStack** arranges three labeled **Frame** nodes and two connectors inside a
760 × 400px **TextBox**. Each node takes `0.7 / 3` of the row width and each connector
takes `0.15`. The row itself uses 90% of the document's content width and is centered.

The outer **TextBox** paints the background and passes its padded width to
**TextCol**. Both explicitly use `height={1}` so the column's two **Spacer** children
can distribute spare vertical space around the diagram. Width filling comes from
the document defaults; the row's fractional widths and vertical spacing remain explicit.

Each connector is a **Group** containing an **Arrow** and a **Text** label. The arrow
runs from `[0, 0.5]` to `[1, 0.5]` in that group's local rectangle, and the label is
anchored below it. Nodes stretch to the row's height and center their text inside
their frames.

Try changing the diagram width or the node and connector fractions. The row
allocates each part directly; the connectors do not query node bounds or route
automatically.
