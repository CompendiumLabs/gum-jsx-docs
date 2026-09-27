// Run: gum winkel_tripel.jsx -o winkel_tripel.svg
// A custom Graph projection; all geographic inputs stay in degrees.
// Uses the maps bindings bundled with Gum. No imports or extra plugins.

const radians = Math.PI / 180
const halfPi = Math.PI / 2

function aitoff({x: longitude, y: latitude}) {
  const lambda = longitude * radians
  const phi = latitude * radians
  const alpha = Math.acos(Math.max(-1, Math.min(1,
    Math.cos(phi) * Math.cos(lambda / 2))))
  // The removable singularity at the origin: alpha / sin(alpha) → 1.
  const scale = alpha < 1e-8 ? 1 : alpha / Math.sin(alpha)
  return {
    x: 2 * scale * Math.cos(phi) * Math.sin(lambda / 2),
    y: scale * Math.sin(phi),
  }
}

function equirectangular({x: longitude, y: latitude}) {
  // Standard parallel acos(2 / pi) ≈ 50.467 degrees.
  return {x: longitude * radians * (2 / Math.PI), y: latitude * radians}
}

function winkelTripel(point) {
  const a = aitoff(point)
  const e = equirectangular(point)
  return {x: (a.x + e.x) / 2, y: (a.y + e.y) / 2}
}

// Graph limits describe projected output, and aspect preserves its scale.
const winkelHalfWidth = (Math.PI + 2) / 2
const meridians = linspace(-180, 180, 13)
const parallels = linspace(-60, 60, 5)
const latitudeSamples = linspace(-90, 90, 121)
const longitudeSamples = linspace(-180, 180, 181)
const graticule = [
  ...meridians.map(lon => latitudeSamples.map(lat => [lon, lat])),
  ...parallels.map(lat => longitudeSamples.map(lon => [lon, lat])),
]
const outline = [
  ...latitudeSamples.map(lat => [-180, lat]),
  ...longitudeSamples.map(lon => [lon, 90]),
  ...[...latitudeSamples].reverse().map(lat => [180, lat]),
  ...[...longitudeSamples].reverse().map(lon => [lon, -90]),
]

// Sample short segments and break lines at the antimeridian. This is an
// outline map: no polygon filling or general spherical clipping is assumed.
// Null separates runs, so Gum never draws a chord across the map's seam.
function sampledOutline(points) {
  return points.flatMap((point, i) => {
    if (i === 0) return [point]
    const previous = points[i - 1]
    if (Math.abs(point[0] - previous[0]) > 180) return [null, point]
    const steps = Math.max(1, Math.ceil(Math.max(
      Math.abs(point[0] - previous[0]),
      Math.abs(point[1] - previous[1]),
    ) / 2))
    return linspace(0, 1, steps + 1).slice(1).map(t => [
      previous[0] + t * (point[0] - previous[0]),
      previous[1] + t * (point[1] - previous[1]),
    ])
  })
}
const world = prepare_geo_source(world_countries())
const borders = world.borders.coordinates.map(sampledOutline)

// A great-circle route, sampled on the sphere before Graph projects it.
function greatCircle(start, end, count = 121) {
  const vector = ([lon, lat]) => [
    Math.cos(lat * radians) * Math.cos(lon * radians),
    Math.cos(lat * radians) * Math.sin(lon * radians),
    Math.sin(lat * radians),
  ]
  const a = vector(start)
  const b = vector(end)
  const angle = Math.acos(Math.max(-1, Math.min(1,
    a.reduce((sum, value, i) => sum + value * b[i], 0))))
  return linspace(0, 1, count).map(t => {
    const u = Math.sin((1 - t) * angle) / Math.sin(angle)
    const v = Math.sin(t * angle) / Math.sin(angle)
    const p = a.map((value, i) => u * value + v * b[i])
    return [
      Math.atan2(p[1], p[0]) / radians,
      Math.atan2(p[2], Math.hypot(p[0], p[1])) / radians,
    ]
  })
}
const sanFrancisco = [-122.42, 37.77]
const paris = [2.35, 48.86]
const route = greatCircle(sanFrancisco, paris)

const palette = {
  page: '#071E28', water: '#0B2A35', panel: '#0D303B',
  grid: '#29505B', outline: '#5A8993', land: '#A2C6C6',
  ink: '#F0F4E9', muted: '#9CB8BD', accent: '#F4B66B',
}

