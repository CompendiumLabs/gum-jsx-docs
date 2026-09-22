# LegendItem

*Category*: plotting

One badge and label row inside [Legend](Legend.md). Supply the label as children.

| Property | Default | Meaning |
|---|---|---|
| `children` | Empty | Label text or an **Element** |
| `badge-color` | `"theme:accent"` | Generated badge color |
| `kind` | `"line"` | Generated line, point, or bar badge |
| `badge` | Generated | Custom badge **Element** |
| `badge-width` | Inherited from **Legend** or `em(1.8)` | Width of a generated badge |
| `label-style` | Inherited from **Legend** | Text options for a generated label |

A supplied label **Element** keeps its own style. **Legend** applies its
`label-style` and `label-*` options to generated text labels.
