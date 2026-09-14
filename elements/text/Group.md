# Group

*Category*: layout

A finite canvas for independently positioned children. **Group** establishes its
size before measuring content; it does not hug the bounds of positioned children.
It fills finite offers, accepts its own dimensions, and can derive one missing
dimension from aspect.

Both axes need finite sizing information. One dimension plus an aspect is enough;
aspect alone is not. For example, a **Group** in a naturally measured stack often
needs its own width/height or a dimension plus aspect.

The coordinate origin is top left, with positive x right and positive y down.
Children paint in source order, so put backgrounds and connectors before labels.

| Property | Default | Meaning |
|---|---|---|
| `clip` | `false` | Clip child paint to the **Group** rectangle |

| Direct child prop | Default | Meaning |
|---|---|---|
| `x` / `y` | `0` | **Anchor** location; fractions use the whole **Group** |
| `anchor` | `"start"` | Point on the child's allocated rectangle placed at x/y |
| `width` / `height` | — | Child's preferred size; fractions use the whole **Group** |

**Anchor** accepts start, center, end, a fraction from 0 to 1, or independent x/y
choices in an object or two-entry tuple. `anchor={[1, 0.5]}` and
`anchor={['end', 'center']}` both place
the right-edge midpoint at x/y. A missing object axis defaults to start.
**Anchor** values are dimensionless; px/em and stretch are not anchor values.

**Anchor** describes the element's attachment point for its parent. Its own
`align` or `justify` describes how it arranges its children. For example, a
**Box** can use `anchor={[0.5, 0.5]}` to center itself at x/y and `align="end"`
to place its content at the **Box**'s bottom-right corner.

Every child receives an offer for the whole canvas, not only the space to the
right/below its position. Give positioned shapes a width or height when they
should be smaller than the canvas. A shape's internal points still refer to that
shape's own rectangle; **Group** does not provide arbitrary data-coordinate ranges.

**Text** without its own dimensions sizes to its content, wrapping at the canvas
width if needed. Give it a width for a narrower label or region. Position lengths
in em use the child's font size.
Nested **Group**s establish new local canvases.

Set `clip` on **Group** to hide content outside its rectangle. Clipping defaults to
false and does not erase reported overflow. **Svg** still clips at the outer viewport.

**Group** uses local fractional x/y/anchor positions; **Graph** uses data positions and
**Overlay** places decorations relative to a measured base. **Box** and stacks use their
own placement rules. Use [Graph](./Graph.md) for data limits and [Rotate](./Rotate.md)
or [TransformBox](./TransformBox.md) for explicit transforms. **Group** does not infer
data limits or perform node/edge lookup.
