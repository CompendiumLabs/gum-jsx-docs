// Accents keep their attachment points when scripts and wide bodies are combined.
<Svg width={px(720)} font-size={px(38)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.7)} justify="start">
      <MathText>
        <SupSub sup="2" sub="i">
          <Accent accent="hat">x</Accent>
        </SupSub>
        +
        <SupSub sup="n">
          <Accent accent="vec">v</Accent>
        </SupSub>
      </MathText>
      <MathText>
        <Accent accent="widehat">
          <MathText>a+b+c+d</MathText>
        </Accent>
        +
        <Accent accent="widetilde">
          <MathText>XYZ</MathText>
        </Accent>
      </MathText>
      <MathText>
        <Accent accent="utilde" under={true}>
          <MathText>p+q+r</MathText>
        </Accent>
      </MathText>
    </MathCol>
  </Box>
</Svg>
