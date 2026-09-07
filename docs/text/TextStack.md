# TextStack

*Category*: text

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

A stack of text blocks in em, vertical (`direc="v"`, the default) or horizontal. Where a [Stack](/docs/Stack) divides itself between its children in shares of its own size, a text stack lays every child out for its slot in one unit, the em of the text in it, so text, formulas and figures come out at one size, and it reports its own box in em like any measured element, so text stacks nest. [TextCol](/docs/TextCol) and [TextRow](/docs/TextRow) are its two directions with the gap each wants, and the math stacks (a column of formulas, a row of math items) are the same layout with math's spacing.

Each child is laid out for its slot by what it is. A [Text](/docs/Text) or [Bullets](/docs/Bullets) takes the slot's width unless it has a `width` of its own, in which case it keeps it. A formula ([Latex](/docs/Latex)) or a [TextFigure](/docs/TextFigure) with a size keeps its size. Any other element spans the slot at its aspect. A child's `scale` sets its size relative to the stack's em, which is how headings and captions are made, and a child's own `align` places it in its slot in place of the stack's `justify` or `valign`.

A column offers its `width` to every child and is as tall as they come to, `gap` em apart. With no width it lays the children out at their own sizes and is as wide as the widest. Given a `height`, it is a budget: the children sized by the width are laid out first, and what is left is split evenly among the height-flexible ones (an element with an aspect and no size of its own, a [TextFigure](/docs/TextFigure) without a `width` or `height`, or a nested stack holding one), each sized to its share instead of spanning the width. This is how a [Slide](/docs/Slide) fits a figure to its frame. The column's box is its content.

A row offers slots along its `width`: children with a size of their own keep it and the rest share what is left, or `sizes` splits the width as given. With no width, every child is at its own size. A `height` is handed down to a nested stack to budget and sizes a bare element to it at its aspect, no wider than the row. The children align across the row by `valign`: their tops, or `anchor` for their anchors (the axis of a text block's first line, or of a formula), their middles, or their bottoms. A row narrower than its width is placed along it by `justify`.

A child with a `stack-size` is that long along the stack in em (tall in a column, wide in a row), spans the stack across, and is fit inside that box by its aspect: a way to give a bare element a size without a [TextFigure](/docs/TextFigure).

Child parameters:
- `stack-size` = `null` — the child's length along the stack, in em
- `align` — where the child sits in its slot, in place of `justify` or `valign`
- `scale` — the child's em over the stack's

Parameters:
- `children` — the blocks to stack: text, lists, formulas, figures, other stacks, or any element
- `direc` = `'v'` — the direction of stacking: `v` or `h`
- `width` — the width in em: what a column offers its children, or the length a row's slots divide; sets the size of the text
- `height` — the height in em: a column's budget, or what a row hands its children
- `gap` = `0.5` — the space between children in em
- `scale` = `1` — the size of the stack relative to the surrounding text's em
- `justify` = `'left'` — where a child narrower than a column sits, or where a row narrower than its width sits along it; also the text alignment handed to the children
- `valign` = `'top'` — how a row's children align across it: `top`, `anchor`, `center`, or `bottom`
- `sizes` — the share of a row's width each child gets, as a list of weights; with it, every child is a flex child
- `font-family`/`font-weight`/`font-style` — font settings for the text children
- `text-*` — additional arguments forwarded to the text children
