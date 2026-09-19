// Native points from a Cartesian grid and evenly spaced polar vectors.
const tips = linspace(0, tau, 12, false).map(angle => polar(angle, 1.5))
const vectors = tips.map(tip => ({ point: [0, 0], vector: mul2(tip, 1.1) }))
return <Box padding={em(1.5)} background={lightgray}>
  <VStack gap={em(1)}>
    <Text font-size={em(1.625)} font-weight={bold}>Grids and polar vectors</Text>
    <Graph aspect={1} xlim={[-2, 2]} ylim={[-2, 2]}>
      <Points points={lingrid([-2, 2], [-2, 2], 9)} point-size={px(3)} fill={darkgray} />
      <SymLine f={angle => polar(angle, 1.5)} tlim={[0, tau]}
        stroke={blue} stroke-width={px(2)} />
      <Field vectors={vectors} stroke={blue} stroke-width={px(1.5)} head-size={px(7)} />
      <Points points={tips} point-size={px(7)} fill={red} />
    </Graph>
    <Text font-size={em(0.875)}>12 vectors, one circle, and a 9 by 9 Cartesian grid.</Text>
  </VStack>
</Box>
