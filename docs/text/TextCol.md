# TextCol

*Category*: text

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

A column of text blocks. Each child is laid out for the column's width and they stack top to bottom with `gap` em between them; the column is as tall as they come to. A [Text](/docs/Text) or [Bullets](/docs/Bullets) child takes the column's width unless it has a `width` of its own, in which case it keeps it and its size and is placed by `justify`. A child's `scale` sets its size relative to the column's em, which is how headings and captions are made. A formula ([Latex](/docs/Latex)) sits at the text's size, and any other element spans the column at its aspect.

Every text element carries its box in em, so a column can be a child of another column, a [TextRow](/docs/TextRow), a [TextGrid](/docs/TextGrid), or a [TextBox](/docs/TextBox), and a [Slide](/docs/Slide) is a column in a frame. A column with no `width` is as wide as its widest child and hands no width down.

Parameters:
- `children` — the blocks to stack: text, lists, formulas, other columns and rows, or any element
- `width` — the width of the column in em; sets the size of the text in it
- `scale` = `1` — the size of the column relative to the surrounding text's em
- `gap` = `0.5` — the space between children in em
- `justify` = `'left'` — where a child narrower than the column sits, and the text alignment handed to the children
- `font-family`/`font-weight`/`font-style` — font settings for the text children
- `text-*` — additional arguments forwarded to the text children
