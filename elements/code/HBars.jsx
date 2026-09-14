// Positive horizontal bars with rounded right ends and square baselines.
<Svg width={px(520)} height={px(340)} font-size={px(16)}>
  <Box padding={em(1.875)}>
    <Plot font-size={em(0.75)}>
      <HBars
        values={[2, 4, 1, 3]}
        radius={{ r: px(6) }}
        fill={blue}
      />
    </Plot>
  </Box>
</Svg>
