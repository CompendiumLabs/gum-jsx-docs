// A labeled animal-cell schematic composed from local organelle drawings.
const polarPair = (...args) => {
  const point = polar(...args)
  return [point.x, point.y]
}
// color scheme: muted, tonal palette — each organelle is a dusty mid-tone fill
// with a deeper stroke of the same hue, on warm paper with a cool mist cytoplasm
const col = {
  frame: { fill: interp(white, yellow, 0.063), border: interp(black, white, 0.733) },
  label: { line: interp(black, white, 0.573), text: interp(darkgray, black, 0.593) },
  membrane: { outer: interp(yellow, darkgray, 0.406), inner: interp(white, yellow, 0.372) },
  cytoplasm: { fill: interp(white, slate, 0.057) },
  mito: {
    fill: interp(purple, yellow, 0.479),
    stroke: interp(red, slate, 0.543),
    cristae: interp(white, red, 0.18),
  },
  lyso: {
    fill: interp(white, green, 0.604),
    stroke: interp(blue, green, 0.659),
    dots: interp(green, slate, 0.569),
  },
  golgi: { stroke: interp(blue, yellow, 0.477) },
  centrioles: { fill: interp(purple, darkgray, 0.637), stroke: interp(purple, slate, 0.45) },
  er: { stroke: interp(blue, darkgray, 0.52) },
  nucleus: {
    fill: interp(white, slate, 0.386),
    stroke: interp(green, purple, 0.601),
    inner: interp(white, purple, 0.263),
  },
  nucleolus: { fill: interp(yellow, purple, 0.669), stroke: interp(red, slate, 0.576) },
  vacuole: { fill: interp(white, blue, 0.327), stroke: interp(blue, yellow, 0.269) },
  ribosomes: { fill: interp(slate, white, 0.293) },
}

// canvas coordinates (wider than the cell to leave room for labels and title)
const C = [-0.2, 0, 1.7, 1]
const asp = 1.6

// helpers: lumpy blob from a list of radii
const blob = (radii, phase = 0) =>
  radii.map((r, i) => polarPair(phase + (2 * pi * i) / radii.length, r))
const Blob = ({ radii, phase = 0, ...attr }) => (
  <Spline
    closed
    space="local"
    points={blob(radii, phase).map(([x, y]) => [(x + 1) / 2, (y + 1) / 2])}
    {...attr}
  />
)

// wavy arc around a center (for the endoplasmic reticulum)
const wavyArc = (c, r, a0, a1, amp, n) =>
  linspace(a0 * d2r, a1 * d2r, n, true).map((t, i) =>
    polarPair(t, r + (i % 2 == 0 ? amp : -amp)).map((v, k) => v + c[k]),
  )

// organelle components
const mitoOuter = [
  [0.04, 0.5],
  [0.2, 0.15],
  [0.55, 0.08],
  [0.9, 0.28],
  [0.96, 0.6],
  [0.78, 0.92],
  [0.42, 0.92],
  [0.12, 0.78],
]
const cristae = [
  [0.18, 0.5],
  [0.28, 0.28],
  [0.38, 0.72],
  [0.5, 0.28],
  [0.62, 0.72],
  [0.74, 0.3],
  [0.84, 0.5],
]
const Mito = (attr) => (
  <Group aspect={2.2} {...attr}>
    <Spline
      space="local"
      closed
      points={mitoOuter}
      fill={col.mito.fill}
      stroke={col.mito.stroke}
      stroke-width={px(1)}
    />
    <Spline
      space="local"
      points={cristae}
      stroke={col.mito.cristae}
      stroke-width={px(1.5)}
      stroke-linecap="round"
    />
  </Group>
)

