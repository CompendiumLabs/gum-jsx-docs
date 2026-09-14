# Legend

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| `entries` | `[]` | `{ label, color?, kind?, badge? }` legend records |
| `gap` | `em(0.4)` | Vertical space between entries |
| `badge-width` | `em(1.8)` | Width of generated line, point, or bar badges |
| `label-style` / `label-*` | — | Nested or flat text options for generated labels |
| `padding` | `em(0.6)` | Space inside the legend box; accepts [Box padding forms](./Box.md) |
| `border-width` | `px(1)` | Border thickness inside the frame |
| `border-color` | `"#cbd5e1"` | Border paint |
| `background` | `white` | **Legend** background |
| `radius` | `px(4)` | **Box** corner radius |
| `align` | `"start"` | Content alignment inside the box |
| `clip` | `false` | Clip content inside the rounded border |

A measured box of badge/label rows. entries contains
{label,color?,kind?,badge?} records. label is a string or **Element**; kind is line
(default), point, or bar. A custom badge **Element** replaces its swatch.

**Box** props control decoration and sizing. Defaults: white background, 1px light
border, 0.6em padding. gap is row spacing (0.4em); `badge-width` defaults to 1.8em;
`label-style` supplies generated text options, also available as scoped props such
as `label-color`, `label-font-size`, or `label-wrap`. Flat props override matching
nested fields. Supplied label/badge **Element**s retain their own props.
**Legend** hugs its rows. **Plot**'s legend prop
places it inside top right; layout containers can place it elsewhere.
