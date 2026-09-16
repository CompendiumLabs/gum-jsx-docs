// Positive vertical bars with rounded tops and square baselines.
<Svg width={px(520)} height={px(340)} font-size={px(16)}>
  <Box padding={em(1.875)}>
    <Plot font-size={em(0.75)}>
      <VBars
        values={[2, 4, 1, 3]}
        radius={{ t: px(6) }}
        fill={blue}
      />
    </Plot>
  </Box>
</Svg>
