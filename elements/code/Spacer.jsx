// A flexible spacer separates two natural labels in a definite-width row.
<Svg width={px(440)}>
  <Frame width={1} padding={px(16)} background={lightgray} border_color={gray}>
    <HStack width={1} align="center">
      <Text font_weight={bold}>Left</Text>
      <Spacer />
      <Text color={blue}>Right</Text>
    </HStack>
  </Frame>
</Svg>
