// Tick values, axis titles, the legend, and the plot title can all contain formulas.
const ticks = [
  [0, <Tex>0</Tex>],
  [pi / 2, <Tex>{String.raw`\frac{\pi}{2}`}</Tex>],
  [pi, <Tex>{String.raw`\pi`}</Tex>],
  [3 * pi / 2, <Tex>{String.raw`\frac{3\pi}{2}`}</Tex>],
  [tau, <Tex>{String.raw`2\pi`}</Tex>],
]
const title = <Text font-size={em(1.2)}>
  Phase shifts: <Tex>\cos x = \sin(x+\pi/2)</Tex>
</Text>
return (
  <Plot
    aspect={1.5}
    font-size={px(25)}
    title={title}
    xlabel={<Tex>x</Tex>}
    ylabel={<Tex>f(x)</Tex>}
    xlim={[0, tau]}
    ylim={[-1.2, 1.2]}
    xticks={ticks}
    yticks={[-1, 0, 1]}
  >
    <SymLine fy={sin} xlim={[0, tau]} stroke={blue} stroke-width={px(2.5)} />
    <SymLine fy={cos} xlim={[0, tau]} stroke={red} stroke-width={px(2.5)} />
    <Legend x={pi} y={1} anchor="start">
      <LegendItem badge-color={blue}><Tex>{String.raw`\sin x`}</Tex></LegendItem>
      <LegendItem badge-color={red}><Tex>{String.raw`\cos x`}</Tex></LegendItem>
    </Legend>
  </Plot>
)
