// Root indices, tall radicands, and nested roots exercise surd and rule assembly.
<Svg width={px(840)} font-size={px(38)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.8)} justify="start">
      <MathText>
        <Sqrt>
          <MathText>
            <SupSub sup="2">b</SupSub>
            -4ac
          </MathText>
        </Sqrt>
      </MathText>
      <Sqrt index="3" color={blue}>
        <MathText>x+y+z</MathText>
      </Sqrt>
      <Sqrt style="display">
        <Frac>
          <MathText>1+</MathText>
          <MathText>
            1+
            <Sqrt>
              <MathText>x</MathText>
            </Sqrt>
          </MathText>
        </Frac>
      </Sqrt>
    </MathCol>
  </Box>
</Svg>
