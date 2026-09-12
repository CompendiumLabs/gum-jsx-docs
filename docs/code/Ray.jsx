// Ray in data coordinates.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background="white">
    <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
      <Ray
        origin={{ x: 1, y: 1 }}
        angle={-30}
        length={px(150)}
        stroke="#2563eb"
        stroke_width={px(3)}
      />
    </Graph>
  </Box>
</Svg>;
