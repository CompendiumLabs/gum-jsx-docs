# Network

*Category*: networks

| Property | Default | Meaning |
|---|---|---|
| `children` | — | Identified elements, direct **Edge** children, and ordinary graph content |
| `coord` | Inferred | `[xmin, ymin, xmax, ymax]` shorthand for both limits |
| `xlim` / `ylim` | Inferred | Directed data limits, as in **Graph** |
| `flip-x` / `flip-y` | `false` / `true` | Horizontal reversal and Cartesian y-up mapping |
| `padding` | `0.2` | Fraction of each inferred span added on either side |
| `clip` | `false` | Clip painting to the network canvas |

**Network** lays out and places its nodes before connecting them with
[Edge](./Edge.md). Any element with an `id` is a node: a [Node](./Node.md) label,
a [Circle](./Circle.md), an image, a stack, or a whole nested Network. Give each
one a unique `id`, and use that ID in an edge's `start` and `end`. Edges may
appear before their nodes in the source. Source order remains paint order; put
edges first to paint them behind nodes.

Edges meet the visible outline of boxes, frames, rectangles, squares, circles,
and ellipses, including rounded corners. Every other element connects at the
rectangle of its allocation. A [TitleFrame](./TitleFrame.md)'s outline spans its
overhanging title, so an edge from above meets a centered title. Only Node defaults to a centered anchor, so set
`anchor="center"` on other elements to position them by their centers.

Node positions use data coordinates. Fonts, frame padding, borders, and arrowheads
use ordinary px/em/fractional layout lengths. Changing the canvas size moves the
nodes while their labels retain their font size; an explicit node width can wrap
its label. Edges attach to the resulting frame after that wrapping finishes.

Sizing and coordinate options follow [Graph](./Graph.md): a natural network is
480×320, finite offers establish the canvas, and an aspect derives a missing axis.
Inference includes the numeric x/y of each child, intermediate edge points, and graphable marks.
Inferred padding is a fraction of the data span, so it does not reserve a measured
margin for every label. Use explicit limits or surrounding **Box** padding when
you need a particular margin. Use explicit limits for nodes inside nested layouts.

Nodes can be inside **Box**, **Rotate**, stacks, or other ordinary layout
elements. Network finds their completed connection boundaries through the
placement tree, including all offsets and transforms. See
[Connections through layout](../../gallery/text/network_connections.md).
An identified container stays transparent, so edges can reach both a group and
the identified elements inside it. Each nested Network has its own ID scope: its
own `id` makes it a single node of the outer network, while its members stay
private. Duplicate IDs within one scope and unknown edge endpoints are errors.

Ordinary children work as they do in Graph. Clipping hides paint while retaining
overflow and the nodes' connection geometry. Network connects the positions you
provide; it does not automatically arrange nodes or avoid intervening obstacles.
