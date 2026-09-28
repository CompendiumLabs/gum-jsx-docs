// Logarithmic data shares a graph with axes and grids in projected coordinates.
const decades = [1, 10, 100, 1000]
const ticks = decades.map(value => [log10(value), String(value)])
const minor = [0, 1, 2].flatMap(power => range(2, 10).map(value => power + log10(value)))

return (
  <TextBox width={em(30)} font-size={px(20)} padding={em(2)} background={white}>
    <TextCol gap={em(0.8)}>
      <Text font-size={em(1.5)} font-weight={bold}>Equal ratios, equal spacing</Text>
      <Text font-size={em(0.8)} color={slate}>
        Each decade has the same width and height in a log–log view.
      </Text>
      <Box padding={[em(0.7), em(1.6), em(2.4), em(1.4)]}>
        <Graph
          aspect={1}
          xlim={[0, 3]} ylim={[0, 3]}
          projection={log_projection()}
        >
          <HMesh lim={[0, 3]} ticks={minor} stroke={lightgray} />
          <VMesh lim={[0, 3]} ticks={minor} stroke={lightgray} />
          <HMesh lim={[0, 3]} ticks={ticks} stroke={gray} />
          <VMesh lim={[0, 3]} ticks={ticks} stroke={gray} />
          <SymLine
            f={t => ({x: 10 ** t, y: 10 ** t})}
            tlim={[0, 3]} samples={61}
            stroke={blue} stroke-width={em(0.14)}
          />
          <SymLine
            f={t => ({x: 10 ** t, y: 10 ** (t / 2)})}
            tlim={[0, 3]} samples={61}
            stroke={purple} stroke-width={em(0.14)}
          />
          <Points
            points={decades.map(x => ({x, y: x}))}
            point-size={em(0.35)} fill={blue}
          />
          <Points
            points={decades.map(x => ({x, y: sqrt(x)}))}
            point-size={em(0.35)} fill={purple}
          />
          <HAxis lim={[0, 3]} ticks={ticks} label-font-size={em(0.75)} />
          <VAxis lim={[0, 3]} ticks={ticks} label-font-size={em(0.75)} />
        </Graph>
      </Box>
      <HStack gap={em(3)} align-self="center">
        <Latex color={blue}>y = x</Latex>
        <Latex color={purple}>{String.raw`y = \sqrt{x}`}</Latex>
      </HStack>
      <Text font-size={em(0.75)} color={slate}>
        Data stays in its original units. Axis positions use logarithms; labels are supplied explicitly.
      </Text>
    </TextCol>
  </TextBox>
)
