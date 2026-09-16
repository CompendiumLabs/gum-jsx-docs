// The underline follows the full operand while preserving its baseline.
<Svg font-size={px(36)}>
  <Box padding={em(0.6)}>
    <MathText>
      <Underline color={blue}>
        <Frac>
          <MathText>a+b</MathText>
          <MathText>c</MathText>
        </Frac>
      </Underline>
      =x
    </MathText>
  </Box>
</Svg>
