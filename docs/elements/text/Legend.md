---
category: plotting
description: "A measured box of badge/label rows."
---

# Legend

| Property | Default | Meaning |
|---|---|---|
| `children` | Empty | [LegendItem](LegendItem.md) rows or custom elements |
| `gap` | `em(0.4)` | Vertical space between entries |
| `badge-width` | `em(1.8)` | Width of generated line, point, or bar badges |
| `label-style` / `label-*` | — | Nested or flat text options for generated labels |
| `padding` | `em(0.6)` | Space inside the legend box; accepts [Box padding forms](./Box.md) |
| `border-width` | `px(1)` | Border thickness inside the frame |
| `border-color` | `"theme:border"` | Border paint |
| `background` | `none` | Explicit **Legend** background |
| `border-radius` | `px(4)` | **Box** corner radius |
| `align` | `"start"` | Content alignment inside the box |
| `clip` | `false` | Clip content inside the rounded border |

A measured box of badge/label rows. Supply [LegendItem](LegendItem.md) children
for generated badges and labels, or custom elements for complete rows.

**Box** props control decoration and sizing. Defaults: transparent background, 1px theme
border, 0.6em padding. Badges use `theme:accent` unless an item supplies `badge-color`.
gap is row spacing (0.4em); `badge-width` defaults to 1.8em;
`label-style` supplies generated text options, also available as scoped props such
as `label-color`, `label-font-size`, or `label-wrap`. Flat props override matching
nested fields. Supplied label/badge **Element**s retain their own props.
**Legend** hugs its rows. **Plot**'s legend prop
places it inside top right and still accepts legend records for that separate slot;
layout containers can place a **Legend** elsewhere.
