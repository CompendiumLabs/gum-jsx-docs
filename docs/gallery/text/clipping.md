---
category: api
description: "This example uses the low-level fragment API from Custom elements."
---

# Clipping and transforms
The three placements show an original rectangle, a clipped fragment, and an
affine transform of that same clipped fragment. Clipping restricts painted ink
while preserving the child's allocation and overflow in the fragment tree.
The two clipped placements share their clip definition in SVG output.

This example uses the low-level fragment API from [Custom elements](../../guides/text/custom_elements.md).
For ordinary composition, use [Box clipping](./box_clip.md),
[Group clipping](./group_clip.md), or [TransformBox](../../elements/text/TransformBox.md).
