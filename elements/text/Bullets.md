# Bullets

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `items` | `Converted children` | Bullet item content |
| `marker` | `"•"` | Marker text prepended to each item |
| `gap` | `em(0.5)` | Vertical space between items |
| `indent` | `em(1.2)` | Width reserved for each marker |

A vertical list with baseline-aligned markers. Supply `items` (text/**Element**s) or
children. marker defaults to •, indent to 1.2em, and gap to 0.5em. Each row
reserves marker width before allocating flexible content, so paragraphs keep
a hanging indent. A nested **Bullets** **Element** can be an item.
