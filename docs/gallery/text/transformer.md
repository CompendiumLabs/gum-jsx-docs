# Transformer Architecture

*Category*: networks

A decoder-only transformer diagram. Read upward from
input tokens through embeddings, the repeated attention/feed-forward layer,
linear projection, and softmax to output probabilities. The dashed return route
and `× N` label indicate repetition of the framed layer, not a residual connection.

[VStack](../../elements/text/VStack.md) places the blocks with explicit heights
and gaps. The repeated layer is another stack inside a rounded frame.
[Network](../../elements/text/Network.md) discovers the completed
[Node](../../elements/text/Node.md) boundaries through both stacks and connects
them with [Edge](../../elements/text/Edge.md), so the main arrows need no manually
calculated endpoints. Nodes can wrap longer labels when given more height.

The repetition route has two waypoints calculated from the block heights, gaps,
and frame padding, keeping its arms horizontal and its `× N` label centered.
Network does not provide obstacle avoidance or edge-label placement; this route
calculation needs adjustment if the stack's structure changes.

Blocks use explicit pixel widths and heights. The `radius`, `head-size`, and
`head-curve` props control rounded corners and arrowheads. Color interpolation
supplies pastel block fills.

The root's [fit prop](./Sizing.md#fitting) scales the completed scene down to
the host's offer, preserving the relationships between blocks, arrows, and labels.
No viewport size is required around the example.

[View the source](../code/transformer.jsx).
