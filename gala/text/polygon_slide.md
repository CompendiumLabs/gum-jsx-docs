# Polygon Slide

This one is built in a nicely modular way. The key move is the local `RegularPolygon` component, which wraps [SymPoly](/docs/SymPoly) and hides the circle parameterization with `fx={cos}`, `fy={sin}`, and `tvals`. Once that helper exists, the slide can generate six examples by simply mapping over `[n, name]` pairs.

The overall composition is handled with layout elements rather than manual positioning. A [Slide](/docs/Slide) provides the title and sets the em with `em={0.045}`, and a [TextGrid](/docs/TextGrid) lays out the six cards in three columns. Each card is a [TextFrame](/docs/TextFrame) around a [TextFigure](/docs/TextFigure): the polygon is three and a half ems tall and its label is a caption at the text size, so every card sizes from the same em and nothing needs a `stack-size`.

The color handling is also worth noting. `palette(blue, purple, [3, 8])` turns the side count into a smooth color ramp, so the sequence reads as a progression rather than a collection of unrelated fills. There is also a small `spin` adjustment in `RegularPolygon`, which helps each shape sit in a more natural upright orientation.