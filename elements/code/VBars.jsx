// VBars with positive and negative values.
<Svg width={px(520)} height={px(340)} font-size={px(16)}>
  <Box padding={em(1.875)}>
    <Plot font-size={em(0.75)}>
      <VBars
        values={[2, 4, -1, 3]}
        radius={px(4)}
        styles={(v) => ({ fill: v < 0 ? red : blue })}
      />
    </Plot>
  </Box>
</Svg>
