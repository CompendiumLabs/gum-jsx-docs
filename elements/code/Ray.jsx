// Ray in data coordinates.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)}>
    <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
      <Ray
        origin={[1, 1]}
        angle={-30}
        length={px(150)}
        stroke={blue}
        stroke_width={px(3)}
      />
    </Graph>
  </Box>
</Svg>
