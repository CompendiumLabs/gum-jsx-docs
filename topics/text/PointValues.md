# Point values

*Category*: geometry

Point inputs accept either `[x, y]` or `{x, y}` in JSX and host code. You can mix
both forms in one list. Each tuple must contain exactly two coordinates.

```jsx
<Line from={[0, 0.5]} to={[1, 0.5]} />
<Polygon points={[[0.5, 0], [1, 1], [0, 1]]} />
<Ellipse center={[0.5, 0.5]} radius={[px(30), em(1)]} />
```

| Input | Where it works |
| --- | --- |
| `from`, `to`, `center`, `origin`, `tip` | **Line**, **Circle**/**Ellipse**, **Arc**, **Arrow**, **Ray**, **ArrowHead**, and their conveniences |
| `points` and `fill` boundary lists | **Polyline**/**Polygon**, **CoordLine**, **Spline**, **RoundedLine**, **Points**, **Arrow**, **Fill**/**HFill**/**VFill** |
| Segment endpoints | `segments={[[[0, 0], [1, 1]], [[0, 1], [1, 0]]]}` |
| Paired radius or `point-size` | **Rect**/**Box** corners, **Ellipse**/**Arc** radii, and **Points** marker dimensions |
| **Field** samples | `vectors={[{point: [0, 0], vector: [1, 2]}]}` |
| **Anchor** and alignment pairs | `anchor={[1, 0.5]}`, **Box**/**Fit**/**Anchor** `align`, and **Rotate** `origin` |
| Numeric helper inputs | Vector arithmetic, `spline2d` and path builders, `point_bounds`, `map_point`/`unmap_point`, drawing centers/radii, and placement offsets |

The representation does not change coordinate units. Primitive shapes use local
fractions, px, and em. Numeric points in graph marks use data coordinates inside
[Graph](../../elements/text/Graph.md) or [Plot](../../elements/text/Plot.md). Tuple coordinates can mix lengths, such as
`[px(12), 0.5]`. **Circle**'s radius remains scalar; **Ellipse** accepts separate radii.

**Anchor** and alignment pairs instead use dimensionless fractions from 0 to 1 or
the keywords start/center/end: `anchor={['end', 0.5]}`. **Box** alignment also allows
fill and stretch. Stack align/justify remain single-axis values. See [Group](../../elements/text/Group.md)
for the distinction between placing an element and arranging its contents.

[Array helpers](./Arrays.md) can feed point lists directly:

```jsx
const xs = linspace(0, tau, 33)
return <Plot>
  <CoordLine points={zip(xs, xs.map(sin))} />
  <Points points={xs.map(x => [x, cos(x)])} />
</Plot>
```

Null and nonfinite coordinates keep their existing gap behavior: lines and fills
split their paths, and **Points** omits missing markers. Inferred limits ignore these
gaps. Malformed tuples raise an error.

**Points** callbacks always receive an `{x, y}` record, even for tuple inputs.
**Field** shape callbacks likewise receive records in `sample.point` and
`sample.vector`. Callbacks keep original input indices and execute once at
construction. Generated points from polar, vector arithmetic, sampling, splines,
and coordinate mapping also remain `{x, y}` records.

In TypeScript, `PointValue` is the numeric input union and `PositionValue` also
allows px/em coordinates. For a separately declared array, annotate its point
type or use `as const` to retain tuple lengths:

```ts
import { Points, Line, px } from 'gum-next-core'
import type { PointValue, PositionValue } from 'gum-next-core'

const data: PointValue[] = [[0, 1], [2, 3]]
const endpoint: PositionValue = [px(12), 0.5]
const markers = new Points({ points: data })
const line = new Line({ from: endpoint, to: [1, 0.5] })
```
