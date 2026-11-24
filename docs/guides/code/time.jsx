// Calendar months and quarter-hour ticks use the same numeric plotting coordinates.
const months = time_range("2026-01-01", "2026-07-01", "month")
const values = [12, 18, 15, 24, 21, 29]
const xlim = [months[0], months[months.length - 1]]
const clock_lim = [timestamp("2026-01-01T08:00"), timestamp("2026-01-01T09:00")]
const minutes = time_range(clock_lim[0], clock_lim[1], "minute", 5)
const readings = minutes.map((time, i) => [time, 20 + 3 * sin(i / 2)])

return <TextBox width="fill" padding={em(1)} font-size={px(18)} background={white}>
  <TextCol gap={em(1)}>
    <Text font-size={em(1.5)} font-weight={bold}>Dates and times</Text>
    <Plot
      title="Calendar months"
      aspect={2.8}
      xlim={xlim}
      ylim={[0, 30]}
      xticks={time_ticks(xlim, 6)}
      xaxis-format={value => format_time(value, "%b")}
      ygrid
    >
      <Polyline points={zip(months, values)} stroke={blue} stroke-width={em(0.15)} />
      <Points points={zip(months, values)} point-size={em(0.4)} fill={blue} />
    </Plot>
    <Plot
      title="Every 15 minutes"
      aspect={2.8}
      xlim={clock_lim}
      ylim={[15, 25]}
      xticks={time_range(...clock_lim, "minute", 15)}
      xaxis-format={value => format_time(value, "%H:%M")}
      ygrid
    >
      <Polyline points={readings} stroke={green} stroke-width={em(0.15)} />
    </Plot>
  </TextCol>
</TextBox>
