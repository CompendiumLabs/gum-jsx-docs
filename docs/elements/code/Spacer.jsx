// A flexible spacer separates two natural labels in a definite-width row.
<TextFrame width={px(440)} padding={em(1)} background={lightgray} border-color={gray}>
  <HStack align="center">
    <Text font-weight={bold}>Left</Text>
    <Spacer />
    <Text color={blue}>Right</Text>
  </HStack>
</TextFrame>
