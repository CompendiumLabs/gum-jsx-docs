// Real and imaginary components of the roots of x² + 2cx + 1.
const Curve = ({ fx, ylim, color }) => (
  <SymLine fx={fx} ylim={ylim} samples={200} stroke={color} stroke-width={px(2.5)} />
)
return <Plot fit grid margin={em(1.4)} font-size={em(0.75)}
  aspect={1.7} xlim={[-4, 4]} ylim={[-2, 2]}
  xlabel={<Tex font-size={em(1.25)}>x=a+bi</Tex>}
  ylabel={<Tex font-size={em(1.25)}>c</Tex>}
  xticks={range(-4, 5)} yticks={linspace(-2, 2, 9)}
>
  <Line from={[-4, 0]} to={[4, 0]} stroke={darkgray} />
  <Line from={[0, -2]} to={[0, 2]} stroke={darkgray} />
  <Line from={[-2, 2]} to={[2, -2]} stroke-dasharray={px(3)} />
  <Line from={[0, 2]} to={[0, -2]} stroke-dasharray={px(3)} />
  <Curve fx={(c) => -c + sqrt(maximum(0, c * c - 1))} ylim={[-2, 2]} color={blue} />
  <Curve fx={(c) => -c - sqrt(maximum(0, c * c - 1))} ylim={[-2, 2]} color={blue} />
  <Curve fx={(c) => sqrt(maximum(0, 1 - c * c))} ylim={[-2, 2]} color={red} />
  <Curve fx={(c) => -sqrt(maximum(0, 1 - c * c))} ylim={[-2, 2]} color={red} />
  <Points points={[[-1, 1], [1, -1]]} point-size={px(7)} fill={blue} />
  <Points points={[[0, -1], [0, 1]]} point-size={px(7)} fill={red} />
  <Points points={[[0, 0]]} point-size={px(7)} fill={slate} />
  <Text pos={[-2.6, 1.2]} color={blue} font-size={em(1.3)}>real</Text>
  <Text pos={[1.5, -0.25]} color={red} font-size={em(1.3)}>imag</Text>
  <Tex pos={[2.5, 1.75]} font-size={em(1.3)}>f(x)=x^2+2cx+1</Tex>
</Plot>