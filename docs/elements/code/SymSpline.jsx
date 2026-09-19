// SymSpline uses the shared sampler.
<Box padding={em(1.875)}>
  <Plot font-size={em(0.75)}>
    <SymSpline
      fy={sin}
      xlim={[0, tau]}
      samples={13}
      stroke={blue}
      stroke-width={px(2)}
    />
  </Plot>
</Box>
