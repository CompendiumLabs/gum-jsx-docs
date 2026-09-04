# TextCol

*Category*: text

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

A column of text blocks. Each child is laid out for the column's width and they stack top to bottom with `gap` em between them; the column is as tall as they come to. A [Text](/docs/Text) or [Bullets](/docs/Bullets) child takes the column's width unless it has a `width` of its own, in which case it keeps it and its size and is placed by `justify`, or by its own `align` if it has one (`align="right"` on a figure puts it at the right of a left-justified column). A child's `scale` sets its size relative to the column's em, which is how headings and captions are made. A formula ([Latex](/docs/Latex)) sits at the text's size, and any other element spans the column at its aspect.

Every text element carries its box in em, so a column can be a child of another column, a [TextRow](/docs/TextRow), a [TextGrid](/docs/TextGrid), or a [TextBox](/docs/TextBox), and a [Slide](/docs/Slide) is a column in a frame. A column with no `width` is as wide as its widest child and hands no width down.

Given a `height` to fill, the children sized by the width (text, lists, formulas) are laid out first, and what is left after them and the gaps is split evenly among the height-flexible children: an element with an aspect and no size of its own, a [TextFigure](/docs/TextFigure) without a `width` or `height`, or a [TextRow](/docs/TextRow) or column holding one. Each is sized to its share instead of spanning the width: a bare element at its aspect, no wider than the column, and a [TextFigure](/docs/TextFigure) as a box the column's width with the element fit inside it by its own `justify`. This is how a [Slide](/docs/Slide) fits a figure to its frame; it is a single pass, so a figure's neighbor in a row can still overrun the height, which the slide's `overflow` then handles.

Parameters:
- `children` — the blocks to stack: text, lists, formulas, other columns and rows, or any element
- `width` — the width of the column in em; sets the size of the text in it
- `height` — the height in em to fill, budgeted to the children without a size of their own
- `scale` = `1` — the size of the column relative to the surrounding text's em
- `gap` = `0.5` — the space between children in em
- `justify` = `'left'` — where a child narrower than the column sits, and the text alignment handed to the children; a child's own `align` overrides it for that child alone
- `font-family`/`font-weight`/`font-style` — font settings for the text children
- `text-*` — additional arguments forwarded to the text children
