# TextStack

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `direction` | `"vertical"` | Stack converted text horizontally or vertically |
| `gap` | `em(0.6)` | Space between adjacent children |
| `align` | `"start"` | Cross-axis alignment |
| `justify` | `"start"` | Main-axis packing and distributed spacing |

A text-aware stack: strings/numbers become **Text** elements at construction.
Existing figures retain their identities and flex metadata. **TextStack** uses
`direction="vertical"` by default, or "horizontal"; **TextRow** is horizontal with
baseline alignment, **TextCol** vertical with fill alignment and `width="fill"`.

Other props follow [Stack](../../gallery/text/Stack.md). gap defaults to 0.6em. Width allocation
reflows text while preserving glyph measurements and baselines. These wrappers
do not add automatic flex weights, fitting, or a separate text scale. Specify
grow/shrink/basis for flexible content.
**Element** children can override the cross-axis alignment with `align-self`.
