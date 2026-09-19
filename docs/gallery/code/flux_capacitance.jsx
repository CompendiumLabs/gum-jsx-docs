// A translucent band between sine and cosine over one complete period.
<Plot
  title="Flux Capacitance"
  xlabel="Phase (radians)"
  ylabel="Interference"
  xlim={[0, tau]}
  ylim={[-1.5, 1.5]}
  margin={em(1.25)}
>
  <SymFill upper={sin} lower={cos} xlim={[0, tau]} fill={blue} stroke={none} opacity={0.22} />
  <SymLine fy={sin} xlim={[0, tau]} stroke={blue} stroke-width={px(2.5)} />
  <SymLine fy={cos} xlim={[0, tau]} stroke={purple} stroke-width={px(2.5)} />
</Plot>
