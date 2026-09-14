// Directed limits reverse x while annotations and custom markers remain upright.
const samples = [
  [1, 2],
  [3, 4],
  [6, 3],
  [8, 7],
]
return (
  <Svg width={px(540)} height={px(330)}>
    <Box padding={px(28)}>
      <Graph xlim={[10, 0]} ylim={[0, 8]}>
        <Mesh2D xlim={[0, 10]} ylim={[0, 8]} />
        <Spline points={samples} stroke={blue} stroke_width={px(2)} />
        <Points
          points={samples}
          point_size={(p, i) => px(8 + i * 2)}
          shape={<Square fill={blue} stroke={white} stroke_width={px(1)} />}
        />
        <Text x={8} y={7} anchor={['center', 'end']} font_size={px(14)} color={blue}>Peak</Text>
        <HAxis lim={[10, 0]} />
        <VAxis lim={[0, 8]} />
      </Graph>
    </Box>
  </Svg>
)
