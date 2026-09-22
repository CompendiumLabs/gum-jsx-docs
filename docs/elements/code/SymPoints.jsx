// SymPoints uses the shared sampler.
<Box padding={em(2)}>
  <Plot aspect={1.5}>
    <SymPoints
      fy={sin}
      xlim={[0, tau]}
      samples={17}
      fill={blue}
      point-size={px(7)}
    />
  </Plot>
</Box>
