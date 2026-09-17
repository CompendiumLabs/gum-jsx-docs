// Explicit labels and a directed axis with scoped line, tick, and text styles.
<Svg width={px(480)} height={px(300)} font-size={px(16)}>
  <Box padding={em(3)}>
    <Graph xlim={[0, 4]} ylim={[0, 1]}>
      <HAxis
        at={0.5}
        lim={[0, 4]}
        ticks={[
          [1, "Start"],
          [2, "Middle"],
          [3, "End"],
        ]}
        arrow
        arrow-open
        arrow-curve={0.5}
      />
      <VAxis
        lim={[0, 1]}
        ticks={[0, 0.25, 0.5, 0.75, 1]}
      />
    </Graph>
  </Box>
</Svg>
