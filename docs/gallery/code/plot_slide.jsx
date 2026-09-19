// A slide composes a measured title, figure, and caption at a stable type scale.
<Slide aspect={1.5} title="From samples to a figure">
  <Plot
    grow={1}
    width={0.9}
    align-self="center"
    title="Sine and cosine"
    xlabel="Phase (rad)"
    ylabel="Value"
    xlim={[0, tau]}
    ylim={[-1.2, 1.2]}
    font-size={em(0.75)}
  >
    <SymLine fy={sin} xlim={[0, tau]} stroke={blue} stroke-width={px(2)} />
  </Plot>
  <Text color={darkgray} font-size={em(0.9)}>A common sampler supports scalar functions and parametric curves.</Text>
</Slide>
