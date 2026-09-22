// Positive vertical bars with rounded tops and square baselines.
<Box padding={em(2)}>
  <Plot aspect={1.5}>
    <VBars
      values={[2, 4, 1, 3]}
      border-radius={{ t: em(0.5) }}
      fill={blue}
    />
  </Plot>
</Box>
