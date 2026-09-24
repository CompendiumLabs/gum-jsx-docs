---
category: math
description: "Text accepts formulas and other Gum elements alongside prose."
---

# Math inside prose

[Text](../../elements/text/Text.md) accepts formulas and other Gum elements
alongside prose. Use [Tex](../../elements/text/Tex.md) for text-style formulas;
[Latex](../../elements/text/Latex.md) keeps its display-style default, even inline.

```jsx
<Text width={px(360)}>
  {"The average speed is "}
  <Tex>
    <Frac>
      <TextMode>distance</TextMode>
      <TextMode>time</TextMode>
    </Frac>
  </Tex>
  {" over the measured interval."}
</Text>
```

Each formula is one indivisible item. The paragraph breaks around it at Unicode
line-break opportunities, keeping adjacent punctuation and nonbreaking spaces
attached. An oversized formula overflows instead of shrinking. `wrap={false}`
keeps the whole paragraph on one line; use [fitting](../../guides/text/sizing.md#fitting)
when scaling is intentional.

String expression children make spaces explicit while keeping nested JSX
indented. Ordinary literal prose newlines still create hard breaks in `Text`.

Inline elements align on their baseline, or their bottom edge if they have no
baseline. The normal prose strut sets a minimum line height. Fractions and
other tall items expand that line using logical height and depth; intentional
ink overhang remains overflow. Subsequent lines retain their ordinary height.

[Span](../../elements/text/Span.md) passes its font size and color to a formula.
Math retains its own default faces independently of the prose family. Ordinary
kerning, whitespace normalization, hard breaks, and nonbreaking spaces still
apply to the surrounding text.

[TextBox](../../elements/text/TextBox.md) and [Text](../../elements/text/Text.md) children in a bullet accept arrays mixing
prose, spans, and formulas. Captions and titles can use the same arrays, or an
explicit `Text` element. A sole block child stays a block. For several elements
without prose, wrap them in `Text` to request inline layout, or use `TextCol` for
separate blocks.

The example reuses one formula in two different paragraph widths and in a list.
See [Gum inside math](math_composition.md) for the other direction.
