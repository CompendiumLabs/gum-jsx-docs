// MathSpacer: Explicit glue with a signed logical advance.
<Box font-size={px(32)} padding={em(0.65)}>
  <MathCol gap={em(0.5)} justify="start">
    <MathText>ab</MathText>
    <MathText>
      <MathSymbol>a</MathSymbol>
      <MathSpacer advance={em(-1 / 6)} />
      <MathSymbol>b</MathSymbol>
    </MathText>
  </MathCol>
</Box>
