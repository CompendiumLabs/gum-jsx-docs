// TextMode face combinations preserve literal spaces and mix with nested math.
<Svg font-size={px(34)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.7)} justify="start">
      <MathText>x=<TextMode>ordinary words</TextMode>+y</MathText>
      <MathText>
        <TextMode bold>bold words</TextMode>
        \quad
        <TextMode italic>italic words</TextMode>
        \quad
        <TextMode bold italic>both</TextMode>
      </MathText>
      <MathText>
        <TextMode family="sans">sans serif</TextMode>
        \quad
        <TextMode family="mono">mono text</TextMode>
      </MathText>
      <TextMode>
        {"Literal x^2; nested math: "}
        <MathText>
          <SupSub sup="2">x</SupSub>
          +1
        </MathText>
      </TextMode>
    </MathCol>
  </Box>
</Svg>
