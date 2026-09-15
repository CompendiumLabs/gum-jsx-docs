// Frac: Style-dependent fractions, custom rules, and binomial delimiters.
<Svg font-size={px(36)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.7)} justify="start">
      <Frac style="display">
        <MathText>a+b</MathText>
        <MathText>c+d</MathText>
      </Frac>
      <Frac thickness={px(3)} color={blue}>
        <MathText>1</MathText>
        <MathText>
          1+
          <Frac>
            <MathText>1</MathText>
            <MathText>1+x</MathText>
          </Frac>
        </MathText>
      </Frac>
      <Frac has-bar={false} left-delim="(" right-delim=")" style="display">
        <MathText>n</MathText>
        <MathText>k</MathText>
      </Frac>
    </MathCol>
  </Box>
</Svg>
