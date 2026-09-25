---
category: geometry
description: "Draw a line segment in local coordinates or an enclosing data projection."
---

# Line

| Property | Default | Meaning |
|---|---|---|
| `from` | `[0, 0]` | Segment start in the selected coordinate space |
| `to` | `[1, 1]` | Segment end in the selected coordinate space |
| `space` | `"local"` | `"data"` uses the enclosing Graph, Plot, or GeoMap coordinate context |

**Line** draws one segment from `from` to `to`, each an `{ x, y }` or `[x, y]` pair of lengths.
The defaults are `[0, 0]` and `[1, 1]`: the diagonal of its own
allocated rectangle. Fractions use that rectangle's width and height, not the
parent's size. This local behavior remains the default inside a Graph or GeoMap.

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
Use [Arrow](./Arrow.md) for arrowheads or [Network](./Network.md) and
[Edge](./Edge.md) for connections between named elements.

Set `space="data"` to project both endpoint pairs through the enclosing
[Graph](./Graph.md), Plot, or [GeoMap](./GeoMap.md):

```jsx
<GeoMap source={world_countries()}>
  <Line
    space="data"
    from={[-9.14, 38.72]} to={[23.73, 37.98]}
    stroke={blue} stroke-width={px(2)}
  />
</GeoMap>
```

These endpoints are longitude/latitude in degrees. The segment stays straight
between the projected endpoints; use a sampled [Polyline](./Polyline.md) for a
curved route. If either endpoint is hidden by the projection, the line is omitted.
No coordinate context is an error for `space="data"`. Numeric endpoints contribute
to ordinary Graph/Plot limit inference; custom projections still need explicit
output limits. Tagged px/em/% pairs remain local, and a custom projection rejects
pairs mixing a data number with a tagged length. Stroke lengths retain their
ordinary layout meaning. See [Projections](../../guides/text/projections.md).
