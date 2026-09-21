// One Bar with an explicit baseline.
<Box padding={em(2)}>
  <Plot font-size={em(0.75)}>
    <Bar
      value={3}
      position={1}
      base={-1}
      bar-width={0.6}
      fill={blue}
      border-radius={em(0.5)}
    />
  </Plot>
</Box>
