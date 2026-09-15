# XArrow

*Category*: math

An extensible relation arrow with labels above and optionally below it.

| Property | Default | Meaning |
| --- | --- | --- |
| label | `"xrightarrow"` | One of the extensible [MathStretch](MathStretch.md) arrow names. |
| above / children | Empty | Upper label. Use either property. |
| below | Absent | Lower label. |
| thickness | `em(0.04)` | Arrow rule thickness. |

Labels can be TeX strings or elements and use upper/lower script styles. The
larger padded label determines width, subject to the shape's minimum. Each
label has half an em of its own size on either side. The arrow sits on the
math axis; a deep upper label receives extra clearance. Color and opacity
inherit normally.

The TeX form is `\xrightarrow[below]{above}`. Over/under decorations on a body
belong in [Accent](Accent.md). See [math decorations](../../topics/text/MathDecorations.md).
