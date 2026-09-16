# Line

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| `from` | `[0, 0]` | Segment start in the **Line**'s local rectangle |
| `to` | `[1, 1]` | Segment end in the **Line**'s local rectangle |

**Line** draws one segment from `from` to `to`, each an `{ x, y }` or `[x, y]` pair of lengths.
The defaults are `[0, 0]` and `[1, 1]`: the diagonal of its own
allocated rectangle. Fractions use that rectangle's width and height, not the
parent's size.

```jsx
<Line width={px(200)} height={px(40)}
  from={[0, 0.5]} to={[1, 0.5]}
  stroke={green} stroke-width={px(4)} stroke-linecap="round" />
```

**Line** always disables fill. It otherwise inherits stroke color, width, and cap
style; caps may be butt, round, or square. Stroke width is px, em, or a fraction
of the shorter allocated side. An explicit px width is useful for very shallow
or zero-height lines.

Endpoints do not determine the element's layout size. A small diagonal in a
large allocation still takes up the full allocation, and points can extend
outside it. Set dimensions explicitly for a predictable rule or connector.
There are no built-in arrows or references to other elements' positions yet;
use [Group](./Group.md) to share a known coordinate system between nodes and lines.
