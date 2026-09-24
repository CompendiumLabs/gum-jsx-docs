---
category: layout
description: "Transform a naturally measured child using an affine matrix [a,b,c,d,e,f]: x′=ax+cy+e, y′=bx+dy+f."
---

# TransformBox

Transform a naturally measured child using an affine matrix [a,b,c,d,e,f]:
x′=ax+cy+e, y′=bx+dy+f. Default is identity. A canvas child needs its own finite
dimensions.

| Property | Default | Meaning |
|---|---|---|
| `matrix` | `[1, 0, 0, 1, 0, 0]` | Affine transform `[a,b,c,d,e,f]` |
| `resize` | `true` | Resize and translate the wrapper to the transformed bounds |

resize defaults to true: transformed bounds set natural size, translated to
the local origin. `resize=false` keeps the original frame and reports overflow.
Exact allocations override wrapper size and center the transformed bounds in
that frame. The finished geometry, including
fonts and strokes, is transformed. [Rotate](./Rotate.md) provides angles and
[fitting](../../guides/text/sizing.md#fitting) fits content into an offer.

Named vertical guides, including baseline and math axis, transform when `b` is
zero and a horizontal line stays horizontal. A transform that tilts those lines
omits the wrapper's guides; the placed child's original guides remain available.
