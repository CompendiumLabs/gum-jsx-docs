// A centered lap keeps a long limit from widening the sum.
<Svg font-size={px(40)}>
  <Box padding={em(1)}>
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
</Svg>
