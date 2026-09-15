// Matrix rows share baselines while natural columns follow their widest cells.
<Svg width={px(720)} font-size={px(34)}>
  <Box padding={em(0.8)}>
    <MathText style="display">
      A=
      <Bracket delim="round">
        <MathArray ncol={3} colsep={em(0.55)} rowsep={em(0.35)}>
          <MathText>a</MathText>
          <MathText>bb</MathText>
          <Frac>
            <MathText>1</MathText>
            <MathText>x</MathText>
          </Frac>
          <MathText>ccc</MathText>
          <MathText>d</MathText>
          <Sqrt>
            <MathText>y</MathText>
          </Sqrt>
        </MathArray>
      </Bracket>
    </MathText>
  </Box>
</Svg>
