// Delimiters grow across fractions, roots, nested arrays, and middle fences.
<Svg font-size={px(34)}>
  <Box padding={em(0.9)}>
    <MathCol gap={em(0.8)} justify="start">
      <Bracket delim="round" style="display">
        <Frac>
          <MathText>a+b</MathText>
          <MathText>c+d</MathText>
        </Frac>
      </Bracket>
      <Bracket delim="curly" middle="|" style="display">
        <MathText>x</MathText>
        <MathText>
          <Sqrt>
            <Frac>
              <MathText>1</MathText>
              <MathText>x</MathText>
            </Frac>
          </Sqrt>
          &gt;0
        </MathText>
      </Bracket>
      <Bracket delim="square" level={4} color={blue}>
        <MathText>u,v</MathText>
      </Bracket>
    </MathCol>
  </Box>
</Svg>
