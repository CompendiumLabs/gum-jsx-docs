// Directed limits reverse x while annotations and custom markers remain upright.
const samples = [
  [1, 2],
  [3, 4],
  [6, 3],
  [8, 7],
]
return <Box padding={em(1.75)}>
  <Graph aspect={1.5} xlim={[10, 0]} ylim={[0, 8]}>
    <Mesh2D xlim={[0, 10]} ylim={[0, 8]} />
    <Spline points={samples} stroke={blue} stroke-width={px(2)} />
    <Points
      points={samples}
      point-size={(p, i) => px(8 + i * 2)}
      shape={<Square fill={blue} stroke={white} stroke-width={px(1)} />}
    />
    <Text x={8} y={7.25} anchor={['center', 'end']} font-size={em(0.9)} color={blue}>Peak</Text>
    <HAxis lim={[10, 0]} />
    <VAxis lim={[0, 8]} />
  </Graph>
</Box>
