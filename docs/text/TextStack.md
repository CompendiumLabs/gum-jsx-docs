# TextStack

*Category*: text

*Inherits*: [Stack](/docs/Stack) > [Group](/docs/Group) > [Element](/docs/Element)

A [Stack](/docs/Stack) with text's defaults: a column half a line apart with its children flush left, or a row (`direc="h"`) one em apart with its children aligned by their tops. [TextCol](/docs/TextCol) and [TextRow](/docs/TextRow) are its two directions. Everything else, including how figures, formulas and lists are placed, a child's `width`, `height`, `share` and `fit`, and a column's height budget, is as for [Stack](/docs/Stack).

Parameters:
- `direc` = `'v'` — the direction of stacking: `v` or `h`
- `gap` = `0.5` for a column, `1` for a row — the space between children in em
- `justify` = `'left'` — where a child narrower than a column sits, and the text alignment handed to the children
- `valign` = `'top'` — how a row's children align across it
- other parameters as for [Stack](/docs/Stack)
