# TitleFrame

*Category*: text

*Inherits*: [Frame](/docs/Frame) > [Box](/docs/Box) > [Element](/docs/Element)

A [Frame](/docs/Frame) with a title on its top border: a [TextFrame](/docs/TextFrame) at the text size (or `title-scale` times it), centered on the border with the border cut away behind it. The title can be a string or an element. The frame's top margin is at least the title's upper half and its top padding at least the lower half, so the title runs into neither the frame's edge nor its content. **TitleBox** is the same without the border.

Parameters:
- `title` — the text or element to use as the title
- `title-scale` = `1` — the title's em over the frame's
- `title-padding` = `[0.6, 0.3]` — the padding inside the title box, in em of the title
- `title-rounded` = `10` — the corner radius of the title box, in stroke units
- `title-fill` — a background for the title box; the border is cut away behind it regardless
- `border` = `1` — the frame's border width in stroke units
- `padding`, `margin`, `rounded`, `fill`, `aspect`, `width`, `height` — as for [Box](/docs/Box)

Subunits:
- `title` — the title element
