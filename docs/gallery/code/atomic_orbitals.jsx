// Stylized angular orbital profiles, with positive and negative phases colored separately.
const zero = atan(sqrt(2))
const Lobe = ({ radius, start, end, positive }) => (
  <SymPoly
    f={(t) => polar(t, radius(t))}
    tlim={[start, end]}
    samples={121}
    stroke={positive ? blue : red}
    fill={interp(white, positive ? blue : red, 0.28)}
    stroke-width={px(2)}
  />
)
const profiles = [
  { label: "1s", radius: () => 0.375, pieces: [[0, tau, true]] },
  {
    label: "2p_x",
    radius: (t) => 0.5 * abs(cos(t)),
    pieces: [
      [-pi / 2, pi / 2, true],
      [pi / 2, (3 * pi) / 2, false],
    ],
  },
  {
    label: "2p_y",
    radius: (t) => 0.5 * abs(sin(t)),
    pieces: [
      [0, pi, true],
      [pi, tau, false],
    ],
  },
  {
    label: "2p_z",
    radius: (t) => 0.5 * abs(cos(t - pi / 4)),
    pieces: [
      [-pi / 4, (3 * pi) / 4, true],
      [(3 * pi) / 4, (7 * pi) / 4, false],
    ],
  },
  {
    label: "3d_{xy}",
    radius: (t) => 0.48 * abs(sin(2 * t)),
    pieces: range(4).map((i) => [(i * pi) / 2, ((i + 1) * pi) / 2, i % 2 === 0]),
  },
  {
    label: "3d_{z^2}",
    radius: (t) => 0.28 * abs(3 * cos(t) ** 2 - 1),
    pieces: [
      [-zero, zero, true],
      [pi - zero, pi + zero, true],
      [zero, pi - zero, false],
      [pi + zero, tau - zero, false],
    ],
  },
]
const Cell = ({ profile }) => (
  <VStack gap={em(0.5)} align="center">
    <Frame radius={em(1)} background={lightgray} border-color={darkgray}>
      <Graph width={em(7)} aspect={1} xlim={[-0.8, 0.8]} ylim={[-0.8, 0.8]}>
        <CoordLine
          points={[[-0.8, 0], [0.8, 0]]}
          stroke={darkgray}
          stroke-dasharray={[px(4), px(4)]}
        />
        <CoordLine
          points={[[0, -0.8], [0, 0.8]]}
          stroke={darkgray}
          stroke-dasharray={[px(4), px(4)]}
        />
        {profile.pieces.map(([start, end, positive]) => (
          <Lobe radius={profile.radius} start={start} end={end} positive={positive} />
        ))}
        <Points points={[[0, 0]]} point-size={em(0.5)} fill={slate} />
      </Graph>
    </Frame>
    <Tex font-size={em(1.6)}>{profile.label}</Tex>
  </VStack>
)
return <Box font-size={px(20)} padding={em(1)}>
  <TitleFrame title="Atomic Orbitals" title-font-size={em(1.5)} padding={em(1.5)} radius={em(1)}>
    <VStack gap={em(2)} align="center">
      {[[0], [1, 2, 3], [4, 5]].map((row) => (
        <HStack wrap width="fill" gap={em(2)} justify="center">
          {row.map((index) => (
            <Cell profile={profiles[index]} />
          ))}
        </HStack>
      ))}
    </VStack>
  </TitleFrame>
</Box>
