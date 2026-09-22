// A sampled function band.
<Box padding={em(2)}>
  <Plot aspect={1.5}>
    <SymFill
      xlim={[0, 6]}
      upper={(x) => sin(x) + 0.3}
      lower={(x) => sin(x) - 0.3}
      fill={blue}
    />
  </Plot>
</Box>