const Lyso = (attr) => (
  <Group aspect={1} {...attr}>
    <Circle fill={col.lyso.fill} stroke={col.lyso.stroke} stroke-width={px(1)} />
    <Points
      space="local"
      points={[
        [0.35, 0.4],
        [0.62, 0.35],
        [0.5, 0.68],
        [0.3, 0.66],
        [0.72, 0.62],
      ]}
      point-size={0.14}
      fill={col.lyso.dots}
    />
  </Group>
)

const Golgi = (attr) => (
  <Group aspect={1.4} {...attr}>
    {range(4).map((i) => {
      const y = 0.15 + 0.22 * i
      const x0 = 0.05 + 0.07 * i,
        x1 = 0.95 - 0.07 * i
      return (
        <Spline
          space="local"
          points={[
            [x0, y],
            [0.5, y - 0.14],
            [x1, y],
          ]}
          stroke={col.golgi.stroke}
          stroke-width={px(3)}
          stroke-linecap="round"
        />
      )
    })}
    <Points
      space="local"
      points={[
        [0.12, 0.95],
        [0.5, 1.0],
        [0.02, 0.45],
      ]}
      point-size={0.09}
      fill={col.golgi.stroke}
    />
  </Group>
)

const Centrioles = (attr) => (
  <Group aspect={1} {...attr}>
    <Rect
      x={0.35}
      y={0.5}
      anchor="center"
      width={0.22}
      height={0.8}
      fill={col.centrioles.fill}
      stroke={col.centrioles.stroke}
    />
    <Rect
      x={0.7}
      y={0.72}
      anchor="center"
      width={0.6}
      height={0.22}
      fill={col.centrioles.fill}
      stroke={col.centrioles.stroke}
    />
  </Group>
)

// shapes
const membrane = [1.0, 0.86, 0.96, 0.8, 0.9, 1.0, 0.82, 0.92, 0.72, 0.96, 0.86, 1.0]
const nucleusR = [1.0, 0.92, 1.0, 0.88, 0.96, 0.9, 1.0, 0.94]
const nucleolusR = [1.0, 0.85, 1.0, 0.9, 1.0]
const vacuoleR = [1.0, 0.8, 0.95, 0.75, 1.0, 0.85, 0.9]

const nc = [0.85, 0.5]
const ribosomes = [
  [0.34, 0.46],
  [0.38, 0.66],
  [0.6, 0.3],
  [0.66, 0.7],
  [0.72, 0.2],
  [0.92, 0.24],
  [1.06, 0.5],
  [1.14, 0.5],
  [0.78, 0.82],
  [0.9, 0.73],
  [1.06, 0.6],
  [0.33, 0.62],
  [0.75, 0.76],
  [0.4, 0.68],
  [0.62, 0.62],
  [0.58, 0.44],
  [1.02, 0.34],
]

// mitochondria placements: [pos, size, rotate]
const mitos = [
  [[0.45, 0.39], 0.17, 15],
  [[1.06, 0.28], 0.16, 15],
  [[0.52, 0.72], 0.2, -10],
]
// left tip of a mitochondrion (spline tip sits at 4% in from the box edge)
const mitoTip = ([[cx, cy], w, th]) => {
  const t = th * d2r,
    r = 0.46 * w
  return [cx - r * cos(t), cy - r * sin(t)]
}

// labels: [text, side, y, target]
const xL = 0.17,
  xR = 1.33,
  th = 0.04
const labels = [
  ["Cell membrane", "l", 0.1, [0.32, 0.3]],
  ["Mitochondrion", "l", 0.3, mitoTip(mitos[0])],
  ["Vacuole", "l", 0.52, [0.365, 0.55]],
  ["Rough ER", "l", 0.7, [0.58, 0.6]],
  ["Ribosomes", "l", 0.88, [0.4, 0.68]],
  ["Nucleus", "r", 0.28, [0.97, 0.42]],
  ["Nucleolus", "r", 0.4, [0.88, 0.47]],
  ["Lysosome", "r", 0.52, [1.25, 0.5]],
  ["Centrioles", "r", 0.64, [1.14, 0.6]],
  ["Golgi apparatus", "r", 0.78, [1.07, 0.72]],
  ["Cytoplasm", "r", 0.92, [0.85, 0.77]],
]

