// A sampled function band.
<Box padding={em(1.875)}>
  <Plot font-size={em(0.75)}>
    <SymFill
      xlim={[0, 6]}
      upper={(x) => sin(x) + 0.3}
      lower={(x) => sin(x) - 0.3}
      fill={blue}
    />
  </Plot>
</Box>
