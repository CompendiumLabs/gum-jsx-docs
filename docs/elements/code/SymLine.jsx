// SymLine uses the shared sampler.
<Plot aspect={1.5} margin={em(2)}>
  <SymLine
    fy={sin}
    xlim={[0, tau]}
    samples={101}
    stroke={blue}
    stroke-width={px(2)}
  />
</Plot>
