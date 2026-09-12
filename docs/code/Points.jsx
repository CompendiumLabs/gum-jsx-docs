// Custom markers in data coordinates.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background="white">
    <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
      <Points
        points={[
          { x: 0, y: 0 },
          { x: 1, y: 2 },
          { x: 2, y: 1 },
          { x: 3, y: 3 },
        ]}
        point_size={(p, i) => px(8 + i * 3)}
        shape={<Square fill="#2563eb" />}
      />
    </Graph>
  </Box>
</Svg>;
