// An overline spans a compound operand, unlike a short bar accent.
<Svg font-size={px(36)}>
  <Box padding={em(0.6)}>
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
</Svg>
