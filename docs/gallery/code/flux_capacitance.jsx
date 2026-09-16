// A translucent band between sine and cosine over one complete period.
<Svg width={px(760)} height={px(460)} font-size={px(18)}>
  <Plot
    title="Flux Capacitance"
    xlabel="Phase (radians)"
    ylabel="Interference"
    xlim={[0, tau]}
    ylim={[-1.5, 1.5]}
    font-size={px(16)}
    margin={px(20)}
  >
    <SymFill upper={sin} lower={cos} xlim={[0, tau]} fill={blue} stroke={none} opacity={0.22} />
    <SymLine fy={sin} xlim={[0, tau]} stroke={blue} stroke-width={px(2.5)} />
    <SymLine fy={cos} xlim={[0, tau]} stroke={purple} stroke-width={px(2.5)} />
  </Plot>
</Svg>
