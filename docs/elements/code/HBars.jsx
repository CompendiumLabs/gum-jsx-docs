// Positive horizontal bars with rounded right ends and square baselines.
<Box padding={em(1.875)}>
  <Plot font-size={em(0.75)}>
    <HBars
      values={[2, 4, 1, 3]}
      radius={{ r: em(0.5) }}
      fill={blue}
    />
  </Plot>
</Box>
