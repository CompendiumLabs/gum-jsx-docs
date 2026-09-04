# Network

*Category*: networks

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

Network diagrams can be created using the [Node](/docs/Node) and [Edge](/docs/Edge) classes. This automatically processes Node and Edge children to create a network diagram. It will also display non-network elements as they would be displayed in a [Graph](/docs/Graph).

An `em`, in coordinate units, sets the text size of the whole diagram: it goes to the nodes, which size their boxes from their labels (see [Node](/docs/Node)), and, as on any [Group](/docs/Group), to any other child with metrics (a [Text](/docs/Text) label, a formula) placed by `pos` without a size of its own, which is made its em height times `em` tall. Without one, node text is fit into boxes of `node-ysize` and labels need a `ysize` each.

You can specify the internal coordinate system using the `coord` argument, which is a 4-element array specifying the position of the bottom left corner and the width and height of the coordinate system. For example, `coord: [0, 0, 1, 1]` specifies the unit square. If `coord` is not specified, it will be inferred from the processed node bounds together with any intermediate edge points.

Parameters:
- `em` — coordinate units per em, the text size for the nodes and labels
- `coord` — the internal coordinate system to use

Subunits:
- `node` — arguments applied to all nodes
- `edge` — arguments applied to all edges
