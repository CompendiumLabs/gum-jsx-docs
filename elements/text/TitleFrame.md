# TitleFrame

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| title | — | String or Element placed before the content |
| title_style / title_* | `bold` | Nested or flat text options for a generated title |
| gap | `em(0.6)` | Space between the title and content |
| padding | `em(0.75)` | Length or [Box padding shorthand](./Box.md) |
| border_width | `px(1)` | Border thickness inside the frame |
| border_color | Resolved color | Border paint |
| background | `none` | Box background |
| radius | `0` | Scalar radius or independent `{ x, y }` / `[x, y]` radii |
| align | `"start"` | Content alignment on both axes |
| clip | `false` | Clip content inside the rounded border |

TitleFrame composes an optional title above text or figure children inside a Box.
title is a string or Element; title_style overrides default bold text.
Scoped title_ props accept text options, including title_color, title_font_size,
and title_wrap. They override matching fields in title_style. Supplied title
Elements retain their own props.
gap defaults to 0.6em, padding to 0.75em. TitleFrame adds a 1px border.
Other props follow [Box](./Box.md). Titles are measured content inside the box;
edge-attached title decoration is deferred.
