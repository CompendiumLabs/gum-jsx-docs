# HStack

*Category*: layout

Arrange elements left to right. Width is the main axis and height is the cross
axis. See [Stack](../../topics/text/Stack.md) for all props and allocation rules.

| Property | Default | Meaning |
|---|---|---|
| gap | `0` | Space between adjacent children |
| align | `"start"` | Cross-axis (vertical) alignment, including `"baseline"` |
| justify | `"start"` | Main-axis (horizontal) packing and distributed spacing |

| Direct child prop | Default | Meaning |
|---|---|---|
| align_self | Stack's align | Override this child's vertical alignment |

An HStack without explicit flex uses each child's preferred or measured natural
width. An available height can determine aspect figures' widths locally.
A width budget alone does not infer a common height for a group of figures.

To make a paragraph take remaining width, give it `grow={1} shrink={1}`, or
`basis={0} grow={1}`. The latter starts at zero rather than measuring a natural
width first. To share leftover width between wrapped columns, put those props on
the columns themselves.

## Alignment

- align controls vertical positioning: start, center, end, stretch, or 0–1.
- align_self on a direct child overrides that default using the same values.
- align="baseline" aligns the first text baselines; a child without a baseline
  uses its bottom edge. Only children whose effective alignment is baseline
  participate; the row includes their ascent and descent extents.
- justify controls horizontal positioning or distributed spacing.

Stretch allocates the row's selected height only to stretching children; it can override
preferred cross-axis sizes. It does not scale glyphs. Text.text_align only affects
the placement of lines within that Text's own width.
Child containers' own align values continue to position their contents.

If child widths and gaps exceed the budget, nothing shrinks unless shrink was
enabled. Fixed-width text may overflow internally even when its frame is small.
Wrap the row in a clipping Box if clipping is intended.

[Runnable source](../code/HStack.jsx).
