# TextBox

*Category*: text

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

A box drawn around text, or around one element: a formula, a [TextCol](/docs/TextCol), a [TextFigure](/docs/TextFigure). The box hugs its content plus `padding` and `margin`, which are in em, so a badge in a column does not span it; given a `width` or `height` of its own it spans that instead, and a row or grid that hands it a slot as its width does the same. Its border and corner radii use stroke units, so text frames can share the same rounding even with different text sizes or numbers of lines. **TextFrame** is the same with `border = 1`.

Text wraps inside the padding at the width the box has or is offered. An `aspect` widens (or heightens) the box around the content, which is placed in it by `justify`.

Parameters:
- `children` — the text, or one element
- `padding` = `0.4` — the space between the content and the frame, in em, as a scalar, `[horizontal, vertical]`, or `[left, top, right, bottom]`; `true` for the default
- `margin` = `0` — the space outside the frame, in em; `true` for `0.4`
- `border` — the frame's stroke width; `true` for `1`
- `fill` — the background color
- `rounded` — the corner radius in stroke units, per corner as for [RoundedRect](/docs/RoundedRect); `true` for `10`
- `aspect` — an aspect for the box to grow to; `true` for square
- `width`/`height` — the box's outer size in em, which it spans
- `scale` — the text size, as for [Text](/docs/Text)
- `justify` = `'left'` — the text alignment, and where content narrower than the box sits
- `border-*`/`fill-*` — arguments for the frame and the background
- `font-family`/`font-weight`/`font-style` and `text-*` — as for [Text](/docs/Text)
