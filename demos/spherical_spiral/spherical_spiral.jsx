// Render: gum spherical_spiral.jsx -o spherical_spiral.svg
// Curve coordinates are [longitude theta, height z], in radians / unit radius.
// Graph expands each pair to {x: theta, y: z} before projection.
const a = 0.11;                 // Smaller a gives more turns between latitudes.
const extent = 55;              // A finite window of an infinite curve.
const elevation = 18 * pi / 180;
const azimuth = -0.65;
const limit = 1.22;
const ink = '#193739';
const muted = '#657B7C';
const accent = '#087F82';
const ghost = '#94BFC0';
const paper = '#FAFAF5';
const sphere = '#F0F5F2';

// A unit-sphere point. Longitude is deliberately left unwrapped.
function xyz({x: theta, y: z}) {
  const r = Math.sqrt(Math.max(0, 1 - z * z));
  return [r * Math.cos(theta), r * Math.sin(theta), z];
}

// Orthonormal camera basis: horizontal, vertical, toward the viewer.
function camera(point) {
  const [x, y, z] = xyz(point);
  const toward = x * Math.cos(azimuth) + y * Math.sin(azimuth);
  return [
    -x * Math.sin(azimuth) + y * Math.cos(azimuth),
    z * Math.cos(elevation) - toward * Math.sin(elevation),
    toward * Math.cos(elevation) + z * Math.sin(elevation),
  ];
}

const project = point => {
  const [u, v] = camera(point);
  return {x: u, y: v};
};
const hemisphere = front => point => {
  const [u, v, depth] = camera(point);
  return (front ? depth >= 0 : depth <= 0) ? {x: u, y: v} : null;
};
const front = hemisphere(true);
const back = hemisphere(false);

// Supply dense samples: projections transform points, not entire curves.
// Returning null from a projection breaks CoordLine at the limb.
const route = linspace(-extent, extent, 11001)
  .map(t => [t, Math.tanh(a * t)]);
const meridians = linspace(0, tau, 12, false)
  .map(theta => linspace(-pi / 2, pi / 2, 401)
    .map(latitude => [theta, Math.sin(latitude)]));
const parallels = [-60, -30, 0, 30, 60]
  .map(degrees => linspace(0, tau, 721)
    .map(theta => [theta, Math.sin(degrees * pi / 180)]));
const graticule = [...meridians, ...parallels];

function Layer({ projection, children }) {
  return (
    <Graph
      width="fill" height="fill"
      xlim={[-limit, limit]} ylim={[-limit, limit]}
      projection={projection}
      fill={none} stroke-linecap="round" stroke-linejoin="round"
    >
      {children}
    </Graph>
  );
}

function Globe(props) {
  return (
    <Group aspect={1} {...props}>
      <Circle
        pos={[0.5, 0.5]} width={1 / limit}
        fill={sphere} stroke="#AFC5C1" stroke-width={em(0.065)}
      />
      <Layer projection={back}>
        {graticule.map(points => (
          <CoordLine points={points} stroke="#DEE7E2" stroke-width={em(0.035)} />
        ))}
      </Layer>
      <Layer projection={front}>
        {graticule.map(points => (
          <CoordLine points={points} stroke="#C4D5CE" stroke-width={em(0.045)} />
        ))}
      </Layer>
      <Layer projection={back}>
        <CoordLine
          points={route} stroke={ghost} stroke-width={em(0.085)}
          stroke-dasharray={[em(0.2), em(0.2)]}
        />
      </Layer>
      <Layer projection={front}>
        <CoordLine points={route} stroke={accent} stroke-width={em(0.16)} />
      </Layer>
      <Layer projection={project}>
        <Points
          points={[[0, -1], [0, 1]]} point-size={em(0.42)}
          fill={paper} stroke={ink} stroke-width={em(0.07)}
        />
      </Layer>
      <Text
        pos={[0.5, 0.5 - Math.cos(elevation) / (2 * limit) - 0.065]}
        font-size={em(0.85)} color={ink}
      >
        <Tex>{String.raw`N\quad t\to+\infty`}</Tex>
      </Text>
      <Text
        pos={[0.5, 0.5 + Math.cos(elevation) / (2 * limit) + 0.065]}
        font-size={em(0.85)} color={ink}
      >
        <Tex>{String.raw`S\quad t\to-\infty`}</Tex>
      </Text>
    </Group>
  );
}

