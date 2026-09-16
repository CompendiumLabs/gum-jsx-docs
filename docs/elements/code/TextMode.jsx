// Literal math text preserves spaces, while nested math keeps its own notation and fonts.
<Svg font-size={px(30)}>
  <Box padding={em(1)}>
    <VStack gap={em(0.9)} align="start">
      <MathText>
        <TextMode>average speed = </TextMode>
        <Frac>
          <TextMode>distance</TextMode>
          <TextMode>time</TextMode>
        </Frac>
      </MathText>
      <TextMode>
        {"Literal x^2; mathematical "}
        <MathText>
          <SupSub sup="2">x</SupSub>
        </MathText>
        {"."}
      </TextMode>
      <MathText>
        <SupSub sub={<TextMode>average</TextMode>}>v</SupSub>
        =
        <Frac>
          <MathText>d</MathText>
          <MathText>t</MathText>
        </Frac>
      </MathText>
    </VStack>
  </Box>
</Svg>
