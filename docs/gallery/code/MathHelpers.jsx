// Bare math functions, periodic samples, and reductions in a complete plot.
const waves = [
  { label: 'sin(x)', fy: sin, color: blue },
  { label: 'cos(x)', fy: cos, color: red },
  { label: 'exp(-x/4) sin(x)', fy: x => exp(-x / 4) * sin(x), color: green },
]
const xs = linspace(0, tau, 16, false)
const ys = xs.map(sin)
const xticks = zip(
  range(5).map(i => i * pi / 2),
  ['0', 'pi/2', 'pi', '3pi/2', '2pi']
)
const entries = [
  { label: "Prediction", color: blue, kind: "point" },
  { label: "Sample", color: red, kind: "line" },
  { label: "Total", color: green, kind: "line" },
]
return <TextBox
  width="fill"
  font-size={px(20)}
  padding={em(1.5)}
  background={lightgray}
  color={slate}
>
  <TextCol gap={em(1)}>
    <Text font-size={em(1.75)} font-weight={bold}>Math, directly in JSX</Text>
    <Plot font-size={em(0.75)} aspect={2} xlim={[0, tau]}
      ylim={[-1.3, 1.3]} xlabel="x (radians)" xticks={xticks}>
      {waves.map(({ fy, color }) => <SymLine fy={fy} xlim={[0, tau]}
        stroke={color} stroke-width={px(2.5)} />)}
      <Points points={zip(xs, ys)}
        point-size={px(9)} fill={blue} stroke={white} stroke-width={px(1)} />
      <Legend x={3.1} y={1.2} anchor={["center", "start"]} font-size={em(0.9)}>
        {entries.map(({ label, color, ...options }) =>
          <LegendItem {...options} badge-color={color}>
            {label}
          </LegendItem>
        )}
      </Legend>
    </Plot>
    <Text font-family={mono} font-size={em(0.8)}>
      {xs.length} periodic samples. Mean: {rounder(mean(ys), 3)}. RMS: {rounder(norm(ys) / sqrt(ys.length), 3)}.
    </Text>
  </TextCol>
</TextBox>
