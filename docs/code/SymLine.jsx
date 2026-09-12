// SymLine uses the shared sampler.
<Svg width={px(500)} height={px(320)}>
  <Box padding={px(30)} background="white">
    <Plot>
      <SymLine
        fy={Math.sin}
        xlim={[0, 2 * pi]}
        samples={101}
        stroke="#2563eb"
        stroke_width={px(2)}
      />
    </Plot>
  </Box>
</Svg>;
