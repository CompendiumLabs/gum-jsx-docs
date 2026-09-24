# Flex grow

*Category*: layout

A bordered card holds a heading, a line of text, and a row of three shapes that
takes up whatever room is left.

The row sets `grow={1}` inside the **VStack**, so it receives the height remaining
after both text lines and their gaps. Its `align="stretch"` gives every child
that height. The **Circle** reserves an `em(6)` width and draws circular geometry
inside its allocation, so a tall preview does not make it consume the entire row
width. The two **RoundedRect** children use `grow={1}` to split the rest equally.

Try resizing the outer **Box** or changing one grow factor to 2. The emoji in the
heading needs no setup; see [Fonts](../../guides/text/fonts.md).

See [Stack](../../guides/text/stack.md) for the allocation rules and
[Layout choices](./layout_choices.md) for fixed, equal, and weighted rows.
