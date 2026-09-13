// Explicit labels and a directed axis with scoped line, tick, and text styles.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background={white}>
    <Graph xlim={[0, 4]} ylim={[0, 1]}>
      <HAxis
        lim={[0, 4]}
        ticks={[
          [0, "Start"],
          [2, "Middle"],
          [4, "End"],
        ]}
        arrow
        line-stroke={blue}
        tick-stroke-width={px(2)}
        label-color={blue}
      />
      <VAxis lim={[0, 1]} />
    </Graph>
  </Box>
</Svg>;
