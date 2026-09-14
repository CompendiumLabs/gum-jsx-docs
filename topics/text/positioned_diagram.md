# Positioned diagram

**Group** provides a known 760 × 400px canvas for three labeled nodes and two
connectors. **Frame**s are placed by their centers, while each connector uses
explicit endpoints in the same coordinate system. Small **Polygon** triangles
form the arrowheads; there is no implicit arrow or graph-routing API here.

Connectors are listed before nodes, so node backgrounds paint over any shared
edge. **Labels** are ordinary **Text**. A background **Rect** paints the canvas without
changing the layout. This is useful for small process diagrams where positions
are known ahead of time.

Each line uses the whole **Group** allocation, but its endpoints are pixel lengths.
This illustrates the distinction between an element's allocated rectangle and
the smaller geometry drawn inside it. Each node instead has an explicit box
size; **Group**'s anchor offsets that box around its target point.

Try changing a node's y position and adjusting its connectors. Nothing queries
another element's bounds: automatic attachment points and routing belong to a
future higher-level diagram layer, not this example.
