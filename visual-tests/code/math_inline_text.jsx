// Tall inline formulas expand line boxes while preserving the prose baseline.
<Svg width={px(760)} font-size={px(23)}>
  <Box padding={em(1)}>
    <Text width={px(700)}>
      {"The normalized value "}
      <Tex>
        <Frac>
          <MathText>x-mu</MathText>
          <MathText>
            <Sqrt>
              <MathText>
                <SupSub sup="2">σ</SupSub>
              </MathText>
            </Sqrt>
          </MathText>
        </Frac>
      </Tex>
      {" stays on the shared baseline, and this sentence wraps around the indivisible formula without clipping its numerator or denominator."}
    </Text>
  </Box>
</Svg>
