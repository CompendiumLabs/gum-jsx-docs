# TextCol

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `width` | Content-sized | `"fill"` occupies available width; lengths set an explicit width |
| `gap` | `em(0.6)` | Space between adjacent children |
| `align` | `"fill"` | Fill automatic child widths while respecting explicit sizes and limits |
| `justify` | `"start"` | Vertical packing and distributed spacing |

A text-aware stack: strings/numbers become **Text** elements at construction.
Existing figures retain their identities and flex metadata. **TextStack** uses
`direction="vertical"` by default, or "horizontal"; **TextRow** is horizontal with
baseline alignment, **TextCol** vertical with fill alignment.

Other props follow [Stack](../../guides/text/stack.md). gap defaults to 0.6em. Width allocation
reflows text while preserving glyph measurements and baselines. These wrappers
do not add automatic flex weights, scaling, or a separate text scale. Specify
grow/shrink/basis for flexible content.
**Element** children can override horizontal alignment with `align-self`; for example,
`align-self="end"` opts out of the default fill allocation and aligns at the right edge.
A child with its own `width="fill"` still fills the offer; omit that width
for a compact document component aligned at the edge.

The column measures its content and selects a shared width, reflowing text within
available offers. Set `width="fill"` to occupy the offer explicitly.
Explicit child widths and `align-self` opt out of fill alignment; child min/max
limits constrain fill allocations. Use `align="stretch"` for hard allocations
that override child widths and limits. Heights retain ordinary stack and flex rules.
