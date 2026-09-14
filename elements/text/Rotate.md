# Rotate

*Category*: layout

Rotate a completed child by angle degrees (positive clockwise). origin defaults
to center and accepts an alignment value or `{x,y}` / `[x,y]` pair. The child is measured
naturally; give finite canvases their own dimensions.

| Property | Default | Meaning |
|---|---|---|
| angle | `0` | Clockwise rotation in degrees |
| origin | `"center"` | Point in the child used as the rotation origin |
| resize | `true` | Resize and translate the wrapper to the rotated bounds |

resize defaults to true: the rotated allocation sets natural size and shifts
into positive coordinates. resize=false retains the original frame and reports
overflow. Exact outer allocations still win. Rotation transforms geometry,
strokes, and text; it does not reflow content or propagate baseline guides.
