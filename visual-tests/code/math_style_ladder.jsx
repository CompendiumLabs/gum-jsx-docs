// The same expression changes size predictably through display and script styles.
<Svg width={px(900)} font-size={px(36)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.8)} justify="start">
      <MathText style="display">
        D:
        <Frac>
          <MathText>a+b</MathText>
          <MathText>c+d</MathText>
        </Frac>
        +
        <SupSub sub="i=1" sup="n">
          <MathOp>∑</MathOp>
        </SupSub>
      </MathText>
      <MathText style="text">
        T:
        <Frac>
          <MathText>a+b</MathText>
          <MathText>c+d</MathText>
        </Frac>
        +
        <SupSub sub="i=1" sup="n">
          <MathOp>∑</MathOp>
        </SupSub>
      </MathText>
      <MathText>
        S:
        <SupSub
          sup={
            <MathText>
              x+
              <Frac>
                <MathText>a</MathText>
                <MathText>b</MathText>
              </Frac>
            </MathText>
          }
        >
          q
        </SupSub>
      </MathText>
    </MathCol>
  </Box>
</Svg>
