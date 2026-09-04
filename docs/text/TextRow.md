# TextRow

*Category*: text

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

A row of text blocks side by side, `gap` em apart. Given a `width`, children that carry a size of their own keep it (a [Text](/docs/Text) or [TextCol](/docs/TextCol) with a `width`, a [TextFigure](/docs/TextFigure) with a `height`, a formula) and the rest share what is left; or `sizes` splits the width as given. Without a width, the row is as wide as its children laid out at their own sizes. Given a `height` to fill, a child with an aspect but no size of its own (a plot or a framed element, or a [TextFigure](/docs/TextFigure) without a `width` or `height`) is made that tall at its aspect, no wider than the row, and keeps that width like a fixed child; a nested row or column is handed the height to budget among its own children. A [Slide](/docs/Slide) gives its column the height of its content area, so a figure beside text fills the slide's height and the text takes what is left.

Children align by their tops, or by `valign` their anchors (the first line's axis, so two columns of text share a first line), their middles, or their bottoms. A row narrower than its width is placed by `justify`, which is also the text alignment handed to the children.

Parameters:
- `children` — the blocks to put side by side
- `width` — the width of the row in em
- `height` — the height in em to size figures without a size of their own to
- `sizes` — the share of the width each child gets, as a list of weights; with it, every child is a flex child
- `scale` = `1` — the size of the row relative to the surrounding text's em
- `gap` = `1` — the space between children in em
- `valign` = `'top'` — how the children align vertically: `top`, `anchor`, `center`, or `bottom`
- `justify` = `'left'` — where a row narrower than its width sits, and the text alignment handed to the children
- `font-family`/`font-weight`/`font-style` — font settings for the text children
- `text-*` — additional arguments forwarded to the text children
