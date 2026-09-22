// Categorical ticks, positive and negative bars, and functional bar colors.
<Svg width={px(640)} height={px(380)} font-size={px(16)}>
  <BarPlot ygrid
    values={[28, 43, -17, 56, 34]}
    title="Change by region"
    xlabel="Region"
    ylabel="Change (%)"
    xlim={[-1, 5]}
    ylim={[-20, 60]}
    bar-width={0.7}
    xticks={enumerate(["North", "East", "Central", "South", "West"])}
    styles={(value) => ({
      fill: value < 0 ? red : blue,
      border_radius: value < 0 ? {b: em(0.3)} : {t: em(0.3)},
    })}
  >
    <CoordLine points={[[-1, 0], [5, 0]]} stroke={darkgray} />
  </BarPlot>
</Svg>
