// Large operators place limits above and below only in the selected styles.
<Svg width={px(900)} font-size={px(36)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.9)} justify="start">
      <MathText style="display">
        <SupSub sub="i=1" sup="n">
          <MathOp>∑</MathOp>
        </SupSub>
        <MathText>x_i</MathText>
        +
        <SupSub sub="A" sup="B">
          <MathOp>∫</MathOp>
        </SupSub>
        <MathText>f(x)dx</MathText>
      </MathText>
      <MathText style="text">
        <SupSub sub="i=1" sup="n">
          <MathOp>∑</MathOp>
        </SupSub>
        <MathText>x_i</MathText>
        +
        <SupSub sub="0" sup="1">
          <MathOp limits="always">∫</MathOp>
        </SupSub>
        <MathText>g(t)dt</MathText>
      </MathText>
    </MathCol>
  </Box>
</Svg>
