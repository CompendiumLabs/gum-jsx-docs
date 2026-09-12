// A naturally sized label with the Frame's default one-pixel border.
<Svg>
  <Box padding={px(16)} background={lightgray}>
    <Frame
      padding={em(0.75)}
      radius={px(8)}
      font_size={px(20)}
      color={blue}
      background={white}
    >
      <Text>Ready to <Span font_weight={bold}>render</Span></Text>
    </Frame>
  </Box>
</Svg>;
