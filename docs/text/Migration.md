# Migration from original Gum

*Category*: core

Next is a smaller rewrite, not a drop-in replacement for gum-org. The examples in
this package use the current API exclusively.

| Original convention | Next convention |
|---|---|
| Untagged em or stroke-unit lengths | Explicit px(...) / em(...); raw lengths are fractions |
| size / xsize / ysize / pos / rect | width / height; x / y / anchor for direct Group children |
| Rectangle | Rect |
| rounded | radius |
| Box border / border-stroke / fill | border_width / border_color / background |
| Padding arrays, booleans, and margin | A length or named-side padding object; outer Box for outside spacing |
| Automatic stack figure fitting, share, even | Explicit basis / grow / shrink and chosen dimensions |
| spacing and direction-sensitive justify/valign | gap, cross-axis align, main-axis justify |
| Text scale / justify | font_size / text_align |
| TextBox / TextFrame / TextCol / TextRow | Box or Frame around Text; VStack / HStack |
| fit flag on an element | Explicit Fit wrapper |
| Line points as coordinate pairs | Line from/to objects; Polyline or Polygon points objects |
| SVG path strings | Path commands built with move_to, line_to, quad_to, curve_to, close_path |
| evaluateGum(...).svg() | evaluate → LayoutPass.layout → render_svg |

These are design correspondences, not mechanical renames. In particular, sizing
and alignment have different contracts. Parent percentages need definite
references, styles use a limited vocabulary, and Box accepts one content element.
Changing a viewport does not implicitly scale typography.

## What is not ported?

Plot, Graph, axes, Grid, networks, arrows, splines, symbolic sampling, images,
math/TeX, slide layouts, theme/color helpers, and legacy plugins are not present.
Use plain JavaScript data plus the implemented geometry when that is sufficient.
The [sampled-curve showcase](../../gala/text/sampled_curve.md) demonstrates this
without claiming to be a Plot replacement.

Stacks do not solve for a composite aspect. A height-only column of unsized
figures stays naturally sized unless the author supplies width or explicit flex.
The abandoned automatic filling layer is not part of the API.

For the full porting inventory, see the workspace
[feature map](../../../docs/FEATURES.md). For the behavior to use today, start
with [Units](Units.md), [Sizing](Sizing.md), [Stack](Stack.md), and [Text](Text.md).

[Runnable source](../code/Migration.jsx).
