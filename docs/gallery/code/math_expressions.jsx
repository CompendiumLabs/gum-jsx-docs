// Ordinary formulas: parsed TeX and direct JSX share script, fraction, root, and operator layout.
<Box font-size={px(32)} padding={em(1)}>
  <VStack gap={em(0.8)} align="start">
    <Text font-size={em(0.6)} color={slate}>Euler's identity</Text>
    <MathText style="display">
      <SupSub sup="iπ">e</SupSub>
      +1=0
    </MathText>
    <Text font-size={em(0.6)} color={slate}>The quadratic formula, composed from elements</Text>
    <MathText style="display">
      x=
      <Frac>
        <MathText>
          -b±
          <Sqrt>
            <MathText>
              <SupSub sup="2">b</SupSub>
              -4ac
            </MathText>
          </Sqrt>
        </MathText>
        <MathText>2a</MathText>
      </Frac>
    </MathText>
    <Text font-size={em(0.6)} color={slate}>Gaussian integral</Text>
    <Latex>{String.raw`\int_{-\infty}^{\infty}e^{-x^2}\,dx=\sqrt{\pi}`}</Latex>
    <Text font-size={em(0.6)} color={slate}>Series with limits</Text>
    <MathText style="display">
      <SupSub sub="n=0" sup="∞">
        <MathOp>∑</MathOp>
      </SupSub>
      <Frac>
        <SupSub sup="n">x</SupSub>
        <MathText>n!</MathText>
      </Frac>
    </MathText>
    <Text font-size={em(0.6)} color={slate}>Nested fractions and middle delimiters</Text>
    <Latex>{String.raw`\left\{x\middle|\frac{1}{1+\frac{1}{x}}>0\right\}`}</Latex>
  </VStack>
</Box>
