// A curved Arrow with open barbs and separately scoped head paint.
<Box padding={em(1.875)}>
  <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
    <Arrow
      points={[[0, 0], [1, 2.5], [3, 2]]}
      curve
      start_head
      head-size={px(12)}
      head-open
      head-curve={0.7}
      head-stroke={red}
      stroke={blue}
      stroke-width={px(3)}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Graph>
</Box>
