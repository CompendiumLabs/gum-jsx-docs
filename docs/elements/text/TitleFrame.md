# TitleFrame

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `aspect` | — | Preferred ratio of the complete element, including the raised title |
| `frame-aspect` | — | Preferred ratio of the bordered body, excluding the raised title |
| `bounds` | `"outer"` | `"frame"` makes the allocation the bordered body, leaving the raised title outside |
| `title` | — | String or **Element** in a box straddling the top border |
| `title-position` | `"center"` | `"start"`, `"center"`, `"end"`, or numeric horizontal alignment |
| `title-style` / `title-*` | Inherited text style | Nested or flat title text and box options |
| `title-font-weight` | Inherited, initially `400` | Title font weight; no automatic bold styling |
| `title-padding` | `[em(0.6), em(0.3)]` | Horizontal and vertical padding inside the title box |
| `title-border-width` | Frame border width | Title box border thickness |
| `title-border-color` | Frame border color | Title box border paint |
| `title-background` | Frame background | Title box background |
| `title-border-radius` | `em(0.3)` | Title box corner radius |
| `gap` | `em(0.6)` | Space between content children |
| `padding` | `em(0.75)` | Length or [Box padding shorthand](./Box.md) |
| `border-width` | `px(1)` | Border thickness inside the frame |
| `border-color` | Resolved color | Border paint |
| `background` | `none` | **Box** background |
| `border-radius` | `0` | Scalar, `{ x, y }` / `[x, y]` pair, or [side/corner object](./Box.md) |
| `align` | `"start"` | Content alignment on both axes |
| `clip` | `false` | Clip content inside the rounded border |

**TitleFrame** draws a border around its content, with an optional boxed title
centered across the top border. Half of the title box sits above that border;
its full height is included in the layout. The border is cut away behind the
title, so transparent backgrounds work too. The title reserves no room inside
the body: content starts at the ordinary `padding`, so a plot can sit flush with
the border. Even padding keeps content visually aligned within the frame, so when
content should clear the lower half of the title box, prefer a smaller
`title-font-size` or larger `padding` all around over extra top padding. `clip`
clips the body content without clipping the raised title.

For a square border, use `width={px(480)} frame-aspect={1}`. The bordered body will be
480×480, and the title's overhang is added to the total layout height automatically.
Changing the title font or padding does not change the body's ratio. An explicit
`height` still describes the total height including the title. Generic `aspect`
also describes that complete element: `width={px(480)} aspect={1}` gives a
480×480 total allocation, with the border shorter by the title's overhang.
Outer allocations, including dimensions derived from `aspect`, and min/max limits
take precedence over the body's `frame-aspect` preference.

With `bounds="frame"`, the layout box is the bordered body alone. `width`, `height`,
and `aspect` then describe the border, alignment and connections use it, and the
raised half of the title overhangs the top edge as a reserved outset. Leave room
for that overhang in the surrounding `gap` or `padding`.

Scoped `title-` props accept text options such as `title-color`, `title-font-size`,
and `title-wrap`, plus title box padding, border, background, border radius, and alignment.
They override matching fields in `title-style`. Supplied title **Element**s retain
their own props and inherit the title box's font size.
Generated titles inherit the surrounding font weight, which is normal by default.
Use `title-font-weight={bold}` when a bold title is desired.

Without a title, this is an ordinary padded frame. Other props follow
[Box](./Box.md). For an unboxed heading inside the content area, use
[TitleBox](./TitleBox.md).
