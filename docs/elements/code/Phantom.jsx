// A vertical phantom makes two radicals share the taller radicand's extent.
<Box font-size={px(38)} padding={em(0.7)}>
  <MathText>
    <Sqrt>
      <Frac>
        <MathText>1</MathText>
        <MathText>x</MathText>
      </Frac>
    </Sqrt>
    +
    <Sqrt>
      <MathText>
        <Phantom horizontal={false}>
          <Frac>
            <MathText>1</MathText>
            <MathText>x</MathText>
          </Frac>
        </Phantom>
        y
      </MathText>
    </Sqrt>
  </MathText>
</Box>
