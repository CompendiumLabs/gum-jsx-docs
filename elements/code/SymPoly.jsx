// SymPoly uses the shared sampler.
<Svg width={px(500)} height={px(320)} font-size={px(16)}>
  <Box padding={em(1.875)}>
    <Plot font-size={em(0.75)}>
      <SymPoly
        f={polar}
        tvals={linspace(0, tau, 100, false)}
        fill={blue}
        stroke={blue}
      />
    </Plot>
  </Box>
</Svg>
