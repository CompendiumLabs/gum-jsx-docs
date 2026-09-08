# TextBox

*Category*: text

*Inherits*: [Box](/docs/Box) > [Group](/docs/Group) > [Element](/docs/Element)

A [Box](/docs/Box) with the default for a box around text: `padding` of `0.4` em unless given. Everything else is as for **Box**: strings are set as text with the box's font settings; one element (a formula, a [TextCol](/docs/TextCol), a [TextFigure](/docs/TextFigure)) is boxed as it is; the box hugs its content and lays it out for the width it is given, so text wraps inside the padding; and `width`, `height`, `aspect`, `justify` and `scale` work the same way. **TextFrame** is the same with `border = 1`.

Parameters: as for [Box](/docs/Box), with `padding` = `0.4` and `margin` = `0` (`true` for `0.4`).
