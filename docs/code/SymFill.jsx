// A sampled function band.
<Svg width={px(500)} height={px(320)}>
  <Box padding={px(30)} background="white">
    <Plot><SymFill xlim={[0,6]} upper={x=>Math.sin(x)+0.3} lower={x=>Math.sin(x)-0.3} fill="#93c5fd"/></Plot>
  </Box>
</Svg>
