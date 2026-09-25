---
category: plotting
description: "Project coordinate pairs for polar plots, map annotations, and custom elements."
---

# Projections

Layout gives an element a rectangular drawing area. A projection maps its data
points into that area. The same [Arrow](../../elements/text/Arrow.md),
[CoordLine](../../elements/text/CoordLine.md), and [Points](../../elements/text/Points.md)
can use Cartesian, polar, or geographic coordinates.

## Polar coordinates in Graph

Give [Graph](../../elements/text/Graph.md) a pure pair-to-pair function:

```jsx
<Graph
  aspect={1}
  xlim={[-1.2, 1.2]} ylim={[-1.2, 1.2]}
  projection={([theta, r]) => [r * cos(theta), r * sin(theta)]}
>
  <CoordLine
    points={linspace(0, tau, 121).map(theta => [theta, 0.8])}
    stroke={blue} fill={none}
  />
  <Points points={[[pi / 4, 0.8]]} point-size={px(8)} fill={red} />
  <Text x={pi / 4} y={1} anchor="center">45°</Text>
</Graph>
```

Each pair starts as `[angle in radians, radius]`. The callback returns Cartesian
coordinates, then Graph maps those through its limits and flips into pixels.
Limits describe the callback's output space. Both limits must be explicit, or
provided with `coord`; inferring nonlinear bounds would require additional
sampling. Equal axis spans and a square frame preserve the polar disk's shape.

The runnable example draws its rings, spokes, and spiral with ordinary marks.
The arrow's supplied samples follow the same projection as the points.

## Annotations inside GeoMap

[GeoMap](../../elements/text/GeoMap.md) supplies its fitted projection to children:

```jsx
<GeoMap source={world_countries()} background={lightgray}>
  <Points
    points={[[-74.01, 40.71], [2.35, 48.86]]}
    point-size={px(8)} fill={red}
  />
  <Text x={2.35} y={48.86} anchor={['start', 'end']}>Paris</Text>
</GeoMap>
```

Numeric pairs are `[longitude, latitude]` in degrees. Children share the map's
size, fitting, padding, center, rotation, and visibility. A point on the back of
an orthographic globe is omitted. Direct-child `x`/`y` anchors project together;
the placed element retains its normal size and orientation.
See [Map routes](../../gallery/text/map_routes.md) for a sampled arrow.

## Geometry stays with the element

Projection changes points. It does not warp completed fragments or automatically
add path samples. An Arrow with two endpoints stays straight between their
projected positions; supply more points for a curved route. Spline controls are
computed from projected samples. Arrowheads, marker sizes, line widths, and text
use ordinary layout lengths.

A projection can return `null` for an unavailable point. Markers and annotations
are omitted; line-like marks split into runs. Arrowheads stay on visible original
endpoints and are not added at cuts. This is point visibility, not geometric
clipping of a path: callers must sample and split routes appropriately at seams,
such as the antimeridian. GeoMap's geographic source geometry continues to use
its own spherical path renderer.

`space="local"` opts marks out of data mapping. A pair of tagged lengths such as
`[px(20), px(30)]` also stays local. A projected pair cannot mix one bare data
number with one tagged length. Line and Polyline default to local geometry;
set `space="data"` to project their endpoints or vertices. A Line is omitted if
either endpoint is hidden; Polyline breaks into visible runs. Path retains its
local geometry. Bars retain their rectangle
construction from projected opposite corners. Arc can project its center with
local px/em radii; use sampled CoordLine points for a data-space arc.
Plot axes and Network retain their existing Cartesian behavior.

## The core contract

`Projection` wraps a pure `(point: readonly [number, number]) =>
readonly [number, number] | null` function. Graph accepts either this object or
the callback directly. Coordinates can carry a `projection` alongside
`xlim`, `ylim`, `flip_x`, and `flip_y`.

Custom elements use `map_point(value, query.coordinates, size)` for numeric
points, or `coordinate_point(value, size, query.measure, query.coordinates)` for
data and length-valued positions. Both return `{x, y}` in local pixels or `null`.
Pass coordinates through `query.child` to establish or inherit a frame; see
[Coordinates](./coordinates.md). `graph_children` provides the same child
placement policy used by Graph and GeoMap.

Projection callbacks run during layout and must not depend on mutable captured
state. The immutable Projection object retains behavior by identity, and that
identity participates in layout caching. Construct a new projection when its
behavior changes. Arbitrary functions remain disallowed in source props.
Inputs and non-null outputs must be finite pairs. No inverse, path transformer,
or automatic sampling is required; `unmap_point` supports linear frames only.
