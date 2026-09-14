// A naturally sized label with the Frame's default one-pixel border.
<Svg font-size={px(20)}>
  <Box padding={em(0.8)} background={lightgray}>
    <Frame
      padding={em(0.75)}
      radius={px(8)}
      color={blue}
      background={white}
    >
      <Text>Ready to <Span font-weight={bold}>render</Span></Text>
    </Frame>
  </Box>
</Svg>
