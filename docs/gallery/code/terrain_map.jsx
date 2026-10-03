// A small square-tile height field. Graph projects its shared 3D coordinates;
// Group alone has local positions, but no data projection.

const W = 1200, H = 860
const N = 24
const terrainSize = { width: 955, height: 597 }
const origin = { x: 480, y: 28 }
const tileX = 17.7, tileY = 10.7, rise = 29
const ground = -1.05

const vertex = (x, y, z) => ({ x, y, z })
const terrainProjection = ({ x, y, z }) => ({
  x: tileX * (x - y),
  y: rise * z - tileY * (x + y),
})
// Output limits keep the original one-projected-unit-per-pixel framing.
const xlim = [-origin.x, terrainSize.width - origin.x]
const ylim = [origin.y - terrainSize.height, origin.y]

const gaussian = (x, y, cx, cy, spread) =>
  Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * spread ** 2))

const elevation = (x, y) => Math.max(0,
  2.85 - 0.020 * ((x - 12) ** 2 + (y - 12) ** 2)
  + 3.7 * gaussian(x, y, 8, 9, 2.8)
  + 2.9 * gaussian(x, y, 16, 13, 3.3)
  + 1.4 * gaussian(x, y, 13, 17, 2.3)
  - 1.25 * gaussian(x, y, 11, 13, 2.3)
  + 0.16 * Math.sin(0.9 * x + 0.37 * y) * Math.cos(0.53 * y)
)
const height = (i, j) => Math.round(elevation(i + 0.5, j + 0.5) / 0.3) * 0.3
const levels = Array.from({ length: N }, (_, i) =>
  Array.from({ length: N }, (_, j) => height(i, j)))
const at = (i, j) => levels[i][j]

// Facets now carry world-space corners; their Graph parent projects them together.
const Facet = ({ points, fill, stroke = none, line = 0, ...props }) => (
  <Polyline
    points={points} closed
    fill={fill} stroke={stroke} stroke-width={px(line)}
    stroke-linejoin="round" {...props}
  />
)
const blend = (a, b, t) => {
  const channel = k => Math.round(
    parseInt(a.slice(k, k + 2), 16) * (1 - t)
    + parseInt(b.slice(k, k + 2), 16) * t
  ).toString(16).padStart(2, '0')
  return '#' + [1, 3, 5].map(channel).join('')
}
const stops = [
  [0, '#75a4a4'], [0.25, '#a9c5ad'], [1.15, '#88ae8c'],
  [2.2, '#739a78'], [3.15, '#a4ad7d'], [4.1, '#c2b88b'],
  [5.15, '#ded2af'], [6.1, '#f0e8d1'],
]
const landColor = h => {
  if (h < 0.15) return '#76a7a5'
  for (let k = 1; k < stops.length; k++) {
    if (h <= stops[k][0]) {
      const a = stops[k - 1], b = stops[k]
      return blend(a[1], b[1], (h - a[0]) / (b[0] - a[0]))
    }
  }
  return stops[stops.length - 1][1]
}

const cells = []
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) cells.push({ i, j, depth: i + j })
}
cells.sort((a, b) => a.depth - b.depth || a.i - b.i)

const Tile = ({ i, j }) => {
  const z = at(i, j)
  const top = landColor(z)
  const sea = z < 0.15
  const sideI = i === N - 1 ? ground : at(i + 1, j)
  const sideJ = j === N - 1 ? ground : at(i, j + 1)
  return (
    <>
      {z > sideI + 0.001 &&
        <Facet
          points={[
            vertex(i + 1, j, z), vertex(i + 1, j + 1, z),
            vertex(i + 1, j + 1, sideI), vertex(i + 1, j, sideI),
          ]}
          fill={sea ? '#437f7f' : blend(top, '#244a40', 0.43)}
          stroke={sea ? '#437f7f' : '#436050'} line={0.43}
        />}
      {z > sideJ + 0.001 &&
        <Facet
          points={[
            vertex(i, j + 1, z), vertex(i + 1, j + 1, z),
            vertex(i + 1, j + 1, sideJ), vertex(i, j + 1, sideJ),
          ]}
          fill={sea ? '#4c8886' : blend(top, '#326757', 0.30)}
          stroke={sea ? '#4c8886' : '#52705b'} line={0.43}
        />}
      <Facet
        points={[
          vertex(i, j, z), vertex(i + 1, j, z),
          vertex(i + 1, j + 1, z), vertex(i, j + 1, z),
        ]}
        fill={top} stroke={sea ? '#93bab0' : '#e4e8d3'}
        line={sea ? 0.68 : 0.80}
      />
    </>
  )
}

const ink = '#233d36', muted = '#75867c', paper = '#f6f5ee'
const Rule = ({ height = em(1) }) => <HLine height={height} stroke="#cbd3c6" />

const Compass = props => (
  <VStack align="center" gap={em(0.4)} color={ink} {...props}>
    <Text font-family={mono} font-weight={bold} font-size={em(0.9)}>N</Text>
    <Arrow points={[[0.5, 1], [0.5, 0]]} height={em(4)} width={em(1)} />
  </VStack>
)

return <Svg background={paper} font-size={px(20)}>
  <Box padding={em(2)}>
    <VStack align="stretch">
      <HStack>
        <VStack gap={em(0.35)}>
          <Text font-family={mono} font-size={em(0.83)} font-weight="bold"
            color="#53816b">FIELD STUDY  /  001</Text>
          <Text font-size={em(2.5)} font-weight="bold" color={ink}>
            Terrain in tiles
          </Text>
        </VStack>
        <Spacer />
        <VStack gap={em(0.65)}>
          <Text font-family={mono} font-size={em(0.83)} color={ink}>
            24 × 24 CELLS
          </Text>
          <Text font-family={mono} font-size={em(0.78)} color={muted}>
            ELEVATION / 3D
          </Text>
        </VStack>
      </HStack>
      <Rule />
      <Overlay>
        <Graph
          width={px(terrainSize.width)} height={px(terrainSize.height)}
          projection={terrainProjection} xlim={xlim} ylim={ylim}
        >
          <Facet
            points={[
              vertex(0, 0, ground - 19 / rise),
              vertex(N, 0, ground - 19 / rise),
              vertex(N, N, ground - 19 / rise),
              vertex(0, N, ground - 19 / rise),
            ]}
            fill="#5d776e" opacity={0.12}
          />
          <Facet
            points={[
              vertex(0, 0, ground), vertex(N, 0, ground),
              vertex(N, N, ground), vertex(0, N, ground),
            ]}
            fill="#47796e"
          />
          {cells.map(({ i, j }) => <Tile key={`${i}-${j}`} i={i} j={j} />)}
        </Graph>
        <Compass pos={[0.95, 0.15]} />
      </Overlay>
      <Rule height={em(2.5)} />
      <HStack gap={em(0.65)}>
        <Text font-family={mono} font-size={em(0.78)} font-weight="bold"
          color={ink}>ELEVATION</Text>
        <Spacer />
        <Text font-family={mono} font-size={em(0.72)} color={muted}>LOW</Text>
        <HStack gap={em(0.17)}>
          {Array.from({ length: 13 }, (_, k) => (
            <Rect key={k} width={em(1.61)} height={em(0.83)}
              fill={landColor(k * 0.5)} stroke={none} />
          ))}
        </HStack>
        <Text font-family={mono} font-size={em(0.72)} color={muted}>HIGH</Text>
        <Spacer />
        <Text font-family={mono} font-size={em(0.72)} color={muted}>
          ISOMETRIC
        </Text>
      </HStack>
    </VStack>
  </Box>
</Svg>
