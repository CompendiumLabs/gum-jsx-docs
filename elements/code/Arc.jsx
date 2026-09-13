// Arc in data coordinates.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background="white">
    <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
      <Arc
        center={[1.5, 1.5]}
        radius={[1.4, 1]}
        start={20}
        end={320}
        stroke="#2563eb"
        stroke_width={px(3)}
      />
    </Graph>
  </Box>
</Svg>;
