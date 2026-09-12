# Polygon

*Category*: geometry

Polygon connects `points` in order and closes the path back to the first point.
Points are `{ x, y }` objects containing fractions, px, or em. Fractions use the
polygon's own rectangle; the point list does not establish its layout size.

```jsx
<Polygon width={px(120)} height={px(100)}
  points={[{ x: 0.5, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]}
  fill="#2c7567" stroke="none" />
```

Shared sizing and paint props work as on [Rect](Rect.md). There is no default
fill; set one explicitly for a solid silhouette. stroke_linejoin and
stroke_miterlimit control stroked corners. Empty points produce no drawing.
Vertices outside the allocated rectangle remain outside; clipping belongs to a
container or the root viewport.

Regular polygons can be generated with ordinary JavaScript and trigonometry,
as in the example. There is no built-in regular-polygon generator or point-list
bounding-box fit. Use [Polyline](Polyline.md) for an open outline or [Path](Path.md)
for curved edges.

[Runnable source](../code/Polygon.jsx) · [JSX](JSX.md)
