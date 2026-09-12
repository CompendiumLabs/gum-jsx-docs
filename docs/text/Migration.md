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
| TextBox / TextFrame / TextCol / TextRow | Basic conveniences on Box and shared stack layout |
| fit flag on an element | Explicit Fit wrapper |
| Line points as coordinate pairs | Line from/to objects; Polyline or Polygon points objects |
| SVG path strings | Path commands built with move_to, line_to, quad_to, curve_to, close_path |
| Graph clones geometry into a coord | Explicit coordinate context; CoordLine and new marks map their data |
| Untagged plot dimensions and prefixed styles | Pixel/em strokes and labels; nested part style objects |
| N symbolic samples | samples; functions execute once at construction and missing values create gaps |
| Element rotate / transform shortcuts | Explicit Rotate / TransformBox wrappers |
| evaluateGum(...).svg() | evaluate → LayoutPass.layout → render_svg |

These are design correspondences, not mechanical renames. In particular, sizing
and alignment have different contracts. Parent percentages need definite
references, styles use a limited vocabulary, and Box accepts one content element.
Changing a viewport does not implicitly scale typography.

## What is not ported?

Graph, Plot, axes, arrows, splines, symbolic sampling, and basic text/slide layouts
are now available. See [Plot](Plot.md), [Sampling](Sampling.md), and the
[plotting overview](../../../docs/PLOTTING.md) for current behavior and limits.
The [sampled-curve showcase](../../gala/text/sampled_curve.md) remains an example
of a manual layout; the [plot showcase](../../gala/text/plot_wave.md) uses the new API.

Wrapping/grid layouts, networks, images, math/TeX, themes, legacy plugins,
nonlinear scales, adaptive sampling, and advanced plotting options remain deferred.

Stacks do not solve for a composite aspect. A height-only column of unsized
figures stays naturally sized unless the author supplies width or explicit flex.
The abandoned automatic filling layer is not part of the API.

For the full porting inventory, see the workspace
[feature map](../../../docs/FEATURES.md). For the behavior to use today, start
with [Units](Units.md), [Sizing](Sizing.md), [Stack](Stack.md), and [Text](Text.md).

[Runnable source](../code/Migration.jsx).
