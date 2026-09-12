// ArrowHead in data coordinates.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background="white">
    <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
      <ArrowHead
        tip={{ x: 2, y: 2 }}
        angle={-30}
        head_size={px(45)}
        fill="#2563eb"
        stroke="#2563eb"
      />
    </Graph>
  </Box>
</Svg>;
