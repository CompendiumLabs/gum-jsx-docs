// The roots of x² + 2cx + 1 traced in (c, Re x, Im x) coordinates.
const branches = [
  { sign: 1, color: blue, label: String.raw`x_+ = -c + \sqrt{c^2 - 1}` },
  { sign: -1, color: red, label: String.raw`x_- = -c - \sqrt{c^2 - 1}` },
]

// Keep both components together, including the zero imaginary part of real roots.
const root = (c, sign) => ({
  x: c,
  y: -c + sign * sqrt(maximum(0, c * c - 1)),
  z: sign * sqrt(maximum(0, 1 - c * c)),
})
const axes = [
  { axis: 'x', lim: [-2.5, 2.5], ticks: [-2, -1, 1, 2], label: 'c' },
  { axis: 'y', lim: [-4.5, 4.5], ticks: [-4, -2, 2, 4], label: String.raw`\operatorname{Re}(x)` },
  { axis: 'z', lim: [-1.5, 1.6], ticks: [-1, 1], label: String.raw`\operatorname{Im}(x)` },
]

// Axes, tick labels, and curves all share the same three-dimensional frame.
const Axis = ({ axis, lim, ticks, label }) => {
  const point = value => ({ x: 0, y: 0, z: 0, [axis]: value })
  const offset = axis === 'z' ? { x: 0.22 } : { z: -0.22 }
  return (
    <>
      <Arrow
        from={point(lim[0])} to={point(lim[1])}
        stroke={slate} stroke-width={em(0.055)} head-size={em(0.35)}
      />
      <Points points={ticks.map(point)} point-size={em(0.15)} fill={slate} />
      {ticks.map(value => (
        <Text pos={{ ...point(value), ...offset }} color={slate} font-size={em(0.65)}>
          {value}
        </Text>
      ))}
      <Tex
        pos={point(lim[1] + 0.35)} font-size={em(0.9)}
        anchor={axis === 'y' ? ['end', 'center'] : 'center'}
      >
        {label}
      </Tex>
    </>
  )
}

return (
  <TextBox width={em(36)} font-size={px(20)} padding={em(1.2)} background={white} fit>
    <VStack gap={em(1)} align="center">
      <Tex font-size={em(1.4)}>x^2 + 2cx + 1 = 0</Tex>
      <Graph
        width="fill" aspect={2.5}
        projection={isometric_projection()}
        xlim={[-5, 5]} ylim={[-2.75, 2.5]}
      >
        {/* A light grid marks the plane where the roots are real. */}
        {range(-2, 3).map(c => (
          <Line
            from={{ x: c, y: -4, z: 0 }} to={{ x: c, y: 4, z: 0 }}
            stroke={lightgray} stroke-width={em(0.035)}
          />
        ))}
        {range(-4, 5).map(a => (
          <Line
            from={{ x: -2, y: a, z: 0 }} to={{ x: 2, y: a, z: 0 }}
            stroke={lightgray} stroke-width={em(0.035)}
          />
        ))}
        {axes.map(axis => <Axis {...axis} />)}
        {branches.map(({ sign, color }) => (
          <SymLine
            f={c => root(c, sign)} tlim={[-2, 2]} samples={401}
            stroke={color} stroke-width={em(0.14)}
          />
        ))}
        <Points
          points={[-1, 1].map(c => root(c, 1))}
          point-size={em(0.38)} fill={slate}
        />
      </Graph>
      <HStack gap={em(2)}>
        {branches.map(({ color, label }) => (
          <Tex color={color} font-size={em(1.1)}>{label}</Tex>
        ))}
      </HStack>
    </VStack>
  </TextBox>
)
