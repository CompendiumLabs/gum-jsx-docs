// SymPoints uses the shared sampler.
<Box padding={em(2)}>
  <Plot font-size={em(0.75)}>
    <SymPoints
      fy={sin}
      xlim={[0, tau]}
      samples={17}
      fill={blue}
      point-size={px(7)}
    />
  </Plot>
</Box>
