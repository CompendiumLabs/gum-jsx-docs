// neon palette
const bg = interp(black, slate, 0.855)
const pink = interp(red, white, 0.209)
const pinkCore = interp(white, red, 0.151)
const lime = interp(green, yellow, 0.045)
const limeCore = interp(white, green, 0.179)

// layered strokes to fake a neon glow
const Neon = ({ color, core, ...attr }) => [
  <Spline stroke={color} stroke-width={px(34)} opacity={0.05} stroke-linecap="round" {...attr} />,
  <Spline stroke={color} stroke-width={px(20)} opacity={0.1} stroke-linecap="round" {...attr} />,
  <Spline stroke={color} stroke-width={px(10)} opacity={0.25} stroke-linecap="round" {...attr} />,
  <Spline stroke={color} stroke-width={px(3.5)} stroke-linecap="round" {...attr} />,
  <Spline stroke={core} stroke-width={px(1.3)} stroke-linecap="round" {...attr} />,
]

// bud: a tight elliptical spiral
const bud = linspace(0, 3.5 * pi, 40, true).map((t) => [
  0.02 * t * cos(t),
  0.62 + 0.016 * t * sin(t),
])

// petals
const petals = [
  // inner petals hugging the bud
  [
    [-0.05, 0.86],
    [-0.24, 0.8],
    [-0.3, 0.6],
    [-0.2, 0.42],
    [0.0, 0.38],
  ],
  [
    [0.12, 0.86],
    [0.3, 0.72],
    [0.28, 0.5],
    [0.12, 0.4],
  ],
  // tulip-shaped middle petals meeting at the base
  [
    [0, 0.28],
    [-0.4, 0.42],
    [-0.5, 0.78],
    [-0.3, 1.02],
    [-0.12, 0.92],
  ],
  [
    [0, 0.28],
    [0.4, 0.42],
    [0.5, 0.78],
    [0.3, 1.02],
    [0.12, 0.92],
  ],
  // outer petals flaring out and curling under
  [
    [-0.45, 0.58],
    [-0.68, 0.46],
    [-0.8, 0.22],
    [-0.66, 0.02],
    [-0.46, 0.06],
  ],
  [
    [0.45, 0.58],
    [0.68, 0.46],
    [0.8, 0.22],
    [0.66, 0.02],
    [0.46, 0.06],
  ],
  [
    [-0.38, 0.36],
    [-0.3, 0.1],
    [-0.06, 0.0],
    [0.2, 0.05],
    [0.38, 0.32],
  ],
]

// little four-point sparkles
const Sparkle = ({ color, ...attr }) => (
  <Group aspect={1} {...attr}>
    <VLine stroke={color} stroke-width={px(6)} opacity={0.2} stroke-linecap="round" />
    <HLine stroke={color} stroke-width={px(6)} opacity={0.2} stroke-linecap="round" />
    <VLine stroke={color} stroke-width={px(1.5)} stroke-linecap="round" />
    <HLine stroke={color} stroke-width={px(1.5)} stroke-linecap="round" />
  </Group>
)
const sparkles = [
  [[-0.78, 0.95], 0.1],
  [[0.82, 0.8], 0.07],
  [[0.7, -0.05], 0.05],
  [[-0.7, -0.35], 0.06],
  [[0.55, -0.75], 0.08],
  [[-0.4, -1.05], 0.05],
]

// stem
const stem = [
  [0, 0.02],
  [0.05, -0.4],
  [-0.03, -0.8],
  [0.0, -1.2],
]

// leaf outline + vein from base to tip
const leaf = (base, tip, w) => {
  const [x0, y0] = base
  const [x1, y1] = tip
  const [dx, dy] = [x1 - x0, y1 - y0]
  const len = sqrt(dx * dx + dy * dy)
  const [nx, ny] = [-dy / len, dx / len]
  const [mx, my] = [(x0 + x1) / 2, (y0 + y1) / 2]
  return [
    [base, [mx + w * nx, my + w * ny], tip],
    [base, [mx - w * nx, my - w * ny], tip],
    [base, [mx + 0.15 * w * nx, my + 0.15 * w * ny], [x0 + 0.85 * dx, y0 + 0.85 * dy]],
  ]
}
const leaves = [
  ...leaf([0.045, -0.5], [0.55, -0.33], 0.13),
  ...leaf([-0.015, -0.78], [-0.52, -0.62], 0.13),
]

return (
  <Box padding={em(1.25)} background={bg}>
    <Frame background={bg} border-radius={em(1)} clip border-color={bg}>
      <Graph aspect={1 / 1.3} xlim={[-1, 1]} ylim={[-1.3, 1.3]}>
        <Circle
          x={0}
          y={0.5}
          anchor="center"
          width={0.75}
          fill={pink}
          opacity={0.04}
          stroke={none}
        />
        <Circle
          x={0}
          y={0.5}
          anchor="center"
          width={0.5}
          fill={pink}
          opacity={0.05}
          stroke={none}
        />
        {sparkles.map(([p, size]) => (
          <Sparkle
            x={p[0]}
            y={p[1]}
            anchor="center"
            width={size / 2}
            color={pinkCore}
          />
        ))}
        <Neon color={lime} core={limeCore} points={stem} />
        {leaves.map((points) => (
          <Neon color={lime} core={limeCore} points={points} />
        ))}
        {petals.map((points) => (
          <Neon color={pink} core={pinkCore} points={points} />
        ))}
        <Neon color={pink} core={pinkCore} points={bud} />
      </Graph>
    </Frame>
  </Box>
)
