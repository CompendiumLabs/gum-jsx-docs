// RoundedLine in data coordinates.
<Box padding={em(1.875)}>
  <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
    <RoundedLine
      points={[[0, 0], [0, 2], [2, 2], [2, 3]]}
      radius={em(1.125)}
      stroke={blue}
      stroke-width={px(3)}
    />
  </Graph>
</Box>
