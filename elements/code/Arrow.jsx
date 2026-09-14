// Arrow in data coordinates with separately scoped head paint.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background={white}>
    <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
      <Arrow
        points={[[0, 0], [1, 2.5], [3, 2]]}
        curve
        start_head
        head_size={px(12)}
        head-fill={red}
        stroke={blue}
        stroke_width={px(3)}
        stroke-linecap="round"
      />
    </Graph>
  </Box>
</Svg>
