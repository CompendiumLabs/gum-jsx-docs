// Nested superscripts and subscripts descend styles without losing italic correction.
<Svg font-size={px(38)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.8)} justify="start">
      <MathText>
        <SupSub sup="j" sub="i">f</SupSub>
        +
        <SupSub sup="y^{z^w}" sub="a_{b_c}">x</SupSub>
      </MathText>
      <MathText>
        <SupSub
          sup={
            <Frac>
              <MathText>n+1</MathText>
              <MathText>2</MathText>
            </Frac>
          }
          sub={
            <Sqrt>
              <MathText>k</MathText>
            </Sqrt>
          }
        >
          T
        </SupSub>
      </MathText>
      <Latex>{String.raw`x^{y^{z^w}}_{i_{j_k}}+e^{-x^2}`}</Latex>
    </MathCol>
  </Box>
</Svg>
