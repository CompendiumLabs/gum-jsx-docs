// Seeded normal samples stay identical across rerenders and viewport changes.
setSeed(7)
const points = range(120).map(() => [normal(), normal()])
const center = [mean(points.map(p => p[0])), mean(points.map(p => p[1]))]
return <Svg width={px(600)}>
  <Box padding={px(24)} background={lightgray}>
    <VStack gap={px(16)} align="stretch">
      <Text font-size={px(26)} font-weight={bold}>Random data, repeatable figures</Text>
      <Plot height={px(340)} xlim={[-3.5, 3.5]} ylim={[-3.5, 3.5]}
        xlabel="x" ylabel="y">
        <Points points={points} point-size={px(6)} fill={blue} opacity={0.65} />
        <Points points={[center]} point-size={px(12)} fill={red} stroke={white} stroke-width={px(2)} />
      </Plot>
      <Text font-family={mono} font-size={px(14)}>
        Seed 7. n = {points.length}. Mean = ({rounder(center[0], 3)}, {rounder(center[1], 3)}).
      </Text>
    </VStack>
  </Box>
</Svg>
