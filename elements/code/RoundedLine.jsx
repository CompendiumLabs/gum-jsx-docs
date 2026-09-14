// RoundedLine in data coordinates.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background={white}>
    <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
      <RoundedLine
        points={[[0, 0], [0, 2], [2, 2], [2, 3]]}
        radius={px(18)}
        stroke={blue}
        stroke_width={px(3)}
      />
    </Graph>
  </Box>
</Svg>
