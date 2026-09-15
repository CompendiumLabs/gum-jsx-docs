// MathArray: Natural columns, shared row baselines, and explicit table rules.
<Svg font-size={px(30)}>
  <Box padding={em(0.7)}>
    <MathArray
      ncol={3}
      cols="r|c:l"
      outer={true}
      stretch={1.15}
      colsep={em(0.4)}
      hlines={[[false], [], [true], [false]]}
      rowgaps={[null, em(0.15)]}
    >
      <MathText>x</MathText>
      <Frac>
        <MathText>a+b</MathText>
        <MathText>c</MathText>
      </Frac>
      <TextMode>positive</TextMode>
      <MathText>y</MathText>
      <MathText>0</MathText>
      <TextMode>zero</TextMode>
      <MathText>z</MathText>
      <MathText>-1</MathText>
      <TextMode>negative</TextMode>
    </MathArray>
  </Box>
</Svg>
