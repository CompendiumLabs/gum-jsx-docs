// SymPoly uses the shared sampler.
<Box padding={em(2)}>
  <Plot font-size={em(0.75)}>
    <SymPoly
      f={polar}
      tvals={linspace(0, tau, 100, false)}
      fill={blue}
      stroke={blue}
    />
  </Plot>
</Box>
