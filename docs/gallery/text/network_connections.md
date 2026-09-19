# Connections through layout

*Category*: networks

[Network](../../elements/text/Network.md) connects the completed frames of its
nodes. The example fits one Node inside a larger allocation, pads another, and
rotates a third. Debug outlines show the allocations; the arrows meet the actual
node borders inside them.

The network's aspect keeps a tall preview from stretching the routes excessively.
A minimum width reserves space for its labels; smaller bounded previews scale
the completed diagram down.

Put positioning props on each outer wrapper. The Node's `id` stays on the framed
label inside it. Explicit network limits make these nested layouts' positions
independent of coordinate inference.

During layout, each element with an `id` records an immutable `connection` with
its ID and `boundary`, in its own local pixels. Boxes and basic shapes report their
rounded or elliptical outline; other elements report their allocation. Network walks completed
placements and composes their offsets and transforms. It computes ports on those
local boundaries and transforms the ports and normals into network pixels before
building the arrows. It never substitutes a rotated node's enclosing rectangle
for its outline.

Custom elements get an allocation boundary from their `id` automatically. They can
refine it with `make_fragment({ size, ...frame_connection(props.id, boundary) })`. The boundary may be
smaller than the allocation or have a nonzero origin. It accepts the same pixel
rectangle and corner radii as `make_clip`. The metadata does not add any paint.
Identified containers remain transparent to the search; a nested Network sets
`connection_scope` so its node IDs stay local. Singular transforms cannot provide attachment ports
and produce a layout error when referenced by an edge.
