// Positive horizontal bars with rounded right ends and square baselines.
<Box padding={em(2)}>
  <Plot aspect={1.5}>
    <HBars
      values={[2, 4, 1, 3]}
      border-radius={{ r: em(0.5) }}
      fill={blue}
    />
  </Plot>
</Box>
