---
category: layout
description: "Rotate a measured child around a chosen alignment point."
---

# Rotate

Rotate a completed child by angle degrees (positive clockwise). origin defaults
to center and accepts an alignment value or `{x,y}` / `[x,y]` pair. The child is measured
naturally; give finite canvases their own dimensions.

| Property | Default | Meaning |
|---|---|---|
| `angle` | `0` | Clockwise rotation in degrees |
| `origin` | `"center"` | Point in the child used as the rotation origin |
| `resize` | `true` | Resize and translate the wrapper to the rotated bounds |

resize defaults to true: the rotated allocation sets natural size and shifts
into positive coordinates. `resize=false` retains the original frame and reports
overflow. Exact outer allocations still win and keep the transformed bounds
centered in that frame. Rotation transforms geometry,
strokes, and text; it does not reflow content. Horizontal guides survive zero
and half turns. Other rotations tilt the baseline, which has no single vertical
coordinate; the wrapper omits it while the original child's guides remain intact.
