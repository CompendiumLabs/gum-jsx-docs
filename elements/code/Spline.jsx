// Spline in data coordinates.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)}>
    <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
      <Spline
        points={[[0, 0], [1, 2], [2, 1], [3, 3]]}
        stroke={blue}
        stroke-width={px(3)}
      />
    </Graph>
  </Box>
</Svg>
