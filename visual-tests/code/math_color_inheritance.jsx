// Math color inherits through nested structures and can be overridden locally.
<Svg font-size={px(36)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.7)} justify="start" color={blue}>
      <MathText>
        x+
        <Frac>
          <MathText>a+b</MathText>
          <MathText color={red}>c+d</MathText>
        </Frac>
      </MathText>
      <Sqrt color={green}>
        <MathText>
          <SupSub sup="2">x</SupSub>
          +
          <SupSub sup="2" color={purple}>y</SupSub>
        </MathText>
      </Sqrt>
      <Enclose background={lightgray} border-color={blue}>
        <MathText color={slate}>highlighted</MathText>
      </Enclose>
    </MathCol>
  </Box>
</Svg>
