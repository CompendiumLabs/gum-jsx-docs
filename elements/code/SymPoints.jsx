// SymPoints uses the shared sampler.
<Svg width={px(500)} height={px(320)}>
  <Box padding={px(30)}>
    <Plot>
      <SymPoints
        fy={sin}
        xlim={[0, tau]}
        samples={17}
        fill={blue}
        point_size={px(7)}
      />
    </Plot>
  </Box>
</Svg>
