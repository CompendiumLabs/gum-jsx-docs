# TextGrid

*Category*: text

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

A grid of text blocks in `cols` equal columns, filled row by row. Every cell is given the column width as its own, so a text block or a [TextBox](/docs/TextBox) spans its cell; a row is as tall as its tallest cell, and the gaps between columns and rows are in em. Content narrower than its cell (a [TextFigure](/docs/TextFigure) with a `height`, say) is placed in it by `justify`, or by its own `align` if it has one. Without a `width`, the grid is laid out for the width it is offered, or its cells are as wide as the widest laid at its own size.

Parameters:
- `children` — the cells, in row order
- `cols` = `2` — the number of columns
- `width` — the width of the grid in em
- `scale` = `1` — the size of the grid relative to the surrounding text's em
- `gap` = `1` — the space between cells in em, or `[horizontal, vertical]`
- `valign` = `'top'` — how the cells of a row align vertically: `top`, `anchor`, `center`, or `bottom`
- `justify` = `'left'` — where content narrower than its cell sits, and the text alignment handed to the cells; a cell's own `align` overrides it for that cell alone
- `font-family`/`font-weight`/`font-style` — font settings for the text cells
- `text-*` — additional arguments forwarded to the text cells
