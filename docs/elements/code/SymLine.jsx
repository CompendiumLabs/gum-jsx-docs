// SymLine uses the shared sampler.
<Svg height={px(350)}>
  <Plot margin={em(2)}>
    <SymLine
      fy={sin}
      xlim={[0, tau]}
      samples={101}
      stroke={blue}
      stroke-width={px(2)}
    />
  </Plot>
</Svg>
