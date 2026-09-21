// RoundedLine in data coordinates.
<Box padding={em(2)}>
  <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
    <RoundedLine
      points={[[0, 0], [0, 2], [2, 2], [2, 3]]}
      radius={em(1.2)}
      stroke={blue}
      stroke-width={px(3)}
    />
  </Graph>
</Box>