function Key({ dashed, label, color }) {
  return (
    <HStack gap={em(0.45)} align="center">
      <HLine
        width={em(1.8)} height={em(0.7)} stroke={color}
        stroke-width={em(dashed ? 0.09 : 0.16)}
        stroke-dasharray={dashed ? [em(0.2), em(0.2)] : []}
      />
      <Text font-size={em(0.75)} color={muted}>{label}</Text>
    </HStack>
  );
}

function Note({ title, children }) {
  return (
    <VStack gap={em(0.6)} align="fill">
      <Text font-size={em(0.76)} font-weight="bold" color={accent}>{title}</Text>
      {children}
    </VStack>
  );
}

// Keep every right-pane equation at the same size. Break long equations
// explicitly so automatic fitting cannot shrink individual formulas.
function Equation({ children }) {
  return (
    <Box width="fill" align="center">
      <Latex font-size={em(1.1)} fit={false}>{children}</Latex>
    </Box>
  );
}

return (
  <Box width={px(1160)} font-size={px(20)} padding={em(1.8)} background={paper} color={ink}>
    <VStack gap={em(0.75)} align="fill">
      <Text font-size={em(0.7)} font-weight="bold" color={accent}>GUM JSX / SPHERICAL PROJECTION</Text>
      <Text font-size={em(2)} font-weight="bold">An infinite spiral, two limiting poles</Text>
      <Text font-size={em(0.95)} color={muted}>
        Let longitude keep turning while height approaches the ends of a unit sphere.
      </Text>
      <HStack gap={em(1.8)} align="center">
        <VStack grow={3} gap={em(0.25)} align="fill">
          <Globe width="fill" />
          <HStack gap={em(1.2)} justify="center">
            <Key label="Near side" color={accent} />
            <Key label="Far side" color={ghost} dashed />
          </HStack>
          <Text font-size={em(0.65)} color={muted} justify="center">
            Orthographic view · camera elevation 18° · a = 0.11
          </Text>
        </VStack>
        <VStack grow={2} gap={em(1.5)} align="fill">
          <Note title="1 / DEFINE A FUNCTION OF LONGITUDE">
            <Equation>{String.raw`z(t)=\tanh(at),\quad \theta(t)=t`}</Equation>
            <Equation>{String.raw`t\in\mathbb{R},\quad a>0`}</Equation>
            <Text font-size={em(0.92)} color={muted}>
              Smaller a produces more turns between latitudes.
            </Text>
          </Note>
          <Note title="2 / LIFT IT ONTO THE SPHERE">
            <Equation>{String.raw`\gamma(t)=\begin{pmatrix}\cos t/\cosh(at)\\\sin t/\cosh(at)\\\tanh(at)\end{pmatrix}`}</Equation>
            <Equation>{String.raw`\begin{aligned}x^2+y^2+z^2&=\frac{1}{\cosh^2(at)}\\&\quad+\tanh^2(at)=1\end{aligned}`}</Equation>
          </Note>
          <Note title="3 / APPROACH BOTH POLES">
            <Equation>{String.raw`\lim_{t\to\pm\infty}\gamma(t)=(0,0,\pm1)`}</Equation>
            <Text font-size={em(0.92)} color={muted}>
              The curve winds forever and approaches each pole without reaching it.
            </Text>
          </Note>
        </VStack>
      </HStack>
      <Box padding={em(0.8)} background="#E9F0EB" border-radius={em(0.35)}>
        <Text font-size={em(0.77)} color={ink}>
          In Gum, pass sampled [θ, z] pairs to CoordLine. Graph’s projection lifts each pair to the sphere, then maps it into the camera view.
        </Text>
      </Box>
      <Text font-size={em(0.65)} color={muted}>
        Rendered window: −55 ≤ t ≤ 55. Open circles mark limiting poles; the mathematical curve continues indefinitely.
      </Text>
    </VStack>
  </Box>
);
