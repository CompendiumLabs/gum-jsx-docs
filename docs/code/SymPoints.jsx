// SymPoints uses the shared sampler.
<Svg width={px(500)} height={px(320)}>
  <Box padding={px(30)} background="white">
    <Plot><SymPoints fy={Math.sin} xlim={[0,2*pi]} samples={17} fill="#2563eb" point_size={px(7)}/></Plot>
  </Box>
</Svg>
