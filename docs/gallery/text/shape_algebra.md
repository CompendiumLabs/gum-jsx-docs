# Shape Algebra

*Category*: math

A subdivided square is the value of a series, a colored circle appears under a radical, and a matrix transpose swaps colored swatches.

Math operands are ordinary Gum elements. Each geometric operand has explicit em dimensions, while MathArray measures the cells and Bracket sizes the fences. Compound operands remain separate JSX children.

The TitleFrame uses `frame-aspect={1}` to make a content-sized square border.
Svg hugs the frame and its raised title without an outer Box or fixed dimensions.
Spacing, borders, corner radii, and the title font use ems, so changing the single
base font size on Svg scales the whole figure.

See [MathArray](../../elements/text/MathArray.md).
