# Stack

*Category*: layout

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

`HStack` and `VStack` arrange geometry, text, and math using the same layout
engine. Dimensions and `gap` are in shared layout units (em when composing
text). Local drawing coordinates and `pos`/`size` remain separate.

```jsx
<HStack gap={0.5} valign="anchor" justify="left">
  <Text>Hello</Text>
  <Circle height={1} fill={blue}/>
  <MathText scale={1.5}>x = y + 1</MathText>
</HStack>
```

Children with natural measurements keep their relative sizes. An unsized
shape follows the shared cross dimension: height in a row, width in a column.
A purely geometric row of aspect-only children stays scale-free; its aspect
is the sum of theirs. Given width 10, aspects 2 and 0.5 yield widths 8 and 2
at height 4. Completely flexible geometry shares the remaining space.

A bounded row packs naturally if it fits. If it is too narrow, reflow-capable
children without explicit widths share the space left by fixed content and
wrap. A column supplies its width to its children. Math keeps its em even when
it overflows; shrinking is a decision for the whole containing stack.

Use `grow` on a child to consume remaining main-axis space, proportionally to
its weight. Without a finite budget, growth has no effect. `sizes` assigns
weighted slots to every child when the stack has a main-axis budget.

`stack-size` on a child overrides natural sizing with a fraction of the
stack's main dimension **after gaps are subtracted**. The whole child fits
its slot while maintaining aspect, including scaling its text or math.
Children without this override keep their usual measured or aspect-based
sizing. Unlike `grow`, this deliberately changes the child's content scale.
Flexible shapes with no aspect fill their allotted rectangle.

`even` is shorthand for equal fractional shares: with two children it is
equivalent to `stack-size={0.5}` on each, including the way their contents fit.
Explicit child fractions reserve their shares first, and the others divide
the remainder equally. Like explicit fractions, `even` takes precedence over
`sizes` and `grow`. To allocate equal slots while preserving text and math's
em size, use `sizes={[1, 1]}` with a main-axis budget instead.

```jsx
<VStack spacing>
  <Text stack-size={0.075}>Simple Pendulum</Text>
  <Frame rounded padding><Rect aspect={5} fill={blue}/></Frame>
  <Text stack-size={0.075}>Exposition Time</Text>
</VStack>
```

With a main-axis budget, fractions reserve their shares first; natural children
and then weighted children use the remainder. Without one, the natural
children determine the total: their combined length divided by the unreserved
fraction, plus gaps. If every child has a share, their shapes determine a size
at which at least one fills the shared cross dimension. Any unassigned
remainder stays empty.

Fractions must be between zero and one and sum to at most one. Zero draws
nothing. A total of one leaves no natural remainder; additional natural
content then requires an explicit main dimension and follows the overflow
policy. `stack-size` takes precedence over `grow`, `sizes`, and `even` for
that child. `stack-expand` is no longer used.

Exact `width` and `height` reserve a rectangle. If `aspect` is also specified,
content fits that aspect inside the rectangle; the unused space remains part
of the allocation. `max-width` and `max-height` supply budgets without forcing
a smaller composition to grow. There is no automatic search for a paragraph
width from a height limit: width is chosen first, then text wraps.

`overflow` defaults to `visible`, preserving layout and ink overhang. `error`
rejects overflow, `clip` clips to the allocation, and `shrink` uniformly fits
the entire composition, preserving relative text sizes. Zero dimensions are
real; missing dimensions are unconstrained. Unsized geometric content uses a
normalized cross dimension of one when no parent or measured sibling supplies
one; an entirely geometric composition does not report that as an intrinsic em.

Parameters:

- `direc` = `'v'` — stacking direction; fixed by `HStack` / `VStack`
- `width`, `height` — exact dimensions in layout units
- `max-width`, `max-height` — available dimensions
- `gap` — gap between children in layout units
- `spacing` = `0` — alternative: fraction of the main dimension reserved for all gaps
- `scale` = `1` — own layout unit relative to the surrounding unit
- `justify` = `'center'` — horizontal placement and inherited text justification
- `valign` = `'center'` — row alignment: `'top'`, `'anchor'`, `'center'`, `'bottom'`
- `even` = `false` — equal fractional shares, fitting the contents
- `sizes` — weights for allocated slots
- child `stack-size` — fractional slot, fitting the whole child into it
- `overflow` = `'visible'` — `'visible'`, `'clip'`, `'shrink'`, or `'error'`
- `font-*`, `text-*` — inherited typography for reflow-capable children

`TextRow` and `TextCol` are convenience subclasses with text-oriented defaults;
math rows/columns share the same packing code after resolving their atoms.
