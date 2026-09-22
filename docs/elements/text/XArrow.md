# XArrow

*Category*: math

An extensible relation arrow with labels above and optionally below it.

| Property | Default | Meaning |
| --- | --- | --- |
| label | `"xrightarrow"` | One of the extensible [MathStretch](MathStretch.md) arrow names. |
| children | Empty | Upper label. |
| below | Absent | Lower label. |
| thickness | `em(0.04)` | Arrow rule thickness. |
| head-curve | `0.7` | Barb curvature from `0` to `1`, using [ArrowHead](ArrowHead.md) geometry. |

Labels can be TeX strings or elements and use upper/lower script styles. The
larger padded label determines width, subject to the shape's minimum. Each
label has half an em of its own size on either side. The arrow sits on the
math axis; a deep upper label receives extra clearance. Color and opacity
inherit normally.

Arrows use core [Arrow](Arrow.md) and [ArrowHead](ArrowHead.md) elements with
open, joined barbs. Harpoons use single-barbed heads; double shafts and hooks
combine them with core lines and arcs. Math controls sizing, the axis, and label
placement, while core handles the arrow geometry and rendering.

The TeX form is `\xrightarrow[below]{above}`. Over/under decorations on a body
belong in [Accent](Accent.md). See [math decorations](../../gallery/text/MathDecorations.md).
