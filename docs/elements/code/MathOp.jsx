// MathOp: Named functions, large symbols, and explicit limit placement.
<Box font-size={px(32)} padding={em(0.8)}>
  <MathCol gap={em(0.7)} justify="start">
    <MathText>
      <MathOp>sin</MathOp>
      x+
      <MathOp>cos</MathOp>
      y
    </MathText>
    <MathText style="display">
      <SupSub sub="n=0" sup="∞">
        <MathOp>∑</MathOp>
      </SupSub>
      <SupSub sup="n">x</SupSub>
    </MathText>
    <MathText style="text">
      <SupSub sub="0" sup="1">
        <MathOp limits="always">∫</MathOp>
      </SupSub>
      f(x)dx
    </MathText>
  </MathCol>
</Box>
