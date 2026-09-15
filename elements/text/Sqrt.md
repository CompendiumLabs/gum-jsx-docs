# Sqrt

*Category*: math

A radical whose rule covers its cramped radicand. An optional index is always set in scriptscript style.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Radicand element or TeX source. |
| index | Absent | Optional root index element or TeX source. |
| thickness | `em(0.04)` | Thickness of the horizontal rule. |
| style / size_index | Inherited | Surrounding math style and optional TeX size index. |
| klass / left / right | `"mord"` | Classes exposed by the radical. |

The smallest Main/Size glyph covering the body is selected. Beyond Size4, the
surd stretches vertically while retaining its horizontal proportions. The
rule overlaps the surd slightly to prevent a rasterization seam. A wide index
reserves extra width on the left.

Use TeX `\sqrt{x}` or `\sqrt[3]{x}` for the same layout. See
[ordinary formulas](../../topics/text/MathExpressions.md).
