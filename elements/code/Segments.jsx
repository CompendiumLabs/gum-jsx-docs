// Segments in data coordinates.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background="white">
    <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
      <Segments
        segments={range(3).map(x => [[x, 0], [x + 1, 3]])}
        stroke="#2563eb"
        stroke_width={px(3)}
      />
    </Graph>
  </Box>
</Svg>;
