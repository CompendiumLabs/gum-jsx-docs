# TextFigure

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| caption | — | String or Element placed after the figure children |
| caption_style / caption_* | — | Nested or flat text options for a generated caption |
| gap | `em(0.5)` | Space between the figure and caption |
| padding | `0` | Length or [Box padding shorthand](./Box.md) |
| border_width | `px(0)` | Border thickness inside the frame |
| border_color | Resolved color | Border paint |
| background | `none` | Box background |
| radius | `0` | Scalar radius or independent `{ x, y }` / `[x, y]` radii |
| align | `"start"` | Content alignment on both axes |
| clip | `false` | Clip content inside the rounded border |

A figure followed by an optional caption (string or Element). caption_style
styles generated text, gap defaults to 0.5em, and Box props control outer
decoration. Children must be figure Elements. Give a figure an em/px height;
the caption reflows at the shared column width.

Scoped caption_ props accept generated text options, including caption_color,
caption_font_size, and caption_wrap. They override matching fields in
caption_style. Supplied caption Elements retain their own props.

[Runnable source](../code/TextFigure.jsx).
