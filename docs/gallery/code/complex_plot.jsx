// Real and imaginary components of the roots of x² + 2cx + 1.
const Curve = ({ fx, ylim, color }) => (
  <SymLine fx={fx} ylim={ylim} samples={301} stroke={color} stroke-width={px(2.5)} />
)
return (
  <Svg width={px(800)} height={px(460)} font-size={px(18)}>
    <Plot
      xlim={[-4, 4]}
      ylim={[-2, 2]}
      font-size={px(16)}
      margin={px(20)}
      xlabel={<Tex>x=a+bi</Tex>}
      ylabel={<Tex>c</Tex>}
      xticks={range(-4, 5)}
      yticks={linspace(-2, 2, 9)}
    >
      <CoordLine
        points={[
          [-4, 0],
          [4, 0],
        ]}
        stroke={darkgray}
      />
      <CoordLine
        points={[
          [0, -2],
          [0, 2],
        ]}
        stroke={darkgray}
      />
      {[
        [-2, -1],
        [1, 2],
      ].map((lim) => (
        <>
          <Curve fx={(c) => -c + sqrt(maximum(0, c * c - 1))} ylim={lim} color={blue} />
          <Curve fx={(c) => -c - sqrt(maximum(0, c * c - 1))} ylim={lim} color={blue} />
        </>
      ))}
      <Curve fx={(c) => sqrt(maximum(0, 1 - c * c))} ylim={[-1, 1]} color={red} />
      <Curve fx={(c) => -sqrt(maximum(0, 1 - c * c))} ylim={[-1, 1]} color={red} />
      <Points
        points={[
          [-1, 1],
          [1, -1],
        ]}
        point-size={px(8)}
        fill={blue}
      />
      <Points
        points={[
          [0, -1],
          [0, 1],
        ]}
        point-size={px(8)}
        fill={red}
      />
      <Points points={[[0, 0]]} point-size={px(7)} fill={slate} />
      <Text x={-2.6} y={1.1} anchor="center" color={blue} font-size={px(22)}>
        real
      </Text>
      <Text x={1.6} y={-0.4} anchor="center" color={red} font-size={px(22)}>
        imag
      </Text>
      <Tex x={1.9} y={1.65} anchor="center" font-size={px(23)}>
        f(x)=x^2+2cx+1
      </Tex>
    </Plot>
  </Svg>
)
