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
const values = [1.3, 3.2, 8.3, 12.4, 14.1, 15.9, 17.5, 25.2]
return <Svg height={px(500)}>
  <BarPlot
    title="Rounded bars · gallery sample data"
    values={values}
    ylim={[0, 30]}
    font-size={em(1)}
    xticks={enumerate(labels)}
    yticks={range(0, 31, 5)}
    xaxis-at={-1.1}
    yaxis-at={-0.7}
    yaxis-tick-side="inner"
    ygrid
    xaxis-lim={[0, 7]}
    xaxis-rotate={-40}
    xaxis-label-anchor={['end', 'start']}
    axis-tick-size={em(0.5)}
    margin={px(24)}
    bar-width={0.8}
    radius={{ t: px(5) }}
    fill={blue}
    aspect={1.3}
  >
    {values.map((value, index) => (
      <Text x={index} y={value + 1.2} anchor="center">
        {value + "%"}
      </Text>
    ))}
  </BarPlot>
</Svg>
