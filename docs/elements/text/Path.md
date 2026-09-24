---
category: geometry
description: "Path draws a sequence of explicit path commands."
---

# Path

| Property | Default | Meaning |
|---|---|---|
| `commands` | `[]` | **Path** command records or arrays returned by the path helpers |

**Path** draws a sequence of explicit path commands. Supply `commands`, not an SVG
d string. The following helpers are available in JSX and exported by core:

| Helper | Meaning |
| --- | --- |
| `move_to(x, y)` | Start a subpath at a point |
| `line_to(x, y)` | Straight segment to a point |
| `quad_to(x1, y1, x, y)` | Quadratic Bézier with one control point |
| `curve_to(x1, y1, x2, y2, x, y)` | Cubic Bézier with two control points |
| `close_path()` | Close the current subpath |

The first command of a nonempty path must be move_to. Coordinates are absolute
within the **Path**'s own rectangle, not relative displacements. Fractions use its
width and height, including for control points. px and em work too. A new
move_to starts another subpath in the same drawing.

```jsx
<Path width={px(240)} height={px(100)}
  commands={[move_to(0, 0.8), curve_to(0.3, 0, 0.7, 1, 1, 0.2)]}
  fill={none} stroke={green} stroke-width={px(3)} />
```

Layout follows ordinary shape sizing, not the bounds of the commands. The
same normalized path can be stretched by choosing another allocation. For
aspect-preserving geometry, supply a size/aspect or set [fit](../../guides/text/sizing.md#fitting) on a sized **Path**.
Paint is inherited; an open path with a fill still has SVG's implicitly closed
fill area. Set `fill={none}` for an unfilled curve.

Only move, line, quadratic, cubic, and close commands are implemented. SVG arc
commands, path-string parsing, and automatic spline construction are not part
of the current API.
