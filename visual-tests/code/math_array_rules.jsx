// Array rules, alignments, row gaps, and an outer frame resolve together.
<Svg font-size={px(29)}>
  <Box padding={em(0.8)}>
    <MathArray
      ncol={4}
      cols="l|c:r|c"
      outer={true}
      colsep={em(0.45)}
      rowsep={em(0.25)}
      hlines={[[true], [], [true], [], [false]]}
      rowgaps={[null, em(0.2), null]}
    >
      <TextMode>name</TextMode>
      <MathText>x</MathText>
      <MathText>y</MathText>
      <TextMode>kind</TextMode>
      <TextMode>alpha</TextMode>
      <Frac>
        <MathText>1</MathText>
        <MathText>2</MathText>
      </Frac>
      <MathText>0</MathText>
      <TextMode>fraction</TextMode>
      <TextMode>beta</TextMode>
      <MathText>-1</MathText>
      <Sqrt>
        <MathText>2</MathText>
      </Sqrt>
      <TextMode>root</TextMode>
      <TextMode>gamma</TextMode>
      <MathText>∞</MathText>
      <MathText>π</MathText>
      <TextMode>symbols</TextMode>
    </MathArray>
  </Box>
</Svg>
