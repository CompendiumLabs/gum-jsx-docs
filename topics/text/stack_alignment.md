# Baselines, packing, and stretch
*Category*: layout

The first row aligns mixed-size text on a common baseline; the **Square** uses its
bottom edge because it has no baseline guide. The second distributes free space
between fixed-size items. In the last row, the blue bar stretches to the height
of the paragraph after its width is allocated and its words reflow.

Try a narrower SVG width to inspect the stretch behavior. Cross-axis alignment
and main-axis packing are independent; see [HStack](../../elements/text/HStack.md)
and [Stack](./Stack.md) for their props.
