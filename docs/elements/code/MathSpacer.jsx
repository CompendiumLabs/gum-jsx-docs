// MathSpacer: Explicit glue with a signed logical advance.
<Svg font-size={px(32)}>
  <Box padding={em(0.65)}>
    <MathCol gap={em(0.5)} justify="start">
      <MathText>ab</MathText>
      <MathText>
        <MathSymbol text="a" />
        <MathSpacer advance={em(-1 / 6)} />
        <MathSymbol text="b" />
      </MathText>
    </MathCol>
  </Box>
</Svg>
