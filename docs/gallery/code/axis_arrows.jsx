// Directed plot axes with curved arrowheads and a logarithmic curve.
<Svg width={px(720)} height={px(460)} font-size={px(18)}>
  <Plot
    title="Axes with arrows"
    xlim={[1, 5]}
    ylim={[0, 2]}
    xticks={range(1, 6)}
    yticks={linspace(0, 2, 5)}
    xaxis-line={false}
    yaxis-line={false}
    clip={false}
    margin={px(24)}
    font-size={px(16)}
  >
    <Arrow from={[1, 0]} to={[5, 0]} stroke={slate} head-size={px(9)} head-curve={0.5} />
    <Arrow from={[1, 0]} to={[1, 2]} stroke={slate} head-size={px(9)} head-curve={0.5} />
    <SymLine fy={log} xlim={[1, 5]} stroke={blue} stroke-width={px(3)} />
  </Plot>
</Svg>
