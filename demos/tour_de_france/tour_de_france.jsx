// Tour de France-style profile with fictitious stage data.
// Render: gum tour_de_france.jsx -o tour_de_france.svg

const lightBg = '#f7f1df'
const lightSand = '#efe6c9'
const accent = '#f2c94c'
const grid = '#d8ccb0'

const route = [
  [0, 320],
  [12, 360],
  [24, 410],
  [36, 920],
  [46, 640],
  [58, 520],
  [72, 560],
  [88, 1280],
  [98, 760],
  [112, 700],
  [126, 860],
  [138, 1520],
  [148, 1040],
  [160, 960],
  [170, 1320],
  [182, 1880],
]

const climbs = [
  { km: 36, name: 'COL DE MONTVERS', cat: 'CAT 2', grade: '7.1%', dx: 0 },
  { km: 88, name: 'COL DU LAC', cat: 'CAT 1', grade: '6.8%', dx: -6 },
  { km: 138, name: 'COL DE LA CROIX', cat: 'HC', grade: '7.4%', dx: -12 },
  { km: 182, name: 'SUMMIT FINISH', cat: 'HC', grade: '8.1%', dx: -12 },
]

const markers = [
  { km: 61, label: 'SPRINT', dy: 250 },
  { km: 109, label: 'FEED', dy: -250 },
]

const maxElev = 2300
const splineTension = 0.7
const totalKm = route.at(-1)[0]
const summit = max(route.map(([, y]) => y)) ?? 0
const gain = sum(range(1, route.length).map(i => maximum(route[i][1] - route[i - 1][1], 0)))

const profileAt = spline2d(route, splineTension)
const profileLine = linspace(0, 1, 300).map(profileAt)

function routeAtKm(km) {
  const next = route.findIndex(([x]) => x >= km)
  if (next <= 0) return route[Math.max(0, next)]
  const [x0, y0] = route[next - 1]
  const [x1, y1] = route[next]
  const t = (km - x0) / (x1 - x0)
  return [km, y0 + (y1 - y0) * t]
}

const axisTicks = range(0, 201, 25).filter(km => km <= totalKm)
const elevTicks = [500, 1000, 1500, 2000]

const StatChip = ({ label, value, edge, ...props }) => {
  const radius = edge === 'left' ? { l: em(0.25) } : edge === 'right' ? { r: em(0.25) } : 0
  return <Frame
    grow={1}
    padding={em(0.5)}
    border-radius={radius}
    background={accent}
    align="center"
    {...props}
  >
    <VStack gap={em(0.25)} align="center" justify="center">
      <Text font-family={mono} font-size={em(0.7)}>{label}</Text>
      <Text font-family={mono}>{value}</Text>
    </VStack>
  </Frame>
}

const MarkerBadge = ({ label, ...props }) =>
  <Frame padding={[em(0.45), em(0.25)]} border-radius={em(0.35)} background={white} font-size={em(0.9)} {...props}>
    <Text font-family={mono} font-size={em(0.65)} wrap={false}>{label}</Text>
  </Frame>

const RouteMarker = ({ km, label, dy }) => {
  const [x, y] = routeAtKm(km)
  return <>
    <CoordLine points={[[x, y], [x, y + dy]]} stroke-width={em(0.06)} />
    <MarkerBadge pos={[x, y + dy]} label={label} />
  </>
}

const FlagBox = ({ name, cat, grade, ...props }) =>
  <Frame padding={em(0.45)} border-radius={em(0.2)} background={white} font-size={em(0.9)} {...props}>
    <VStack gap={em(0.25)}>
      <HStack gap={em(0.5)} align="center">
        <Box padding={[em(0.35), em(0.15)]} background={accent}>
          <Text font-family={mono} font-size={em(0.65)} wrap={false}>{cat}</Text>
        </Box>
        <Text font-family={mono} font-size={em(0.65)} wrap={false}>{grade}</Text>
      </HStack>
      <Text font-family={mono} font-size={em(0.65)} wrap={false}>{name}</Text>
    </VStack>
  </Frame>

const ClimbFlag = ({ km, name, cat, grade, dx }) => {
  const [x, y] = routeAtKm(km)
  const py = Math.min(y + 350, maxElev - 250)
  const labelKm = Math.max(24, Math.min(totalKm - 18, x + dx))
  return <>
    <CoordLine points={[[x, y], [labelKm, py]]} stroke-width={em(0.06)} />
    <FlagBox pos={[labelKm, py]} name={name} cat={cat} grade={grade} />
  </>
}

return <Box width={px(1100)} font-size={px(16)} padding={em(1.5)} background={lightBg} color="#292820" stroke="#292820">
  <VStack gap={em(1.2)}>
    <Box width="fill" padding={em(0.8)} border-radius={em(0.3)} background={lightSand}>
      <Text font-family={mono} font-size={em(1.1)} align-self="center">
        STAGE 14 · ALPINE PROFILE · GRENOBLE → SUMMIT FINISH
      </Text>
    </Box>

    <Box padding={{h: em(10)}} font-size={em(0.8)}>
      <HStack align-self="center">
        <StatChip label="DISTANCE" value={`${totalKm} KM`} edge="left" />
        <StatChip label="CLIMB" value={`${Math.round(gain)} M`} />
        <StatChip label="TOP" value={`${summit} M`} edge="right" />
      </HStack>
    </Box>

    <Plot
      aspect={2.5}
      xlim={[0, totalKm]}
      ylim={[0, maxElev]}
      xticks={axisTicks}
      yticks={elevTicks}
      axis-label-font-family={mono}
      axis-label-font-size={em(0.75)}
      ygrid
      ygrid-stroke={grid}
      ygrid-stroke-dasharray={[em(0.15), em(0.15)]}
      clip={false}
    >
      <VFill points={profileLine} boundary={0} fill={accent} stroke={none} />
      <CoordLine points={profileLine} stroke-width={em(0.09)} />
      {markers.map((marker, i) => <RouteMarker key={i} {...marker} />)}
      {climbs.map((climb, i) => <ClimbFlag key={i} {...climb} />)}
      <Text pos={[0, -350]} font-size={em(0.65)} font-family={mono}>START</Text>
      <Text pos={[totalKm, -350]} font-size={em(0.65)} font-family={mono}>FINISH</Text>
    </Plot>

    <Text font-family={mono} align-self="center">
      4 CATEGORIZED CLIMBS · 1 SPRINT · 1 FEED ZONE · SUMMIT FINISH
    </Text>
    <Text font-family={mono} font-size={em(0.7)} align-self="center">
      ILLUSTRATIVE STAGE DATA
    </Text>
  </VStack>
</Box>
