# Geometry Elements

## Arc

*Inherits*: **Path** > **Element**

This draws an elliptical arc that inscribes its allocated rectangle, like **Ellipse**, but only over a selected angular interval.

Parameters:
- `start` — first angle in degrees
- `end` — second angle in degrees

Angles follow the current coordinate system: `0` points right and positive angles follow positive y. In the default screen coordinate system, `90` points down; inside a default **Graph**, where y is flipped upward, `90` points up. The two angles are treated as an interval; their order does not change the drawn arc.

**Example**

Prompt: elliptical and circular arcs using start and end angles

Generated code:
```jsx
<Group>
  <Arc pos={[0.3, 0.5]} rad={[0.2, 0.15]} start={-45} end={210} stroke={blue} stroke-width={2} />
  <Arc pos={[0.7, 0.5]} rad={0.15} start={90} end={-150} stroke={red} stroke-width={2} />
</Group>
```

## Arrow

*Inherits*: **Group** > **Element**

Draws a straight arrow between two points. This is the straight-line counterpart to **ArrowSpline**: it uses `from` and `to` endpoints, but renders a simple **Line** shaft instead of a curved spline.

The line and arrowhead can be styled separately using prefixed parameters. The head is built from **ArrowHead**-style geometry, while the shaft is a simple **Line**.

The arrow direction is inferred automatically from `from` to `to`.

Parameters:
- `points` — the points to draw the arrow between (can include intermediate points)
- `start-dir` / `end-dir` — the direction of the arrowheads at the start and end
- `arrow` / `arrow-start` / `arrow-end` — toggles whether the respective arrowheads are included. Defaults to `true` for `arrow-end` and `false` for `arrow-start`, meaning a directed graph edge
- `arrow-size` = `0.04` — size of the arrowhead
- `curve` = `null` — curvature factor forwarded to the **Spline** (`null` or zero means straight line)
- `rounded` = `null` — corner radius for a city-block path through `points`. When set, the shaft is a **RoundedLine** (takes precedence over `curve`)

Subunit names:
- `line` — forwarded to the shaft line
- `arrow` — forwarded to the arrowhead
- `start` / `end` — forwarded to the start and end arrowheads respectively

**Example**

Prompt: the text "Blue Square" on the left with an arrow pointing to a blue square on the right

Generated code:
```jsx
<Frame rounded>
  <Group aspect={2}>
    <Text pos={[0.2, 0.5]} ysize={0.2} width={4} justify="center">Blue Square</Text>
    <Arrow points={[[0.3, 0.5], [0.6, 0.5]]} />
    <Square pos={[0.75, 0.5]} ysize={0.5} rounded fill={blue} />
  </Group>
</Frame>
```

## ArrowHead

*Inherits*: **Path** > **Element**

Draws a single arrowhead: two barbs meeting at a tip. It is the head used by **Arrow**, **Edge**, and the **Axis** arrows, and can be placed on its own with `pos` and `size` like any other element. The head is drawn in its own unit box pointing right, with the tip at the box's right edge, and then rotated to `angle`; the barbs each span half the box, so `size` sets the barb length.

By default the head is an open stroke, just the two barbs. Giving it a `fill` closes it into a filled triangle by joining the barb ends with a base line (`base` controls this directly). The barbs can be bowed toward the shaft with `curve` to get the flared look of a typeset arrow, and a harpoon keeps only one of them with `barb`.