return (
  <Box min-width={em(20)} padding={em(1.3)}>
    <TitleFrame
      title="Anatomy of a Cell"
      title-font-size={em(1.25)}
      padding={em(1.3)}
      radius={em(0.8)}
      background={col.frame.fill}
      border-color={col.frame.border}
    >
      <Graph aspect={1.73} xlim={[-0.2, 1.7]} ylim={[0, 1]} flip-y={false}>
        <Blob
          radii={membrane}
          x={0.75}
          y={0.5}
          anchor="center"
          width={0.568}
          height={0.86}
          fill={col.cytoplasm.fill}
          stroke={col.membrane.outer}
          stroke-width={px(3)}
        />
        <Blob
          radii={membrane}
          x={0.75}
          y={0.5}
          anchor="center"
          width={0.537}
          height={0.8}
          fill={none}
          stroke={col.membrane.inner}
          stroke-width={px(1)}
        />
        {[0.2, 0.245, 0.29].map((r) => (
          <Spline
            points={wavyArc(nc, r, 105, 255, 0.012, 15)}
            stroke={col.er.stroke}
            stroke-width={px(1.5)}
            stroke-linecap="round"
          />
        ))}
        <Blob
          radii={nucleusR}
          phase={0.4}
          x={nc[0]}
          y={nc[1]}
          anchor="center"
          width={0.168}
          height={0.32}
          fill={col.nucleus.fill}
          stroke={col.nucleus.stroke}
          stroke-width={px(2)}
        />
        <Blob
          radii={nucleusR}
          phase={0.4}
          x={nc[0]}
          y={nc[1]}
          anchor="center"
          width={0.147}
          height={0.28}
          fill={none}
          stroke={col.nucleus.inner}
          stroke-width={px(0.75)}
          stroke-dasharray={[px(2), px(2)]}
        />
        <Blob
          radii={nucleolusR}
          phase={1}
          x={0.88}
          y={0.47}
          anchor="center"
          width={0.058}
          height={0.11}
          fill={col.nucleolus.fill}
          stroke={col.nucleolus.stroke}
          stroke-width={px(1)}
        />
        {mitos.map(([p, size, angle]) => (
          <Rotate x={p[0]} y={p[1]} anchor="center" angle={angle}>
            <Mito width={size / 1.9} />
          </Rotate>
        ))}
        <Golgi
          x={1.01}
          y={0.72}
          anchor="center"
          width={0.095}
        />
        <Centrioles
          x={1.11}
          y={0.57}
          anchor="center"
          width={0.042}
        />
        <Lyso x={1.22} y={0.5} anchor="center" width={0.034} />
        <Lyso x={0.68} y={0.79} anchor="center" width={0.029} />
        <Blob
          radii={vacuoleR}
          phase={0.7}
          x={0.42}
          y={0.55}
          anchor="center"
          width={0.074}
          height={0.14}
          fill={col.vacuole.fill}
          stroke={col.vacuole.stroke}
          stroke-width={px(1.5)}
        />
        <Points points={ribosomes} point-size={px(3.5)} fill={col.ribosomes.fill} />
        {labels.map(([label, side, y, target]) => (
          <CoordLine
            points={[[side === "l" ? xL + 0.01 : xR - 0.01, y], target]}
            stroke={col.label.line}
            stroke-width={px(1)}
          />
        ))}
        {labels.map(([label, side, y]) => (
          <Text
            x={side === "l" ? xL : xR}
            y={y}
            anchor={[side === "l" ? 1 : 0, 0.5]}
            font-size={em(0.7)}
            color={col.label.text}
          >
            {label}
          </Text>
        ))}
      </Graph>
    </TitleFrame>
  </Box>
)
