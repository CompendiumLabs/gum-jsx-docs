// A sampled curve, uncertainty band, observations, and a measured legend.
const wave = (x) => sin(x) * exp(-x / 9)
const observations = linspace(0.4, 11.8, 15).map((x, i) => [
  x,
  wave(x) + 0.08 * cos(i * 3),
])
return (
  <Plot
    aspect={1.5}
    title="A damped oscillation"
    xlabel="Time (s)"
    ylabel="Amplitude"
    xlim={[0, 12]}
    ylim={[-1.3, 1.3]}
    legend={[
      { label: "Model", color: blue },
      { label: "Observations", kind: "point", color: red },
    ]}
  >
    <SymFill
      xlim={[0, 12]}
      upper={(x) => wave(x) + 0.16}
      lower={(x) => wave(x) - 0.16}
      fill={blue}
      opacity={0.25}
    />
    <SymLine
      xlim={[0, 12]}
      fy={wave}
      samples={241}
      stroke={blue}
      stroke-width={px(2.5)}
    />
    <Points points={observations} fill={red} point-size={px(7)} />
  </Plot>
)
