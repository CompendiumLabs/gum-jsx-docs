# TitleBox

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `title` | — | String or **Element** placed before the content |
| `title-style` / `title-*` | `bold` | Nested or flat text options for a generated title |
| `gap` | `em(0.6)` | Space between the title and content |
| `padding` | `em(0.75)` | Length or [Box padding shorthand](./Box.md) |
| `border-width` | `px(0)` | Border thickness inside the frame |
| `border-color` | Resolved color | Border paint |
| `background` | `none` | **Box** background |
| `radius` | `0` | Scalar, `{ x, y }` / `[x, y]` pair, or [side/corner object](./Box.md) |
| `align` | `"start"` | Content alignment on both axes |
| `clip` | `false` | Clip content inside the rounded border |

**TitleBox** composes an optional title above text or figure children inside a **Box**.
title is a string or **Element**; `title-style` overrides default bold text.
Scoped `title-` props accept text options, including `title-color`, `title-font-size`,
and `title-wrap`. They override matching fields in `title-style`. Supplied title
**Element**s retain their own props.
gap defaults to 0.6em, padding to 0.75em. **TitleFrame** adds a 1px border.
Other props follow [Box](./Box.md). Titles are measured content inside the box;
edge-attached title decoration is deferred.
