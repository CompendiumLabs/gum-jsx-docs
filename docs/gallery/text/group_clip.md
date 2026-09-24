---
category: layout
description: "The root's fit prop hugs both panels and keeps them side by side at smaller sizes, including the padding that protects the intentionally unclipped artwork."
---

# Clipped and unclipped canvases
Both canvases use an `em(11.25)` width and a `1.8` aspect ratio, and query the same
immutable artwork with fractional positions and dimensions. The left canvas retains
all paint; the right clips it to the canvas rectangle. Clipping changes visible
ink while the fragment tree still records the full positioned allocations and
overflow.

The root's `fit` prop hugs both panels and keeps them side by side at smaller sizes,
including the padding that protects the intentionally unclipped artwork.

Use tree output with `--stats` to inspect reuse of the shared child fragments.
See [Group](../../elements/text/Group.md) for canvas clipping,
[Box clipping](./box_clip.md) for rounded borders, and
[Reusing fragments](./repeated.md) for explicit placement reuse.
