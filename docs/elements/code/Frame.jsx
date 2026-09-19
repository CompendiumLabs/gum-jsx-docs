// A naturally sized label with rounded top corners and the default one-pixel border.
<Box font-size={px(20)} padding={em(0.8)} background={lightgray}>
  <Frame
    padding={em(0.75)}
    radius={{ t: em(0.4) }}
    color={blue}
    background={white}
  >
    <Text>Ready to <Span font-weight={bold}>render</Span></Text>
  </Frame>
</Box>
