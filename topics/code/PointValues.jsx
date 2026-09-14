// Zipped tuples and marker tuples share a plot and the same marker callbacks.
const xs = linspace(-pi, pi, 33)
const points = zip(xs, xs.map(sin))
const markers = [[-pi, 0], [-pi / 2, -1], [0, 0], [pi / 2, 1], [pi, 0]]
return <Svg width={px(640)} font-size={px(16)}>
  <TextBox padding={em(1.5)} background={lightgray}>
    <TextCol gap={em(0.75)}>
      <Text font-size={em(1.625)} font-weight={bold}>Points as coordinate pairs</Text>
      <Plot font-size={em(0.75)} height={px(280)} xlabel="x" ylabel="sin(x)">
        <CoordLine points={points} stroke={blue} stroke-width={px(2)} />
        <Points points={markers} point-size={[px(8), px(12)]}
          shape={point => <Rect radius={px(2)} fill={point.y < 0 ? red : blue} />} />
      </Plot>
      <Text font-size={em(0.875)}>
        zip(xs, ys) supplies the curve. Marker callbacks receive named x and y coordinates.
      </Text>
    </TextCol>
  </TextBox>
</Svg>
