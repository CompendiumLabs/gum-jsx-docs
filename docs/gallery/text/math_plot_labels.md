---
category: math
description: "Axis tick labels can be Gum elements."
---

# Math on plots and axes

Axis tick labels can be Gum elements. Supply `[value, element]` pairs to
**Plot**'s `xticks` or `yticks`, or to **Axis**'s `ticks`. The numeric value
determines position; **Tex** supplies the label's math typography.

```jsx
const ticks = [
  [0, <Tex>0</Tex>],
  [pi / 2, <Tex>{String.raw`\frac\pi2`}</Tex>],
  [pi, <Tex>{String.raw`\pi`}</Tex>],
]
```

Titles, axis titles, and legend labels also accept elements. Use **Text** with
inline **Tex** for mixed prose, or **Latex** for a display-style label. Labels
are measured before the plot's margins are chosen, so a fraction can reserve
more height than a plain numeral. Math elements receive the plot's inherited
font size and color; explicit styling on the formula takes precedence.

The runnable example uses formulas in every label position. It plots sine and
cosine with multiples of π on the horizontal axis and a mathematical legend.

See [Plot](../../elements/text/Plot.md), [Axis](../../elements/text/Axis.md),
[math inside prose](inline_math.md), and [math in slides](math_slides.md).
