// MathBox: Pad, allocate, and align one math child while preserving its baseline and axis.
<Svg font-size={px(32)}>
  <Box padding={em(0.65)}>
    <Frame border-color={blue}>
      <MathBox padding={em(0.5)} width={em(8)} align="center">
        <MathText>a+b=c</MathText>
      </MathBox>
    </Frame>
  </Box>
</Svg>
