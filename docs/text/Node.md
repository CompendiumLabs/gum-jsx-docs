# Node

*Category*: networks

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

A framed label at a position, the building block of a [Network](/docs/Network). If the `children` argument is a string, it is wrapped in a [Text](/docs/Text) element. You must provide an `id` argument to reference the node in an [Edge](/docs/Edge) element.

Given an `em` (coordinate units per em, usually set once on the Network), the box is sized from its label: a [TextFrame](/docs/TextFrame) hugging the text, or an element with metrics such as a formula or a [TextCol](/docs/TextCol), with `padding` in em. The node is then its em height times `em` tall, so every node in the network shares one text size and a label wrapped at `width` makes a taller node rather than smaller text. A `ysize` still overrides the height for a single node, and a child without metrics (a shape, a stack) is framed by `ysize` as below.

Without an `em`, the node is a [Frame](/docs/Frame) of the given `ysize` with the label fit into it, so the text size follows from the box and the number of lines, and `padding` is a fraction of the box. In both cases, `rounded` uses stroke units and does not change with the node's size.

Parameters:
- `id` — a string to be used as the node identifier
- `children` — the element or text to be enclosed in the node box
- `em` — coordinate units per em; sizes the box from the label
- `ysize` = `0.2` — the height of the node box (width will adjust to aspect); with an `em` it follows from the label unless given
- `padding` = `0.1` — the padding of the node box, as a fraction of it; with an `em` it is in em and defaults to `0.4`
- `border` = `1` — the border width of the node box
- `rounded` = `10` — the corner radius of the node box, in stroke units
- `fill` — the fill color of the node box
- `width` = `null` — the width (in ems) to wrap the text at (if `null`, the text will not be wrapped)
- `justify` = `'center'` — the horizontal justification of the text
