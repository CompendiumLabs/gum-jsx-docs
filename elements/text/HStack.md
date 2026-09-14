# HStack

*Category*: layout

Arrange elements left to right. Width is the main axis and height is the cross
axis. See [Stack](../../topics/text/Stack.md) for all props and allocation rules.

| Property | Default | Meaning |
|---|---|---|
| `gap` | `0` | Space between adjacent children |
| `align` | `"start"` | Cross-axis (vertical) alignment, including `"baseline"` |
| `justify` | `"start"` | Main-axis (horizontal) packing and distributed spacing |

| Direct child prop | Default | Meaning |
|---|---|---|
| `align-self` | `Stack's align` | Override this child's vertical alignment |

An **HStack** without explicit flex uses each child's preferred or measured natural
width. An available height can determine aspect figures' widths locally.
A width budget alone does not infer a common height for a group of figures.

To make an unsized paragraph take remaining width, give it `grow={1}`. Under a
finite row budget, its omitted basis starts from zero. To share leftover width
between wrapped columns, put grow on the columns themselves.

Use `basis="auto" grow={1} shrink={1}` to start from the explicit or measured
width, adding surplus or shrinking when necessary. `width="fit"` also preserves
a measured starting width. Explicit length bases take precedence over width.

## Alignment

- align controls vertical positioning: start, center, end, fill, stretch, or 0–1.
- `align-self` on a direct child overrides that default using the same values.
- `align="baseline"` aligns the first text baselines; a child without a baseline
  uses its bottom edge. Only children whose effective alignment is baseline
  participate; the row includes their ascent and descent extents.
- justify controls horizontal positioning or distributed spacing.

Stretch allocates the row's selected height only to stretching children; it can override
preferred cross-axis sizes. It does not scale glyphs. **Text**.`text-align` only affects
the placement of lines within that **Text**'s own width.
Child containers' own align values continue to position their contents.
Fill follows the same measurement order but respects explicit child heights and
min/max height limits. It allocates height only to automatically sized children.

If child widths and gaps exceed the budget, nothing shrinks unless shrink was
enabled. Fixed-width text may overflow internally even when its frame is small.
Wrap the row in a clipping **Box** if clipping is intended.