Parameters:
- `angle` = `0` — the direction the tip points in degrees, with `0` pointing right and positive angles following positive y
- `arc` = `75` — the spread between the two barbs in degrees
- `curve` = `0` — how much the barbs bow toward the shaft: `0` gives straight barbs, `1` leaves the tip tangent to the shaft (Computer Modern's arrows are about `0.7`)
- `barb` = `both` — which barbs to draw, relative to the direction of travel: `both`, `left`, or `right` (one barb makes a harpoon)
- `base` — whether to close the head with a line across the barb ends; defaults to `true` when `fill` is given and `false` otherwise
- `exact` = `true` — pull the tip back by half the stroke width so the stroked outline ends exactly at `pos`
- `stroke-linecap` = `round` / `stroke-linejoin` = `round` — line caps and joins

**Example**

Prompt: arrowheads on a shaft: the default open head, a wider bowed one, a filled one, and a harpoon with just the left barb

Generated code:
```jsx
const heads = [
  { arc: 75 },
  { arc: 90, curve: 0.7 },
  { arc: 60, fill: blue },
  { arc: 90, curve: 0.7, barb: 'left' },
]
return <HStack spacing={0.1}>
  {heads.map(h => <Group aspect={1}>
    <Line points={[[0.15, 0.5], [0.8, 0.5]]} stroke-width={2} />
    <ArrowHead pos={[0.8, 0.5]} size={0.3} stroke-width={2} {...h} />
  </Group>)}
</HStack>
```

## Ellipse

*Inherits*: **Element**

This makes an ellipse. Without any arguments it will inscribe its allocated space. Use **Circle** for a circle with a unit aspect.

**Example**

Prompt: two ellipses, one wider and one taller

Generated code:
```jsx
<Group>
  <Ellipse pos={[0.3, 0.2]} rad={[0.2, 0.1]} />
  <Ellipse pos={[0.6, 0.6]} rad={[0.2, 0.25]} />
</Group>
```

## Fill

*Inherits*: **Polygon** > **Pointstring** > **Element**

Shades the area between two curves. Generates a closed polygon by running through `points1` forward and then through `points2` in reverse. Either list can be a constant, in which case `direc` controls how the constant is broadcast against the other curve. There are specialized components **VFill** and **HFill** that don't take the `direc` argument.

When both `points1` and `points2` are arrays, `direc` is ignored. When one is a constant `c`:
- `direc="h"` (default) treats `c` as a constant x-coordinate, pairing it with each y from the other curve
- `direc="v"` treats `c` as a constant y-coordinate, pairing it with each x from the other curve (useful for shading under a curve down to a horizontal baseline)

For a symbolic analogue that generates points from functions, see **SymFill**.

Parameters:
- `points1` — array of points for one boundary, or a constant
- `points2` — array of points for the other boundary, or a constant
- `direc` — broadcast direction when one boundary is a constant: `"h"` (default) or `"v"`

**Example**

Prompt: shade the area between a zigzag curve and the x-axis

Generated code:
```jsx
const curve = [[0, 1], [2, 3], [4, 2], [6, 5], [8, 4], [10, 6]]
return <Graph xlim={[0, 10]} ylim={[0, 7]} aspect={phi}>
  <VFill points1={curve} points2={0} fill={blue} fill-opacity={0.4} />
  <Line points={curve} stroke={blue} />
</Graph>
```

## Line

*Inherits*: **Element**

The `Line` element draws line segments through a series of points. It accepts a list of two or more points and connects them with straight line segments.

There are specialized variants for vertical and horizontal lines called **VLine** and **HLine**, which allow you to specify the position of the line (`loc`) and the range of the line (`lim`). See **UnitLine** for more details.

For smooth curves through points, use **Spline** instead.

Parameters:
- `points` — array of point coordinates (minimum of 2 required)

**Example**

Prompt: draw a piecewise line spiraling outwards (with dots at vertices)

Generated code:
```jsx
const spiral = linspace(0, 5, 25).map(t => polar(2*pi * t, t/5))
return <Box margin>
  <Graph aspect coord={[-1, -1, 1, 1]}>
    <Line points={spiral} />
    <Points points={spiral} point-size={0.03} />
  </Graph>
</Box>
```

## Polygon

*Inherits*: **Pointstring** > **Element**

The `Polygon` element draws a closed polygon through a series of points. It accepts a list of two or more points and connects them with straight line segments, automatically closing the shape by connecting the last point back to the first.

For open multiple-segment paths, use **Line** instead.

Parameters:
- `points` — array of point coordinates (minimum of 2 required)

**Example**

Prompt: draw a stop sign

Generated code:
```jsx
const hexagon = linspace(0, 2*pi, 8, false).map(t => polar(t))
return <Box fill="#bbb" rounded padding margin>
  <Graph xlim={[-1, 1]} ylim={[-1, 1]} aspect={1}>
    <Polygon points={hexagon} fill="#CC0202" stroke={white} stroke_width={20} spin={180/8} />
    <Text pos={[0, 0]} xsize={1.5} color={white} font-weight={bold}>STOP</Text>
  </Graph>
</Box>
```

## Rect

*Inherits*: **Element**

This makes a rectangle. Without any arguments it will fill its entire allocated space. Unless otherwise specified, it has a `null` aspect. Use **Square** for a square with a unit aspect.

Specifying a `rounded` argument rounds all four corners. A scalar gives circular corners; a pair gives separate x and y radii for elliptical corners. Radii use the same drawing units as `stroke-width`: `rounded={12}` gives a radius of twelve stroke units regardless of the rectangle's size or aspect. Oversized radii are clamped to fit the box, and negative values become zero. To specify different roundings for each corner, use **RoundedRect**.

Parameters:
- `rounded` = `null` — corner radius in stroke units, either a scalar or an x/y pair; `true` for `10`, `false` for no rounding

**Example**

Prompt: a rectangle on the left side of the figure with an aspect of roughly 1/2

Generated code:
```jsx
<Rectangle pos={[0.25, 0.5]} size={[0.2, 0.4]}/>
```

## RoundedLine

*Inherits*: **Path** > **Element**

The `RoundedLine` element draws a polyline through a series of points with rounded corners at each interior vertex. It is most useful for *city-block* (right-angle) routes — for instance, edges in a network diagram that you want to bend cleanly around obstacles rather than curving with **Spline**. Spline curvature along an otherwise-straight `points` route produces undulating bumps; `RoundedLine` keeps the straight segments straight and only rounds the turns.

Each interior vertex is replaced by a circular arc whose radius is derived from `radius` in coord space. When the coordinate system is not square, `RoundedLine` uses the smaller mapped axis so corners stay circular in pixel space instead of stretching into ellipses. If a segment is too short for the requested radius, the corner is automatically clamped so adjacent corners can never overlap.

For straight-line polylines (no corner rounding) use **Line**. For smooth curves through points use **Spline**.

Parameters:
- `points` — array of point coordinates (minimum of 2 required)
- `radius` = `0.05` — corner back-off distance in coord space, applied at each interior vertex

**Example**

Prompt: a city-block route in blue with rounded corners, with the underlying

Generated code:
```jsx
// vertices marked as black dots to show how the corners are rounded
const points = [
  [-0.8,  0.6], [-0.2,  0.6], [-0.2, -0.6],
  [ 0.4, -0.6], [ 0.4,  0.0], [ 0.8,  0.0],
]
return <Graph aspect padding>
  <Line points={points} opacity={0.3} />
  <RoundedLine points={points} stroke={blue} stroke-width={2} radius={0.1} />
  <Points points={points} point-size={0.03} />
</Graph>
```

## RoundedRect

*Inherits*: **Path** > **Element**

A rectangle with circular corners. It fills its allocated rectangle unless an `aspect` is specified. Unlike **Rect**, it supports separate rounding for each corner.

`rounded` uses the same drawing unit as `stroke-width`: `<RoundedRect rounded={12} border={2} />` has a corner radius of twelve stroke units and a border two units wide. At the root, these are 12 and 2 pixels when the figure's longest dimension equals `Svg.unit-size` (1000 by default). Both scale with the figure, independently of the rectangle's size and aspect. A container that rebases stroke units also rebases rounding.

A pair `[x, y]` specifies the horizontal and vertical corner offsets. The arc stays circular, using the smaller offset. Four entries specify the top-left, top-right, bottom-right, and bottom-left corners; each entry may itself be a pair. For example, `rounded={[12, 0, 12, 0]}` rounds two opposite corners.

If neighboring corner offsets would overlap, all four corners shrink proportionally to fit. Negative radii become zero. Rounding does not change the rectangle's layout size or aspect.

Parameters:

- `rounded` = `0` — a radius, an x/y pair, or four corner values in stroke units; `true` uses the default radius of `10`
- `border` = `1` — stroke width in the same units; `stroke-width` can override it
- `fill`, `stroke`, and other drawing attributes — as for **Path**

**Box**, **Frame**, and **TextBox** pass their rounding through to this element. Text frames use the same stroke units for their corners; changing text `scale` alone does not change the radius.

Numeric rectangle rounding previously meant a box fraction, or em in text frames. Existing figures using that convention need their values updated to stroke units.

**Example**

Prompt: Show consistent corner radii across rectangle sizes, including per-corner and elliptical rounding.

Generated code:
```jsx
<Svg size={1000} unit-size={1000}>
  <TextCol width={27} gap={0.8}>
    <Text scale={1.3}>Rounding in stroke units</Text>
    <TextRow gap={1}>
      <TextCol gap={0.4}>
        <Text>RoundedRect: 12</Text>
        <TextFigure height={2}><RoundedRect rounded={12} fill={blue} /></TextFigure>
        <TextFigure height={4}><RoundedRect rounded={12} fill={blue} /></TextFigure>
      </TextCol>
      <TextCol gap={0.4}>
        <Text>[24, 0, 24, 0]</Text>
        <TextFigure height={2}><RoundedRect rounded={[24, 0, 24, 0]} fill={green} /></TextFigure>
        <TextFigure height={4}><RoundedRect rounded={[24, 0, 24, 0]} fill={green} /></TextFigure>
      </TextCol>
      <TextCol gap={0.4}>
        <Text>Rect: [24, 8]</Text>
        <TextFigure height={2}><Rect rounded={[24, 8]} fill={purple} /></TextFigure>
        <TextFigure height={4}><Rect rounded={[24, 8]} fill={purple} /></TextFigure>
      </TextCol>
    </TextRow>
    <Text scale={0.7}>Each column keeps its corner radii as its boxes change size.</Text>
  </TextCol>
</Svg>
```

## Spline

*Inherits*: **Path** > **Element**

This creates a smooth cardinal spline curve through a series of points. The tangent at each interior point is computed as the central difference between its neighbors, while endpoints use forward/backward differences. This produces a smooth, natural-looking curve that passes through all specified points.

The `curve` parameter controls the tension of the spline. Lower values (e.g., 0.5) create tighter curves with less overshoot, while higher values (e.g., 1.5) create looser, more flowing curves. The default value of 0.5 produces the canonical *Catmull-Rom* spline.

In some cases, you may want to construct spline data explicitly (say to place points or labels along a spline). In this cases, there is a `spline2d` function that accepts the same arguments as this component but returns a t -> (x,y) spline function over `[0, 1]`. There is also a `spline1d` function that returns an x -> y spline function.

Parameters:
- `points` — array of point coordinates (minimum of 2 required)
- `curve` = `0.5` — tension parameter that scales the tangent vectors
- `closed` = `false` — toggles whether to make it a closed loop
- `start-dir`/`end-dir` — the direction vectors at the first and last points (defaults to start and end points direction)

**Example**

Prompt: draw a blue cubic spline path filled with gray that looks like a pacman facing left, using 5 vertices. label the vertices with black dots and connect them with straight red lines. place the whole thing in a rounded frame.

Generated code:
```jsx
const points = [
  [0.25, 0.25],
  [0.75, 0.25],
  [0.75, 0.75],
  [0.25, 0.75],
  [0.50, 0.50],
]
return <Frame rounded margin>
  <Group>
    <Spline closed stroke={blue} fill={gray} points={points} />
    <Polygon stroke={red} points={points} />
    <Points point-size={0.02} points={points} />
  </Group>
</Frame>
```

## UnitLine

*Inherits*: **Line**

Draw a horizontal or vertical line at a particular position over a particular range. The position will be `0.5` and the range will be `[0, 1]`. There are also specialized variants for vertical and horizontal lines called **VLine** and **HLine**.

Parameters:
- `direc` — the direction of the line (`'v'` or `'h'`)
- `loc` = `0.5` — the position of the line
- `lim` = `[0, 1]` — the range of the line

**Example**

Prompt: draw a plus symbol and place it toward the bottom left

Generated code:
```jsx
<Group pos={[0.3, 0.7]} size={0.4}>
  <VLine />
  <HLine />
</Group>
```
