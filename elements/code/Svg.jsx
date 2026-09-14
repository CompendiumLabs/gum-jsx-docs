// A definite viewport contains a centered, naturally sized frame.
<Svg width={px(320)} height={px(180)} font-size={px(16)}>
  <Box width={1} height={1} background={lightgray} align="center">
    <Frame padding={em(1)} border-color={blue}>
      <Text font-size={em(1.25)}>320 by 180</Text>
    </Frame>
  </Box>
</Svg>
