// A shared projection maps three-dimensional source records onto the page.
const helix = t => ({x: cos(t), y: sin(t), z: 0.9 * t / tau})
const origin = {x: 0, y: 0, z: 0}
const axes = [
  {label: 'x', tip: {x: 1.6, y: 0, z: 0}, labelPos: {x: 1.8, y: 0, z: 0}},
  {label: 'y', tip: {x: 0, y: 1.6, z: 0}, labelPos: {x: 0, y: 1.8, z: 0}},
  {label: 'z', tip: {x: 0, y: 0, z: 2.5}, labelPos: {x: 0, y: 0, z: 2.7}},
]

return (
  <TextBox width={em(32)} font-size={px(20)} padding={em(1.3)} background={white} fit>
    <TextCol gap={em(0.8)}>
      <Text font-size={em(1.5)} font-weight={bold}>Three dimensions, one projection</Text>
      <Text font-size={em(0.8)} color={slate}>
        A helix, markers, axes, and labels share x, y, and z coordinates.
      </Text>
      <Graph
        aspect={1} projection={isometric_projection()}
        xlim={[-1.9, 1.9]} ylim={[-1, 2.8]}
      >
        <SymLine
          f={t => ({x: cos(t), y: sin(t), z: 0})}
          tlim={[0, tau]} samples={121}
          stroke={lightgray} stroke-width={em(0.06)}
        />
        {axes.map(({label, tip, labelPos}) => (
          <>
            <Arrow
              from={origin} to={tip}
              stroke={slate} stroke-width={em(0.06)} head-size={em(0.4)}
            />
            <Text pos={labelPos} anchor="center" color={slate}>{label}</Text>
          </>
        ))}
        <SymLine
          f={helix} tlim={[0, 2 * tau]} samples={241}
          stroke={blue} stroke-width={em(0.16)}
        />
        <Points
          points={linspace(0, 2 * tau, 9).map(helix)}
          point-size={({z}) => em(0.25 + 0.12 * z)} fill={blue}
        />
        <Text pos={{x: 1.15, y: 0, z: 0.2}} anchor={['start', 'center']} font-size={em(0.75)}>
          start
        </Text>
        <Text pos={{x: 1.15, y: 0, z: 1.8}} anchor={['start', 'center']} font-size={em(0.75)}>
          end
        </Text>
      </Graph>
      <Text font-size={em(0.75)} color={slate}>
        The projection sets position; source z controls marker size.
      </Text>
    </TextCol>
  </TextBox>
)
