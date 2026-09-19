// An overline spans a compound operand, unlike a short bar accent.
<Box font-size={px(36)} padding={em(0.6)}>
  <MathText>
    <Overline>
      <MathText>z+w</MathText>
    </Overline>
    =
    <Overline>z</Overline>
    +
    <Overline>w</Overline>
  </MathText>
</Box>
