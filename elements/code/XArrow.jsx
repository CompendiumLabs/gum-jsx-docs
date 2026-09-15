// The longer of the two labels determines the arrow width.
<Svg font-size={px(38)}>
  <Box padding={em(0.7)}>
    <MathText>
      A
      <XArrow above={String.raw`\text{a linear map}`} below="f^{-1}" />
      B
      <XArrow label="xleftrightarrow" above="g" below="h" />
      C
    </MathText>
  </Box>
</Svg>
