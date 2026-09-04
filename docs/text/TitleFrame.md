# TitleFrame

*Category*: text

*Inherits*: [Frame](/docs/Frame) > [Element](/docs/Element)

A special type of [Frame](/docs/Frame) that places a title element in a box centered on the line at the top of the frame. The title element can be either a proper Element or a string, in which case it will be wrapped in a [Text](/docs/Text) element.

Parameters:
- `title` — the text or element to use as the title
- `title-size` = `0.1` — the height of the title box as a fraction of the frame's
- `title-padding` = `[0.6, 0.3]` — the padding inside the title box, in em of the title
- `title-rounded` = `0.3` — the corner rounding of the title box, in em of the title
- `adjust` = `true` — whether to adjust the padding and margin to account for the title element
- `border` = `1` — the outer frame border width to use

Subunits:
- `title` — the title element
