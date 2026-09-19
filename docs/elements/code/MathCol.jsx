// MathCol: Stack math elements vertically, with an explicit gap and horizontal alignment.
<Box font-size={px(32)} padding={em(0.65)}>
  <MathCol gap={em(0.4)} justify="start">
    <Latex>a+b=c</Latex>
    <Latex>α+β=γ</Latex>
    <Latex>{String.raw`\sin(x+y)`}</Latex>
  </MathCol>
</Box>
