# Any element as a node

*Category*: networks

[Network](../../elements/text/Network.md) treats every element with an `id` as a
node. [Node](../../elements/text/Node.md) is only the conventional labeled frame.
The example connects a circle, a pill-shaped rectangle, a stack, one member of
that stack, and a frame that holds a nested network.

Edges meet the visible outline of boxes and basic shapes, so the arrows touch the
circle's arc and the pill's rounded ends. The stack draws nothing of its own, and
its edges meet the rectangle of its allocation instead.

An identified container stays transparent. The `stack` ID addresses the whole
column, while `second` still addresses the frame inside it. A nested Network is
different: it keeps its node IDs private, so the outer network can reach the
identified frame around it but not `a` or `b`.

Only Node defaults to a centered anchor. Set `anchor="center"` on other elements
to position them by their centers.
