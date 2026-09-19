// Seeded normal samples stay identical across rerenders and viewport changes.
setSeed(7)
const points = range(120).map(() => [normal(), normal()])
const center = [mean(points.map(p => p[0])), mean(points.map(p => p[1]))]
return <TextBox width={px(600)} padding={em(1.5)} background={lightgray}>
  <TextCol gap={em(1)}>
    <Text font-size={em(1.625)} font-weight={bold}>Random data, repeatable figures</Text>
    <Plot font-size={em(0.75)} xlim={[-3.5, 3.5]} ylim={[-3.5, 3.5]}
      xlabel="x" ylabel="y">
      <Points points={points} point-size={px(6)} fill={blue} opacity={0.65} />
      <Points points={[center]} point-size={px(12)} fill={red} stroke={white} stroke-width={px(2)} />
    </Plot>
    <Text font-family={mono} font-size={em(0.875)}>
      Seed 7. n = {points.length}. Mean = ({rounder(center[0], 3)}, {rounder(center[1], 3)}).
    </Text>
  </TextCol>
</TextBox>
