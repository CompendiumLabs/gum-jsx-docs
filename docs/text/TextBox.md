# TextBox

*Category*: text

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

A box drawn around text, or around one element carrying em metrics: a formula, a [TextCol](/docs/TextCol), a [TextFigure](/docs/TextFigure). The box is as big as its content plus `padding` and `margin`, which are in em, and its corners are rounded in em too, so a badge or a card is the same shape at any size. **TextFrame** is the same with `border = 1`.

Given a `width` (its own, or handed down by a column) the box is that wide and the text wraps inside the padding; `hug` tightens a box whose text fits on one line to that line, so a badge in a column does not span it. An `aspect` widens (or heightens) the box around the content, which is centered in it.

Parameters:
- `children` — the text, or one element with metrics
- `padding` = `0.4` — the space between the content and the frame, in em, as a scalar, `[horizontal, vertical]`, or `[left, top, right, bottom]`; `true` for the default
- `margin` = `0` — the space outside the frame, in em; `true` for `0.4`
- `border` — the frame's stroke width; `true` for `1`
- `fill` — the background color
- `rounded` — the corner radius in em, per corner as for [RoundedRect](/docs/RoundedRect); `true` for `0.3`
- `aspect` — an aspect for the box to grow to; `true` for square
- `hug` = `false` — tighten a one-line box to its line
- `width`/`scale` — the text size, as for [Text](/docs/Text); `width` is the box's outer width
- `justify` = `'left'` — the text alignment
- `border-*`/`fill-*` — arguments for the frame and the background
- `font-family`/`font-weight`/`font-style` and `text-*` — as for [Text](/docs/Text)
