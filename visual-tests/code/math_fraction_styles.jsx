// Fractions descend through display, text, script, and nested cramped styles.
<Svg width={px(820)} font-size={px(36)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.8)} justify="start">
      <MathText style="display">
        D=
        <Frac>
          <MathText>a+b</MathText>
          <MathText>c+d</MathText>
        </Frac>
      </MathText>
      <MathText style="text">
        T=
        <Frac>
          <MathText>a+b</MathText>
          <MathText>c+d</MathText>
        </Frac>
      </MathText>
      <MathText>
        C=
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
      </MathText>
    </MathCol>
  </Box>
</Svg>
