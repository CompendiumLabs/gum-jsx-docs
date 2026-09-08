# TextCol

*Category*: text

*Inherits*: [TextStack](/docs/TextStack) > [Stack](/docs/Stack) > [Group](/docs/Group) > [Element](/docs/Element)

A vertical [Stack](/docs/Stack) with text's defaults: a column of text blocks, `gap` em apart (half a line) and flush left. Each child is laid out for the column's width and they stack top to bottom; the column is as tall as they come to. A [Text](/docs/Text) or [Bullets](/docs/Bullets) child wraps to the column's width unless it has a `width` of its own, in which case it keeps it and sits by `justify`, or by its own `align` (`align="right"` on a figure puts it at the right of a left-justified column; a [TextFigure](/docs/TextFigure) sits in the middle by default). A child's `scale` sets its size relative to the column's em, which is how headings and captions are made. A formula ([Latex](/docs/Latex)) sits at the text's size, a figure spans the column at its aspect, and a bare element (a plot) fills the height the column has to give.

Every element carries its box in em, so a column can be a child of another column, a [TextRow](/docs/TextRow), a [TextGrid](/docs/TextGrid), or a [TextBox](/docs/TextBox), and a [Slide](/docs/Slide) is a column in a frame. A column with no `width` is as wide as its widest child laid at its own size.

Given a `height`, it is a budget: the content is laid out first, and what is left after it and the gaps goes to the children that can use it: a bare element fills it, and figures (an element with an aspect, a [TextFigure](/docs/TextFigure) without a size, a row holding one) split it evenly, each fit inside its share. A column over its budget takes the height out of those figures, never out of its text. This is how a [Slide](/docs/Slide) fits a figure to its frame.

Parameters:
- `children` — the blocks to stack: text, lists, formulas, figures, other columns and rows, or any element
- `width` — the width of the column in em; sets the size of the text in it
- `height` — the height in em to fill, budgeted to the children without a size of their own
- `scale` = `1` — the size of the column relative to the surrounding text's em
- `gap` = `0.5` — the space between children in em
- `justify` = `'left'` — where a child narrower than the column sits, and the text alignment handed to the children; a child's own `align` overrides it for that child alone
- `font-family`/`font-weight`/`font-style` — font settings for the text children
- `text-*` — additional arguments forwarded to the text children
- child `width`/`height`/`share`/`fit` — as for [Stack](/docs/Stack)
