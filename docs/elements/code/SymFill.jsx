// A sampled function band.
<Box padding={em(2)}>
  <Plot font-size={em(0.75)}>
    <SymFill
      xlim={[0, 6]}
      upper={(x) => sin(x) + 0.3}
      lower={(x) => sin(x) - 0.3}
      fill={blue}
    />
  </Plot>
</Box>
