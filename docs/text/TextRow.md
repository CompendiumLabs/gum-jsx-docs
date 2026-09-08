# TextRow

*Category*: text

*Inherits*: [TextStack](/docs/TextStack) > [Stack](/docs/Stack) > [Group](/docs/Group) > [Element](/docs/Element)

A horizontal [Stack](/docs/Stack) with text's defaults: a row of text blocks side by side, `gap` em apart (one em). Given a `width`, children with a size of their own keep it (a [Text](/docs/Text) or [TextCol](/docs/TextCol) with a `width`, a [TextFigure](/docs/TextFigure) with a `height`, a formula) and the rest split what is left evenly, each clamped to what it can use: a one-line text takes only its line, a paragraph its full share, and a child with a `share` its fraction of the width. Without a width, the row is as wide as its children laid out at their own sizes.

Given a `height`, a figure without a size of its own (a plot with an aspect, a framed element, a [TextFigure](/docs/TextFigure) without a `width` or `height`) is made that tall at its aspect, and given a width too it gives way from that toward its fair share of the width until the text beside it fits the height. A nested row or column is handed the height to budget among its own children. A [Slide](/docs/Slide) gives its column the height of its content area, so a figure beside text fills the slide's height and the text takes what is left.

Children align by their tops, or by `valign` their anchors (the first line's axis, so two columns of text share a first line), their middles, or their bottoms; a child with an `align` of its own (`align="bottom"` on one text block, say) is placed by that instead. A row narrower than its width is placed by `justify`, which is also the text alignment handed to the children.

Parameters:
- `children` — the blocks to put side by side
- `width` — the width of the row in em
- `height` — the height in em to size figures without a size of their own to
- `scale` = `1` — the size of the row relative to the surrounding text's em
- `gap` = `1` — the space between children in em
- `valign` = `'top'` — how the children align vertically: `top`, `anchor`, `center`, or `bottom`; a child's own `align` overrides it for that child alone
- `justify` = `'left'` — where a row narrower than its width sits, and the text alignment handed to the children
- `font-family`/`font-weight`/`font-style` — font settings for the text children
- `text-*` — additional arguments forwarded to the text children
- child `width`/`height`/`share`/`fit` — as for [Stack](/docs/Stack)
