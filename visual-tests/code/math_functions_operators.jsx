// Named functions, ordinary symbols, and large operators use different spacing rules.
<Svg width={px(820)} font-size={px(36)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.7)} justify="start">
      <Latex>{String.raw`\sin x+\cos y=\tan z`}</Latex>
      <Latex>{String.raw`\log_a x+\ln y+\exp(-t)`}</Latex>
      <Latex>{String.raw`\lim_{x\to0}\frac{\sin x}{x}=1`}</Latex>
      <Latex>{String.raw`\operatorname{argmax}_{x\in X} f(x)`}</Latex>
    </MathCol>
  </Box>
</Svg>
