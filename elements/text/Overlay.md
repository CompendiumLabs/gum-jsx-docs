# Overlay

*Category*: layout

The first child determines natural size. Other children are decorations:
they receive that established canvas and use Group-style x/y/anchor placement.
They contribute ink and overflow without enlarging the allocation. Source order
is paint order; clip hides outside ink. Unlike Group, Overlay can hug its base.

| Property | Default | Meaning |
|---|---|---|
| clip | `false` | Clip every layer to the base child's frame |

[Runnable source](../code/Overlay.jsx).
