// A flexible spacer separates two natural labels in a definite-width row.
<Svg width={px(440)}>
  <Frame width={1} padding={px(16)} background="#f7f8fa" border_color="#ccd7df">
    <HStack width={1} align="center">
      <Text font_weight={700}>Left</Text>
      <Spacer />
      <Text color="#317969">Right</Text>
    </HStack>
  </Frame>
</Svg>
