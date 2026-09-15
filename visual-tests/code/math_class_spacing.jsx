// TeX atom classes insert binary, relation, punctuation, and operator spacing.
<Svg font-size={px(35)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.7)} justify="start">
      <Latex>{String.raw`a+b-c\times d\div e`}</Latex>
      <Latex>{String.raw`a=b\leq c\approx d\in E`}</Latex>
      <Latex>{String.raw`f(x,y;z)\quad \sin x+\log y`}</Latex>
      <MathText>
        a<MathSpacer advance="thin" />b
        <MathSpacer advance="quad" />c
        <MathSpacer advance="qquad" />d
      </MathText>
    </MathCol>
  </Box>
</Svg>
