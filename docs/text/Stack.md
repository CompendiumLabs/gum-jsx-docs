# Stack

*Category*: layout

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

Stack elements vertically or horizontally. **VStack** and **HStack** are the two directions, and [TextCol](/docs/TextCol) and [TextRow](/docs/TextRow) are the same stack with text's defaults. One stack serves figures, text and math: every child is laid out for its slot in the stack's em (the size of the text in it) by what it is, and the stack reports its own box in em, so stacks nest.

A figure (an element with an aspect) spans a column's width, or takes a row's height when the row has one; text wraps to its slot; a formula keeps its size; an element with neither an aspect nor content (a plot, a bare rectangle) fills what is left. A child with a `width` or `height` of its own, in em, keeps it, and one with a `share` gets that fraction of the stack's length. A child with `fit` is scaled to its slot like a figure, which is how a title is made to scale with the figure under it.

A column hands its width to every child and is as tall as they come to. Given a `height` too, it is a budget: the content (text, formulas) is laid out first, and what is left goes to the children that can use it, a bare element filling it and figures splitting it evenly, each fit inside its share. A column over its budget takes the height out of its figures, never its text. Without a width, the column is as wide as its widest child laid at its own size, and a stack with no `width` of its own hugs its children across the axis: the width offered to it is what they may take, not what the stack is.

A row gives children with a size of their own their width, sizes figures by its height when it has one, and splits the rest evenly among the others, each clamped to what it can use, so a one-line text takes only its line and a paragraph its share. Given both a width and a height, a figure gives way from the height toward its fair share of the width until the text beside it fits. Without a width, every child is at its natural size for the height. Children align across the row by `valign`, or by an `align` of their own.

`spacing` is space between children as a fraction of the stack's length, the unit of a stack of figures, which stays scale-free; `gap` is space in em. A `Spacer` with neither fills what is left, like a bare element.

Child parameters:
- `width`/`height` — a size of the child's own, in its em
- `share` — the child's fraction of the stack's length along the axis (half means half)
- `fit` — scale the child (text, a formula, a list) to its slot like a figure
- `align` — where the child sits in its slot, in place of the stack's `justify` or `valign`
- `scale` — the child's em over the stack's

Parameters:
- `direc` = `'v'` — the direction of stacking: `v` or `h`
- `width`/`height` — the stack's size in em: what a column offers its children or a row divides; a column's `height` is a budget
- `gap` = `0` — the space between children in em
- `spacing` = `0` — the space between children as a fraction of the stack's length; `true` for `0.1`
- `even` = `false` — give every child an equal share
- `justify` = `'center'` — where a child narrower than a column sits, or where a row narrower than its width sits along it; also the text alignment handed to the text children
- `valign` = `'center'` — how a row's children align across it: `top`, `anchor` (their first lines' math axes), `center`, or `bottom`
- `anchor` = `'first'` — where the stack's own anchor line is: its first child's, or `center` for its middle
- `scale` = `1` — the size of the stack relative to the surrounding em
- `font-family`/`font-weight`/`font-style` and `text-*` — settings handed to the text children
