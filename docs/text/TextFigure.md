# TextFigure

*Category*: text

*Inherits*: [Stack](/docs/Stack) > [Group](/docs/Group) > [Element](/docs/Element)

An element with an optional caption below it, as a column, so a plot or a diagram can sit among text with a caption at the text's size. A `height` (or a `width`) sets the element's size in em, with the other dimension following from its aspect, and the figure keeps that size wherever it goes, sitting in the middle of a [TextCol](/docs/TextCol) unless its `align` says otherwise. Without a size, the element spans a column's width at its aspect, or takes the height a budget leaves it, the caption keeping its size; in a [TextRow](/docs/TextRow) with a `height` it is made that tall.

The caption is a string, set as a [Text](/docs/Text) as wide as the figure, or an element carrying em metrics, a [Tex](/docs/Latex) label say. Arguments prefixed `caption-` go to a text caption, so `caption-scale={0.8}` makes it smaller than the surrounding text.

Parameters:
- `children` — the one element to size
- `height` — the height of the element in em
- `width` — the width of the element in em
- `scale` = `1` — the size of the figure relative to the surrounding text's em
- `caption` — a string or element placed below the element
- `gap` = `0.3` — the space between the element and its caption in em
- `justify` = `'center'` — where the element and the caption sit in the figure's width, and the caption's text alignment
- `align` = `'center'` — where the figure sits in a column's slot
- `caption-*` — arguments forwarded to a text caption
