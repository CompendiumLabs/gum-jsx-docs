# MathText

*Category*: math

*Inherits*: [MathRow](/docs/MathRow) > [Group](/docs/Group) > [Element](/docs/Element)

Arranges math items in a horizontal row with automatic inter-atom spacing. Strings and numbers are parsed as LaTeX (as in [Latex](/docs/Latex)), nested **MathText** is flattened, and ordinary gum [Element](/docs/Element) values can be mixed inline as well.

Spacing between neighbors is derived from their atom classes like `mord`, `mbin`, and `mrel`. An ordinary `Element` counts as an ordinary atom (`mord`) with no spacing of its own; wrap it in a [MathBox](/docs/MathBox) to give it padding or another class.

`scale` works like [Text](/docs/Text): it multiplies the element's size in the
surrounding em. This works in text containers, inline text, and other math.
Nested scales multiply. A scaled fragment stays whole, preserving its internal
spacing. The math elements share this option, including `Frac`, `Sqrt`,
`MathSymbol`, `MathRow`, and `MathBox`; dimensions such as padding and width
are still measured in the element's own em.

```jsx
<TextCol width={20}>
  <Text>Twice the surrounding size:</Text>
  <MathText scale={2}>x + y = z</MathText>
</TextCol>
```

As with text, `scale` needs an em layout to establish the surrounding size.
A standalone formula still fills its rectangle at its aspect ratio. Text
containers shrink a formula if it is too wide for its slot. Inline math stays
on the line's math axis and can extend beyond the fixed line height.

Parameters:
- `children` — math items, nested arrays of math items, or ordinary `Element`s
- `scale` = `1` — own em relative to the surrounding em
- `style` = `text` — TeX style used when parsing string and scalar children
- `strut` = `false` — reserve a minimum top-level math line box
- usual [Group](/docs/Group) placement parameters are also accepted
