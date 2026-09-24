---
category: math
description: "Slide uses the same elements as ordinary diagrams."
---

# Math in slides

**Slide** uses the same elements as ordinary diagrams. Put inline **Tex** in a
**Text** title, display **Latex** alongside a plot, and math inside captions or
explanatory prose. A slide does not need a separate math renderer or font setup.

Set one base `font-size` and express the rest of the composition with relative
sizes. The slide supplies its body allocation; an **HStack** splits that width
between `grow={1}` on the text column and `grow={1.1}` on the plot. Neither column
needs an explicit width. The plot's `aspect={1.3}` determines its height, and
its smaller `em(0.6)` font keeps tick labels subordinate to the explanation.

Title size and gaps also use `em()`. Standalone formulas fit their columns
automatically, while inline math keeps the paragraph's font scale. The slide's
[fit prop](../../guides/text/sizing.md#fitting) shrinks the completed composition into the host's
bounds. No authored pixel width or height is required.

The runnable slide combines a mathematical title, two display equations, mixed
prose, and a shaded Gaussian curve. Save it
as `slide.jsx` to render it:

```sh
gum slide.jsx -o slide.svg
gum slide.jsx -W 320 -H 240 -o slide-small.svg
gum slide.jsx -o slide.png --ratio 2
```

See [Slide](../../elements/text/Slide.md), [plot labels](math_plot_labels.md), and
[formulas inside prose](inline_math.md). Single-figure PDF export is available
with `-o slide.pdf`; multi-file decks remain a separate planned workflow.