// This component changes only its projection and output extent. Every point
// remains [longitude, latitude], including the direct-child text anchors.
// Graph expands each tuple to {x, y} before calling the projection.
function MapFrame({ project, halfWidth, detail = false, ...props }) {
  const margin = 1.055
  return (
    <Graph
      projection={project}
      xlim={[-halfWidth * margin, halfWidth * margin]}
      ylim={[-halfPi * margin, halfPi * margin]}
      aspect={halfWidth / halfPi}
      {...props}
    >
      <CoordLine points={outline} closed fill={palette.water}
        stroke={palette.outline} stroke-width={em(0.055)} />
      {graticule.map(points => (
        <CoordLine points={points} fill={none}
          stroke={palette.grid} stroke-width={em(detail ? 0.045 : 0.035)} />
      ))}
      {detail && borders.map(points => (
        <CoordLine points={points} fill={none} stroke={palette.land}
          stroke-width={em(0.05)} stroke-linejoin="round" />
      ))}
      <CoordLine points={longitudeSamples.map(lon => [lon, 0])}
        fill={none} stroke={palette.outline} stroke-width={em(0.055)} />
      {detail && <Arrow points={route} stroke={palette.accent}
        stroke-width={em(0.14)} head-size={em(0.6)} head-open />}
      {detail && <Points points={[sanFrancisco, paris]} point-size={em(0.42)}
        fill={palette.accent} stroke={palette.page} stroke-width={em(0.07)} />}
      {detail && <TextBox pos={sanFrancisco}
        anchor={['end', 'start']} padding={em(0.45)}
        color={palette.ink} font-size={em(0.8)}>
        San Francisco
      </TextBox>}
      {detail && <TextBox pos={paris}
        anchor={['start', 'start']} padding={em(0.45)}
        color={palette.ink} font-size={em(0.8)}>
        Paris
      </TextBox>}
      {detail && [-60, -30, 0, 30, 60].map(lat => (
        <TextBox pos={[180, lat]} anchor={['start', 'center']}
          padding={em(0.4)} font-size={em(0.6)} color={palette.muted}>
          {lat === 0 ? '0°' : `${Math.abs(lat)}°${lat > 0 ? 'N' : 'S'}`}
        </TextBox>
      ))}
    </Graph>
  )
}

const blendPanels = [
  { title: '01  Aitoff', project: aitoff, halfWidth: Math.PI,
    note: 'Curved meridians; poles meet at a point.' },
  { title: '02  Equirectangular', project: equirectangular, halfWidth: 2,
    note: 'Standard parallel: 50.467°.' },
  { title: '03  Winkel Tripel', project: winkelTripel, halfWidth: winkelHalfWidth,
    note: 'Average the two projected point pairs.' },
]

return (
  <TextBox width={px(1400)} padding={em(2.25)} font-size={px(22)}
    color={palette.ink} background={palette.page}>
    <TextCol gap={em(1.2)}>
      <HStack align="center" justify="space-between">
        <Text font-family={mono} font-size={em(0.65)} color={palette.accent}>
          GUM / CUSTOM PROJECTIONS
        </Text>
        <Text font-family={mono} font-size={em(0.65)} color={palette.muted}>
          LONGITUDE, LATITUDE → X, Y
        </Text>
      </HStack>
      <TextCol gap={em(0.35)}>
        <Text font-size={em(2.75)} font-weight="light">The world, in Winkel Tripel.</Text>
        <Text font-size={em(0.9)} color={palette.muted}>
          One custom function projects the map, grid, route, and labels.
        </Text>
      </TextCol>
      <MapFrame project={winkelTripel} halfWidth={winkelHalfWidth} detail />
      <HStack align="center" justify="space-between" gap={em(1)}>
        <HStack align="center" gap={em(0.45)}>
          <Line width={em(1.8)} height={em(0.1)} stroke={palette.accent}
            stroke-width={em(0.12)} />
          <Text font-size={em(0.7)} color={palette.muted}>
            Great-circle route · 121 samples
          </Text>
        </HStack>
        <Text font-family={mono} font-size={em(0.7)} color={palette.accent}>
          {'<Graph projection={winkelTripel}>'}
        </Text>
        <Text font-size={em(0.7)} color={palette.muted}>Graticule · 30°</Text>
      </HStack>
      <Box background={palette.panel} padding={em(1.1)} border-radius={em(0.4)}>
        <TextCol gap={em(0.8)}>
          <HStack justify="space-between" align="center">
            <Text font-size={em(1.05)}>Two projections. One pointwise average.</Text>
            <Text font-family={mono} font-size={em(0.7)} color={palette.accent}>
              W(p) = ½ A(p) + ½ E(p)
            </Text>
          </HStack>
          <Grid columns={3} gap={em(1.5)}>
            {blendPanels.map(({ title, project, halfWidth, note }) => (
              <TextCol gap={em(0.55)}>
                <Text font-size={em(0.8)} color={palette.ink}>{title}</Text>
                <Box height={em(6.5)} align="center">
                  <MapFrame project={project} halfWidth={halfWidth} fit />
                </Box>
                <Text font-size={em(0.64)} color={palette.muted}>{note}</Text>
              </TextCol>
            ))}
          </Grid>
        </TextCol>
      </Box>
      <HStack justify="space-between" gap={em(1)}>
        <Text font-size={em(0.6)} color={palette.muted}>
          World outlines: Natural Earth / world-atlas 2.0.2 · bundled with Gum
        </Text>
        <Text font-size={em(0.6)} color={palette.muted}>
          Explicit output bounds · sampled curves · upright labels
        </Text>
      </HStack>
    </TextCol>
  </TextBox>
)
