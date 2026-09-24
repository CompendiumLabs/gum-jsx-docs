---
category: text
description: "A Grid that converts strings and numbers to Text elements at construction."
---

# TextGrid

A [Grid](./Grid.md) that converts strings and numbers to **Text** elements at
construction. Existing elements retain their identity and alignment settings.

| Property | Default | Meaning |
|---|---|---|
| `columns` | `1` | Equal-width column count, or an array of lengths and `"auto"` tracks |
| `gap` | `em(0.6)` | Space between rows and columns |
| `column-gap` | `gap` | Override horizontal spacing |
| `row-gap` | `gap` | Override vertical spacing |
| `align` | `{ x: "fill", y: "start" }` | Fill automatic child widths and align cells at the top of each row |

Each string, number, or element is one cell, filled row by row. Nested arrays
flatten; null and boolean children are skipped. Use an empty **Box** to retain a
blank cell. Wrap mixed inline content in **Text** to keep it in a single cell.

Equal columns share an offered width; without an offer they use the widest natural
cell. Text wraps before the row heights are measured. An array such as
`columns={["auto", em(16)]}` keeps a compact label column beside wrapped prose.
It does not grow to fill spare width. Typography inherits normally, without a
separate text scale or extra layout wrapper.

Cell alignment, fill/stretch, percentage references, and overflow follow Grid's
rules. Use `align-self` on an element child to override its alignment. Rows remain
content-sized even when the Grid has an explicit height.
