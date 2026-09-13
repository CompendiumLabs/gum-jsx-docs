# Box

*Category*: layout

Add padding, a background, an inside border, optional rounded clipping, and
alignment around one content element. To contain siblings, wrap them in a
stack or Group first. Plain strings must be inside Text.

Box hugs its content plus padding and border unless an explicit size or parent
allocation fixes the frame. Width and height describe the **outer** frame.
The inner content area subtracts padding and the border on each side.

| Property | Default | Meaning |
|---|---|---|
| padding | 0 | One length, or named left/top/right/bottom lengths |
| border_width | px(0) | Border thickness inside the frame |
| border_color | Resolved color | Border paint |
| background | "none" | This Box's background |
| radius | 0 | Scalar radius, { x, y }, or [x, y] radii |
| align | "start" | Content alignment on both axes, or { x, y } / [x, y] |
| clip | false | Clip content inside the rounded border |

Missing named padding sides are zero. For example,
`padding={{ left: em(1), right: em(1), top: px(8), bottom: px(8) }}`.
Padding arrays, boolean padding, and a margin prop are not supported. Use
another outer Box when you need outside spacing.

Alignment accepts "start", "center", "end", "stretch", or a fraction from 0 to 1.
In an object or two-entry tuple, x and y can be set independently:
`align={['stretch', 'end']}` stretches horizontally and aligns at the bottom.
Stretch sends exact child
requests only on axes established before child measurement. It does not
uniformly scale content.

Background and border paint are local decoration. Fill and stroke still inherit
to child shapes; they do not paint the Box itself. The border is drawn last.
Clipping hides paint but does not erase reported overflow.

Percentage padding uses the established parent's axes, not a guessed final box.
Prefer px/em padding for naturally sized boxes. See [Units](../../topics/text/Units.md).

Box does not relay child grow/shrink props through to a stack parent. Put flex
props on the Box itself when it is the item being allocated.
Box also does not infer an aspect from its content.

[Runnable source](../code/Box.jsx).
