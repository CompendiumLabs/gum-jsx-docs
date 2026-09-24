# Flex limits and shrinkage
*Category*: layout

The first row divides free space with growth weights of 1:2:1. The next row caps
the middle item at 120px and redistributes the remaining space to its neighbors.
The third row shrinks two 300px bases to fit the available width and gap.
The final row uses **Spacer** to push a fixed-size item to the end.

The outer **TextBox** and nested **TextCol** components supply a shared width
without repeating width declarations. Each **HStack** still allocates its bars
using their grow, shrink, and limit props. The unsized growing bars start from
zero automatically; the shrinking bars explicitly supply their 300px bases.

These are allocations of ordinary **Box** children; their label fonts stay fixed.
See [Stack](../../guides/text/stack.md) for basis, grow, shrink, and min/max rules, or
[Layout choices](./layout_choices.md) for a simpler comparison of growth weights.
