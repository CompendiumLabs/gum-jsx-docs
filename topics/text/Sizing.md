# Sizing

*Category*: core

Gum separates a parent's request, an element's preferred dimensions, and the
size of the rendered content. This is a local allocation protocol, not a
general constraint solver.

## Element dimensions

Common sizing props are width, height, min_width, max_width, min_height, and
max_height. All take [lengths](./Units.md). Minima default to zero and maxima
are unbounded. A preferred width or height is clamped to the element's own limits.
An exact allocation from the parent takes precedence.

Shapes and [Group](../../elements/text/Group.md) use a positive, finite `aspect`, meaning width
divided by height. Square and Circle default to 1. Two exact dimensions or
conflicting size limits can override a preferred aspect. Square and Circle still
draw square/circular geometry within their allocated rectangle.

Box, Svg, and stacks do not derive or enforce a composite aspect relationship.
For a fixed-size composition, supply dimensions or use [Fit](../../elements/text/Fit.md) when uniform
scaling is actually intended.

## Layout requests

| Request | Meaning |
|---|---|
| natural | Measure without a finite offer on that axis |
| available(value) | Advisory pixel budget; content may exceed it |
| exact(value) | Report this allocated dimension; retain overflow separately |

Source dimensions normally turn natural/available requests into exact local
dimensions. An exact parent request wins even over source dimensions.
The [rendering API](./Rendering.md) exposes these requests; the CLI's -W/-H flags
send exact viewport overrides.

Unsized aspectless shapes fill offered axes independently. With no offer, a shape
uses a 16px natural height, and either a 16px width or its aspect-derived width.
Text measures its glyphs and line breaks. Containers normally hug the resulting
content unless their own dimensions or allocations establish a frame.

## The stack boundary

A VStack passes available width inward and measures natural child heights.
An HStack passes available height inward and measures natural child widths.
Growth and shrinkage along the stacking direction require explicit flex props.

A height-only Svg containing an unsized VStack does **not** make its shapes share
that height or infer a common width. Supply the column width, or allocate child
heights explicitly. For Rect aspects 1 and 2, a common width W gives a total height
of W + W/2. To obtain 500px with no gaps, the author can choose W = 1000/3.

Likewise, independently growing aspect figures need not have the same cross-axis
size. There is no automatic filling metadata, expand flag, or mixed text/figure
fitting search. See [Stack](./Stack.md) for the exact allocation controls.
