// Input points are [angle in radians, radius]; Graph fits Cartesian output.
const polar = ([theta, r]) => [r * cos(theta), r * sin(theta)]
const angles = linspace(0, tau, 121)
const route = linspace(0.15 * pi, 2.35 * pi, 100).map((theta, i) => [theta, 0.2 + 0.65 * i / 99])

return (
  <TextBox width={em(32)} font-size={px(20)} padding={em(1.3)} background={white} fit>
    <TextCol gap={em(0.8)}>
      <Text font-size={em(1.5)} font-weight={bold}>A polar coordinate frame</Text>
      <Text font-size={em(0.8)} color={slate}>
        Ordinary lines, points, and arrows share one projection.
      </Text>
      <Graph
        aspect={1} projection={polar}
        xlim={[-1.25, 1.25]} ylim={[-1.25, 1.25]}
      >
        {[0.25, 0.5, 0.75, 1].map(r => (
          <Polyline
            space="data" points={angles.map(theta => [theta, r])}
            stroke={lightgray} fill={none}
          />
        ))}
        {linspace(0, tau, 9).slice(0, -1).map(theta => (
          <Line
            space="data" from={[theta, 0]} to={[theta, 1]}
            stroke={lightgray}
          />
        ))}
        <Arrow points={route} stroke={blue} stroke-width={px(3)} head-size={px(12)} />
        <Points points={[route[0]]} point-size={px(9)} fill={blue} />
        {[0, 90, 180, 270].map(degrees => (
          <Text
            x={degrees * d2r} y={1.13} anchor="center"
            font-size={em(0.75)} color={slate}
          >
            {degrees + '°'}
          </Text>
        ))}
      </Graph>
      <Text font-size={em(0.75)} color={slate}>
        The spiral supplies 100 point pairs. Its arrowhead stays the same size.
      </Text>
    </TextCol>
  </TextBox>
)
