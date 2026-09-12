# Line

*Category*: geometry

Line draws one segment from `from` to `to`, each an `{ x, y }` pair of lengths.
The defaults are `{ x: 0, y: 0 }` and `{ x: 1, y: 1 }`: the diagonal of its own
allocated rectangle. Fractions use that rectangle's width and height, not the
parent's size.

```jsx
<Line width={px(200)} height={px(40)}
  from={{ x: 0, y: 0.5 }} to={{ x: 1, y: 0.5 }}
  stroke="#2c7567" stroke_width={px(4)} stroke_linecap="round" />
```

Line always disables fill. It otherwise inherits stroke color, width, and cap
style; caps may be butt, round, or square. Stroke width is px, em, or a fraction
of the shorter allocated side. An explicit px width is useful for very shallow
or zero-height lines.

Endpoints do not determine the element's layout size. A small diagonal in a
large allocation still takes up the full allocation, and points can extend
outside it. Set dimensions explicitly for a predictable rule or connector.
There are no built-in arrows or references to other elements' positions yet;
use [Group](Group.md) to share a known coordinate system between nodes and lines.

[Runnable source](../code/Line.jsx) · [Polyline](Polyline.md) · [Path](Path.md)
