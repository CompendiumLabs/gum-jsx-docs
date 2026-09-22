// SymSpline uses the shared sampler.
<Box padding={em(2)}>
  <Plot aspect={1.5}>
    <SymSpline
      fy={sin}
      xlim={[0, tau]}
      samples={13}
      stroke={blue}
      stroke-width={px(2)}
    />
  </Plot>
</Box>
