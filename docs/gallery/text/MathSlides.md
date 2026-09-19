# Math in slides

*Category*: math

**Slide** uses the same elements as ordinary diagrams. Put inline **Tex** in a
**Text** title, display **Latex** alongside a plot, and math inside captions or
explanatory prose. A slide does not need a separate math renderer or font setup.

For a fixed composition, give the slide a design size and set its
[fit prop](./Sizing.md#fitting) so the outer size comes from the host.
Font sizes and internal layout dimensions establish the composition. A **Plot** may use a smaller relative
font size than the slide's text. For a formula that must fit a reserved area,
set `fit` on the formula or pass it to a
[standalone math export](MathExport.md); changing the slide's dimensions
alone does not scale the formula.

The runnable slide combines a mathematical title, two display equations, mixed
prose, a shaded Gaussian curve, and formulas in the axes and caption. Save it
as `slide.jsx` to render it:

```sh
gum slide.jsx -o slide.svg
gum slide.jsx -W 320 -H 240 -o slide-small.svg
gum slide.jsx -o slide.png --ratio 2
```

See [Slide](../../elements/text/Slide.md), [plot labels](MathPlotLabels.md), and
[formulas inside prose](InlineMath.md). Single-figure PDF export is available
with `-o slide.pdf`; multi-file decks remain a separate planned workflow.
