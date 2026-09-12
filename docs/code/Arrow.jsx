// Arrow in data coordinates.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background="white">
    <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
      <Arrow
        points={[
          { x: 0, y: 0 },
          { x: 1, y: 2.5 },
          { x: 3, y: 2 },
        ]}
        curve
        start_head
        head_size={px(12)}
        stroke="#2563eb"
        stroke_width={px(3)}
      />
    </Graph>
  </Box>
</Svg>;
