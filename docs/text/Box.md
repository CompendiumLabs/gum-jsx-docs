# Box

*Category*: layout

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

A box around its content: `padding` inside the border and `margin` outside it, both in em, plus an optional border and background. Mirroring CSS, padding is space inside the border and margin is space outside it. **Box** has no border by default; **Frame** is the same with `border = 1`, and [TextBox](/docs/TextBox) and **TextFrame** are the same classes again with a default padding for a box around text.

The content is the children with no rect of their own, elements all: text goes in a [Text](/docs/Text), or use a [TextBox](/docs/TextBox), which sets strings as text itself. The box's `font-*` and `text-*` settings and a `justify` reach text content. The box hugs its content plus the padding. Given a size by its parent (the root, a stack, or another box), the content is laid out for the area inside the padding: a column keeps its text size and hugs its height, a figure spans the width, a paragraph wraps to it. So wrapping something in a box does not change what is inside it. A `width` or `height` of its own is the box's outer size, which it spans, the content sitting in the area by `justify` and `valign` (centered by default).

An `aspect` makes the box a figure of that shape: sized by what it is offered, with the content fit into the area as any figure's content is (text that does not fit at its size scales down), or grown around its content when nothing is offered. `flex` fills the offer instead. Children at a rect of their own (by `pos`, `rect` and the like) are placed relative to the area inside the padding, as in a [Group](/docs/Group), and a child with metrics placed by `pos` alone sits there at its own size, which is how a [TitleFrame](/docs/TitleFrame) puts its title on the border.

Padding and margin take a scalar, `[horizontal, vertical]`, or `[left, top, right, bottom]`; `true` is the default. The border and the corner radii are in stroke units, so boxes of different sizes share one look.

Parameters:
- `padding` = `0` — the space between the content and the border, in em; `true` for `0.5`
- `margin` = `0` — the space outside the border, in em; `true` for `0.5`
- `border` — the border width in stroke units; `true` for `1` (the **Frame** default)
- `rounded` — corner radius in stroke units, per corner as for [RoundedRect](/docs/RoundedRect); `true` for `10`
- `fill` — the background color
- `shape` — the element drawn as the border and background, a rectangle by default
- `clip` — clip the content to the border shape (`true`), or to an element
- `aspect` — the shape of the framed box; `true` for square
- `flex` — fill the size given rather than taking the content's shape
- `justify` — the text alignment, and where content narrower than the area sits
- `valign` — where content shorter than a box of a `height` of its own sits (default: `center`)
- `width`/`height` — the box's outer size in em, which it spans
- `scale` — the box's em over its parent's, as for [Text](/docs/Text)
- `font-family`/`font-weight`/`font-style` and `text-*` — settings for text content, as for [Text](/docs/Text)

Subunit names:
- `border` — attributes for the border, such as `stroke` or `stroke-dasharray`
- `fill` — attributes for the background
