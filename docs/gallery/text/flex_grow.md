# Flex grow

*Category*: layout

A bordered card holds a heading, a line of text, and a row of three shapes that
takes up whatever room is left.

The row sets `grow={1}` inside the **VStack**, so it receives the height remaining
after both text lines and their gaps. Its `align="stretch"` gives every child
that height. The **Circle** keeps its unit aspect and becomes as wide as the row
is tall; the two **RoundedRect** children use `grow={1}` to split the rest of the
width equally.

Try resizing the **Svg** or changing one grow factor to 2. The emoji in the
heading needs no setup; see [Fonts](./Fonts.md).

See [Stack](./Stack.md) for the allocation rules and
[Layout choices](./layout_choices.md) for fixed, equal, and weighted rows.
