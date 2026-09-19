// Sqrt: Cramped radicands, root indices, and growing surds with a continuous rule.
<Box font-size={px(36)} padding={em(0.8)}>
  <MathCol gap={em(0.7)} justify="start">
    <Sqrt>
      <MathText>
        <SupSub sup="2">b</SupSub>
        -4ac
      </MathText>
    </Sqrt>
    <Sqrt index="3" color={blue}>
      <MathText>x+y</MathText>
    </Sqrt>
    <Sqrt style="display">
      <Frac>
        <MathText>a+b</MathText>
        <MathText>c+d</MathText>
      </Frac>
    </Sqrt>
  </MathCol>
</Box>
