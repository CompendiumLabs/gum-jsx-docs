// Historical sample values from the old gallery, preserved as chart-demo data.
const labels = [
  "GPT-4o",
  "OpenAI o1",
  "OpenAI o4-mini",
  "Gemini 3 Pro",
  "OpenAI o3",
  "Grok 4",
  "Claude Opus 4.5",
  "GPT-5.2",
]
const values = [0.4, 3.2, 8.3, 12.4, 14.1, 15.9, 17.5, 25.2]
return (
  <Svg width={px(880)} height={px(560)} font-size={px(18)}>
    <BarPlot
      title="Rounded bars · gallery sample data"
      values={values}
      ylim={[0, 30]}
      xticks={enumerate(labels)}
      yticks={range(0, 31, 5)}
      xaxis-rotate={-40}
      font-size={px(15)}
      margin={px(24)}
      bar-width={0.8}
      radius={{ t: px(10) }}
      fill={blue}
      stroke={none}
    >
      {values.map((value, index) => (
        <Text x={index} y={value + 1.2} anchor="center" font-size={px(15)}>
          {value + "%"}
        </Text>
      ))}
    </BarPlot>
  </Svg>
)
