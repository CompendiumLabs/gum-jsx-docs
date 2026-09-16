// Alternating inner and outer vertices form a rounded five-point star.
const n = 5
const innerRadius = 0.7
const points = range(2 * n).map((i) => polar(-pi / 2 + (i * pi) / n, i % 2 ? innerRadius : 1))
return (
  <Svg width={px(520)} height={px(520)}>
    <Box padding={px(24)}>
      <Frame padding={px(36)} radius={px(18)} background={gray} border-color={lightgray}>
        <Graph xlim={[-1.15, 1.15]} ylim={[-1.15, 1.15]} flip-y={false}>
          <Spline
            points={points}
            closed
            tension={0.6}
            fill={blue}
            stroke={slate}
            stroke-width={px(2)}
          />
        </Graph>
      </Frame>
    </Box>
  </Svg>
)
