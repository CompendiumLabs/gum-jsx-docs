// Positive vertical bars with rounded tops and square baselines.
<Box padding={em(2)}>
  <Plot font-size={em(0.75)}>
    <VBars
      values={[2, 4, 1, 3]}
      border-radius={{ t: em(0.5) }}
      fill={blue}
    />
  </Plot>
</Box>
