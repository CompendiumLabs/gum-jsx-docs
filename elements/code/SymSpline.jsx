// SymSpline uses the shared sampler.
<Svg width={px(500)} height={px(320)}>
  <Box padding={px(30)} background={white}>
    <Plot>
      <SymSpline
        fy={sin}
        xlim={[0, tau]}
        samples={13}
        stroke={blue}
        stroke_width={px(2)}
      />
    </Plot>
  </Box>
</Svg>
