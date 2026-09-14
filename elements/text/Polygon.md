# Polygon

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| `points` | `[]` | Ordered local vertices joined and closed into a polygon |

**Polygon** connects `points` in order and closes the path back to the first point.
Points are `{ x, y }` objects or `[x, y]` tuples containing fractions, px, or em. Fractions use the
polygon's own rectangle; the point list does not establish its layout size.

```jsx
<Polygon width={px(120)} height={px(100)}
  points={[[0.5, 0], [1, 1], [0, 1]]}
  fill={green} stroke={none} />
```

Shared sizing and paint props work as on [Rect](./Rect.md). There is no default
fill; set one explicitly for a solid silhouette. `stroke-linejoin` and
`stroke-miterlimit` control stroked corners. Empty points produce no drawing.
Vertices outside the allocated rectangle remain outside; clipping belongs to a
container or the root viewport.

The example uses `linspace(-90,270,count,false)` and `polard` to generate a regular
polygon without duplicating its closing vertex. See [Arrays](../../topics/text/Arrays.md) and
[Vectors](../../topics/text/Vectors.md) for these helpers. There is no point-list
bounding-box fit. Use [Polyline](./Polyline.md) for an open outline or [Path](./Path.md)
for curved edges.
