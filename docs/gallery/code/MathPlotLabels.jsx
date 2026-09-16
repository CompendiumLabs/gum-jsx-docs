// Tick values, axis titles, the legend, and the plot title can all contain formulas.
const ticks = [
  [0, <Tex>0</Tex>],
  [pi / 2, <Tex>{String.raw`\frac\pi2`}</Tex>],
  [pi, <Tex>{String.raw`\pi`}</Tex>],
  [3 * pi / 2, <Tex>{String.raw`\frac{3\pi}{2}`}</Tex>],
  [tau, <Tex>{String.raw`2\pi`}</Tex>],
]
return (
  <Svg width={px(740)} height={px(420)} font-size={px(18)}>
    <Plot
      font-size={em(1)}
      title={
        <Text font-size={em(1.2)}>
          {"Phase shifts: "}
          <Tex>{String.raw`\cos x=\sin(x+\pi/2)`}</Tex>
        </Text>
      }
      xlabel={<Tex>x</Tex>}
      ylabel={<Tex>f(x)</Tex>}
      xlim={[0, tau]}
      ylim={[-1.2, 1.2]}
      xticks={ticks}
      yticks={[-1, 0, 1]}
      legend={[
        { label: <Tex>{String.raw`\sin x`}</Tex>, color: blue },
        { label: <Tex>{String.raw`\cos x`}</Tex>, color: red },
      ]}
    >
      <SymLine fy={sin} xlim={[0, tau]} stroke={blue} stroke-width={px(2.5)} />
      <SymLine fy={cos} xlim={[0, tau]} stroke={red} stroke-width={px(2.5)} />
    </Plot>
  </Svg>
)
