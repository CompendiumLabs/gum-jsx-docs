// An illustrative route: sample in longitude/latitude before projection.
const lisbon = [-9.14, 38.72]
const athens = [23.73, 37.98]
const route = linspace(0, 1, 81).map(t => [
  lisbon[0] + (athens[0] - lisbon[0]) * t,
  lisbon[1] + (athens[1] - lisbon[1]) * t + 9 * sin(pi * t),
])

return (
  <TextBox width={em(38)} font-size={px(20)} padding={em(1.3)} background={white} fit>
    <TextCol gap={em(0.8)}>
      <Text font-size={em(1.5)} font-weight={bold}>A route in geographic coordinates</Text>
      <Text font-size={em(0.8)} color={slate}>
        The map projects each arrow sample and positions the city labels.
      </Text>
      <GeoMap
        source={world_countries()} aspect={1.65}
        fit-to={['620', '724', '276', '380', '300']}
        padding={em(1.8)}
        background={interp(white, blue, 0.12)}
        fill={interp(white, green, 0.2)} border-color={white}
      >
        <Arrow points={route} stroke={blue} stroke-width={px(3)} head-size={px(12)} />
        <Points points={[lisbon, athens]} point-size={px(9)} fill={blue} stroke={white} stroke-width={px(1.5)} />
        <Text x={lisbon[0]} y={lisbon[1] - 1.4} anchor={['center', 'start']} font-weight={bold}>Lisbon</Text>
        <Text x={athens[0]} y={athens[1] - 1.4} anchor={['center', 'start']} font-weight={bold}>Athens</Text>
      </GeoMap>
      <Text font-size={em(0.75)} color={slate}>
        An illustrative sampled route, with ordinary layout sizes for points, labels, and arrowheads.
      </Text>
    </TextCol>
  </TextBox>
)
