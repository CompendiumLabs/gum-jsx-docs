// Zipped tuples and marker tuples share a plot and the same marker callbacks.
const xs = linspace(-pi, pi, 33)
const points = zip(xs, xs.map(sin))
const markers = [[-pi, 0], [-pi / 2, -1], [0, 0], [pi / 2, 1], [pi, 0]]
return <Svg width={px(640)}>
  <Box padding={px(24)} background={lightgray}>
    <VStack gap={px(12)} align="stretch">
      <Text font-size={px(26)} font-weight={bold}>Points as coordinate pairs</Text>
      <Plot height={px(280)} xlabel="x" ylabel="sin(x)" background={white}>
        <CoordLine points={points} stroke={blue} stroke-width={px(2)} />
        <Points points={markers} point-size={[px(8), px(12)]}
          shape={point => <Rect radius={px(2)} fill={point.y < 0 ? red : blue} />} />
      </Plot>
      <Text font-size={px(14)}>
        zip(xs, ys) supplies the curve. Marker callbacks receive named x and y coordinates.
      </Text>
    </VStack>
  </Box>
</Svg>
