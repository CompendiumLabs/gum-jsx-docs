// Segments in data coordinates.
<Box padding={em(1.875)}>
  <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
    <Segments
      segments={range(3).map(x => [[x, 0], [x + 1, 3]])}
      stroke={blue}
      stroke_width={px(3)}
    />
  </Graph>
</Box>
