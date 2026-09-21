# HStack

*Category*: layout

Arrange elements left to right. Width is the main axis and height is the cross
axis. See [Stack](../../gallery/text/Stack.md) for all props and allocation rules.

| Property | Default | Meaning |
|---|---|---|
| `aspect` | — | Preferred width/height ratio of the whole stack |
| `gap` | `0` | Space between adjacent children |
| `wrap` | `false` | Start a new row when the next child's flex basis would exceed the offered width |
| `line-gap` | `gap` | Vertical space between wrapped rows |
| `align` | `"start"` | Cross-axis (vertical) alignment, including `"baseline"` |
| `justify` | `"start"` | Main-axis (horizontal) packing and distributed spacing |

| Direct child prop | Default | Meaning |
|---|---|---|
| `align-self` | `Stack's align` | Override this child's vertical alignment |

An **HStack** without explicit flex uses each child's preferred or measured natural
width. An available height can determine aspect figures' widths locally.
A width budget alone does not infer a common height for a group of figures.
An explicit `aspect` on the stack can establish that height: `width={px(240)}
aspect={2}` allocates a 240×120 row before flex and child alignment. This sets
the stack's box, not its children's proportions; see [Sizing](../../gallery/text/Sizing.md).

To make an unsized paragraph take remaining width, give it `grow={1}`. Under a
finite row budget, its omitted basis starts from zero. To share leftover width
between wrapped columns, put grow on the columns themselves.

Use `basis="auto" grow={1} shrink={1}` to start from the explicit or measured
width, adding surplus or shrinking when necessary. Explicit length bases take
precedence over width; alignment does not select a basis.

## Alignment

- align controls vertical positioning: start, center, end, fill, stretch, or 0–1.
- `align-self` on a direct child overrides that default using the same values.
- `align="baseline"` aligns the first text baselines; a child without a baseline
  uses its bottom edge. Only children whose effective alignment is baseline
  participate; the row includes their ascent and descent extents.
- justify controls horizontal positioning or distributed spacing.

Stretch allocates the row's selected height only to stretching children; it can override
preferred cross-axis sizes. It does not scale glyphs. **Text**.`justify` only affects
the placement of lines within that **Text**'s own width.
Child containers' own align values continue to position their contents.
Fill follows the same measurement order but respects explicit child heights and
min/max height limits. It allocates height only to automatically sized children.

If child widths and gaps exceed the budget, nothing shrinks unless shrink was
enabled. Fixed-width text may overflow internally even when its frame is small.
Wrap the row in a clipping **Box** if clipping is intended.

## Wrapping rows

`wrap` uses the offered width to choose line breaks, then hugs the widest row
and the combined row heights. It does not reserve unused space to the right.
Explicit width/fill sizing and growing children can still occupy the full offer.
Each row distributes its own growth and shrinkage; justification uses the final
shared width of the wrapped stack.
Without a finite width offer it remains a single natural row.
Give flexible cards a `basis` or `min-width` to set when they wrap; unsized growing
children otherwise start at zero. A single oversized child still needs `shrink`
to reduce its allocation.

```jsx
<HStack wrap gap={em(1)}>
  <TextFrame basis={em(16)} grow={1} shrink={1}>
    First card
  </TextFrame>
  <TextFrame basis={em(16)} grow={1} shrink={1}>
    Second card
  </TextFrame>
</HStack>
```
