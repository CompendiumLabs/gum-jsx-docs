# TextFigure

*Category*: text

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

An element given a size in em, with an optional caption below it, so a plot or a diagram can sit among text at a known size. A `height` (or a `width`) sets the figure's size, with the other dimension following from the element's aspect. In a [TextCol](/docs/TextCol) the figure takes the column's width with the element fit inside it by its aspect and placed by `justify`; in a [TextRow](/docs/TextRow) a figure with a `height` keeps its size.

The caption is a string, set as a [Text](/docs/Text) as wide as the figure, or an element carrying em metrics, a [Tex](/docs/Latex) label say. Arguments prefixed `caption-` go to a text caption, so `caption-scale={0.8}` makes it smaller than the surrounding text.

Parameters:
- `children` — the one element to size
- `height` — the height of the figure in em
- `width` — the width of the figure in em
- `scale` = `1` — the size of the figure relative to the surrounding text's em
- `caption` — a string or element placed below the figure
- `gap` = `0.3` — the space between the figure and its caption in em
- `justify` = `'center'` — where the element and caption sit in a wider figure
- `caption-*` — arguments forwarded to a text caption
