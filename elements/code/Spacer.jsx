// A flexible spacer separates two natural labels in a definite-width row.
<Svg width={px(440)} font-size={px(16)}>
  <Frame width={1} padding={em(1)} background={lightgray} border-color={gray}>
    <HStack width={1} align="center">
      <Text font-weight={bold}>Left</Text>
      <Spacer />
      <Text color={blue}>Right</Text>
    </HStack>
  </Frame>
</Svg>
