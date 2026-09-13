// SymPoly uses the shared sampler.
<Svg width={px(500)} height={px(320)}>
  <Box padding={px(30)} background={white}>
    <Plot>
      <SymPoly
        f={polar}
        tvals={linspace(0, tau, 100, false)}
        fill={blue}
        stroke={blue}
      />
    </Plot>
  </Box>
</Svg>;
