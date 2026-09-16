# Lap

*Category*: math

A zero-advance ordinary atom that still draws its operand. Height, depth, and
baseline remain intact. Strings parse as TeX.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Overhanging operand. |
| align | `"left"` | Align the operand's left edge, center, or right edge to the insertion point. |

`align="left"` places the operand after the insertion point (`\mathrlap`).
`align="right"` places it before the point (`\mathllap`). `align="center"`
centers it on the point (`\mathclap`). The default is `"left"`.

Ink overhang is retained independently of the zero width. A lap does not move
the following content backward; use negative [MathSpacer](MathSpacer.md)
advance for that. Combine with [Smash](Smash.md) to suppress both dimensions.
Explicit SVG viewports need padding around overhanging ink.
