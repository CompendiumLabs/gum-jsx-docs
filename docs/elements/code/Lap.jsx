// A centered lap keeps a long limit from widening the sum.
<Box font-size={px(40)} padding={em(1)}>
  <MathText style="display">
    <SupSub
      sub={
        <Lap align="center">
          <MathText>1\leq i\leq n</MathText>
        </Lap>
      }
    >
      <MathOp>\sum</MathOp>
    </SupSub>
    <MathText>x_i</MathText>
  </MathText>
</Box>
