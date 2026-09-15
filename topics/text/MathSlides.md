# Math in slides

*Category*: math

**Slide** uses the same elements as ordinary diagrams. Put inline **Tex** in a
**Text** title, display **Latex** alongside a plot, and math inside captions or
explanatory prose. A slide does not need a separate math renderer or font setup.

Set the slide viewport explicitly, then use font sizes and layout dimensions
to establish a readable composition. A **Plot** may use a smaller relative
font size than the slide's text. For a formula that must fit a reserved area,
use [Fit](../../elements/text/Fit.md) around a
[standalone math viewport](MathExport.md); changing the outer SVG's dimensions
alone does not scale the formula.

The runnable slide combines a mathematical title, two display equations, mixed
prose, a shaded Gaussian curve, and formulas in the axes and caption.

```sh
bun run gum gum-next-docs/topics/code/MathSlides.jsx -o /tmp/math-slide.svg
bun run gum gum-next-docs/topics/code/MathSlides.jsx -o /tmp/math-slide.png --ratio 2
```

See [Slide](../../elements/text/Slide.md), [plot labels](MathPlotLabels.md), and
[formulas inside prose](InlineMath.md). Multi-file decks and PDF export are
separate planned workflows.
