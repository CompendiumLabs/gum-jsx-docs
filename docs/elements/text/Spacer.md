# Spacer

*Category*: layout

An empty stack child with explicit defaults `basis={0} grow={1}`. It has no
drawing and no content children. Naturally it is zero-sized.

Inside an **HStack** it absorbs spare width; inside a **VStack** it absorbs spare height.
Multiple spacers divide surplus according to their grow weights, alongside other
flexible children.

For a fixed spacer use `<Spacer basis={px(20)} grow={0} />`. A width or height
alone does not replace its default basis: basis takes precedence in stack
allocation. Use gap on the stack when you want the same space between every pair.
Set `basis="auto"` to use an explicit width or height as the spacer's starting size.

**Spacer** does not make a naturally sized parent acquire extra space. Supply a
finite budget or frame size when there should be space to absorb.
In the example, **TextFrame** fills the SVG's available width and allocates its
content width to the row, leaving space for **Spacer** between the two labels.
It is an ordinary element with ordinary flex props, not a special allocator case.
