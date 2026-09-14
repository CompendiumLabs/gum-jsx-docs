// Mixed point forms; callbacks always receive named coordinates.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background={white}>
    <Graph xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
      <Points
        points={[[0, 0], [1, 2], [2, 1], [3, 3]]}
        point-size={p => px(8 + p.x * 3)}
        shape={<Square fill={blue} />}
      />
    </Graph>
  </Box>
</Svg>
