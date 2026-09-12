// SymPoly uses the shared sampler.
<Svg width={px(500)} height={px(320)}>
  <Box padding={px(30)} background="white">
    <Plot>
      <SymPoly
        f={(t) => [Math.cos(t), Math.sin(t)]}
        tlim={[0, 2 * pi]}
        fill="#dbeafe"
        stroke="#2563eb"
      />
    </Plot>
  </Box>
</Svg>;
