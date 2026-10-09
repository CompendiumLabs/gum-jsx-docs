---
category: layout
description: "Empty space with fixed dimensions or flexible growth."
---

# Spacer

An empty stack child with no drawing and no content children. Set `width` or
`height` for fixed spacing:

```jsx
<Spacer width={px(20)} />
<Spacer height={em(1)} />
```

Both dimensions can be set together. Setting either dimension defaults to
`basis="auto" grow={0}`, so the spacer keeps its requested size. Explicit flex
props still take precedence: add `grow={1}` to let it grow from that size, or set
`basis` to override its starting size along the stack's main axis.

Without dimensions, **Spacer** defaults to `basis={0} grow={1}` and is naturally
zero-sized. Inside an **HStack** it absorbs spare width; inside a **VStack** it
absorbs spare height. Multiple spacers divide surplus according to their grow
weights, alongside other flexible children. For axis-independent fixed spacing,
`<Spacer basis={px(20)} grow={0} />` also works. Use `gap` on the stack when you
want the same space between every pair.

**Spacer** does not make a naturally sized parent acquire extra space. Supply a
finite budget or frame size when there should be space to absorb.
In the example, **TextFrame** fills the SVG's available width and allocates its
content width to the row, leaving space for **Spacer** between the two labels.
It is an ordinary element with ordinary flex props, not a special allocator case.
