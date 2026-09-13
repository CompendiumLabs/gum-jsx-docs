// HBars with positive and negative values.
<Svg width={px(520)} height={px(340)}>
  <Box padding={px(30)} background="white">
    <Plot>
      <HBars
        values={[2, 4, -1, 3]}
        radius={px(4)}
        styles={(v) => ({ fill: v < 0 ? "#e8793c" : "#2563eb" })}
      />
    </Plot>
  </Box>
</Svg>;
