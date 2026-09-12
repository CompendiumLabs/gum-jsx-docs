// A definite viewport contains a centered, naturally sized frame.
<Svg width={px(320)} height={px(180)}>
  <Box width={1} height={1} background={lightgray} align="center">
    <Frame padding={px(16)} border_color={blue} background={white}>
      <Text font_size={px(20)}>320 by 180</Text>
    </Frame>
  </Box>
</Svg>;
