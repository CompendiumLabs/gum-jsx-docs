// Bracket: Size all fences against the complete body, including middle delimiters.
<Box font-size={px(36)} padding={em(0.8)}>
  <MathCol gap={em(0.7)} justify="start">
    <Bracket delim="round" style="display">
      <Frac>
        <MathText>a+b</MathText>
        <MathText>c+d</MathText>
      </Frac>
    </Bracket>
    <Bracket delim="curly" middle="|" style="display">
      <MathText>x</MathText>
      <MathText>
        <Frac>
          <MathText>1</MathText>
          <MathText>x</MathText>
        </Frac>
        &gt;0
      </MathText>
    </Bracket>
    <Bracket delim="angle" level={3} color={blue}>
      <MathText>x,y</MathText>
    </Bracket>
  </MathCol>
</Box>
