// Categorical ticks, positive and negative bars, and functional bar colors.
<BarPlot
  font-size={em(1)}
  values={[28, 43, -17, 56, 34]}
  title="Change by region"
  xlabel="Region"
  ylabel="Change (%)"
  ylim={[-20, 60]}
  padding={0.025}
  bar-width={0.7}
  xticks={enumerate(["North", "East", "Central", "South", "West"])}
  xaxis-label-font-size={em(0.8)}
  styles={(value) => ({
    fill: value < 0 ? red : blue,
    radius: value < 0 ? {'b': em(0.25)} : {'t': em(0.25)},
  })}
>
  <CoordLine points={[[-0.5, 0], [4.5, 0]]} stroke={darkgray} />
</BarPlot>
