// SymPoints uses the shared sampler.
<Svg width={px(500)} height={px(320)} font-size={px(16)}>
  <Box padding={em(1.875)}>
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
</Svg>
