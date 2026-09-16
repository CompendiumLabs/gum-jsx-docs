// Categorical ticks and value-dependent bar colors and rounded ends.
const values = [28, 43, -17, 56, 34]
return (
  <Svg width={px(640)} height={px(380)} font-size={px(12)}>
    <BarPlot
      font-size={em(1)}
      values={values}
      title="Change by region"
      xlabel="Region"
      ylabel="Change (%)"
      xticks={enumerate(["North", "East", "Central", "South", "West"])}
      styles={(value) => ({
        fill: value < 0 ? red : green,
        radius: value < 0 ? { b: px(6) } : { t: px(6) },
      })}
      padding={[0.12, 0.1]}
    >
      <CoordLine
        points={[
          [-0.6, 0],
          [4.6, 0],
        ]}
        stroke={blue}
      />
    </BarPlot>
  </Svg>
)
