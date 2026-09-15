// MathRule: A filled horizontal rule centered on the math axis.
<Svg font-size={px(32)}>
  <Box padding={em(0.65)}>
    <MathCol gap={em(0.3)}>
      <MathSpan text="Rule thickness" />
      <MathRule width={em(5)} color={blue} />
      <MathRule width={em(5)} thickness={em(0.1)} color={red} />
    </MathCol>
  </Box>
</Svg>
