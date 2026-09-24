---
category: text
description: "A vertical list with baseline-aligned markers."
---

# Bullets

| Property | Default | Meaning |
|---|---|---|
| `children` | Empty | One text or element child per bullet |
| `marker` | `"•"` | Marker text prepended to each item |
| `gap` | `em(0.5)` | Vertical space between items |
| `indent` | `em(1.2)` | Width reserved for each marker |

A vertical list with baseline-aligned markers. Supply one child per item. Wrap
mixed inline content in **Text** so it remains one bullet. marker defaults to •,
indent to 1.2em, and gap to 0.5em. Each row
reserves marker width before allocating flexible content, so paragraphs keep
a hanging indent. A nested **Bullets** **Element** can be an item.
