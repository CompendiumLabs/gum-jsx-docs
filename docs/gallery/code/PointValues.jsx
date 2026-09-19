// Zipped tuples and marker tuples share a plot and the same marker callbacks.
const xs = linspace(-pi, pi, 33)
const points = zip(xs, xs.map(sin))
const markers = [[-pi, 0], [-pi / 2, -1], [0, 0], [pi / 2, 1], [pi, 0]]
const shape = point => <Square radius={px(2)} fill={point.y < 0 ? red : blue} />
return <TextBox width="fill" font-size={px(20)} padding={em(1.5)} background={lightgray}>
  <TextCol gap={em(0.75)}>
    <Text font-size={em(1.625)} font-weight={bold}>Points as coordinate pairs</Text>
    <Plot font-size={em(0.75)} aspect={2} xlabel="x" ylabel="sin(x)">
      <CoordLine points={points} stroke={blue} stroke-width={px(2)} />
      <Points points={markers} point-size={px(10)} shape={shape} />
    </Plot>
    <Text font-size={em(0.75)}>
      zip(xs, ys) supplies the curve. Marker callbacks receive named x and y coordinates.
    </Text>
  </TextCol>
</TextBox>
