// Compare a title enlarged by contain with the same title kept at its original size.
<Box padding={em(1.25)} background={lightgray}>
  <HStack gap={em(1.25)}>
    <VStack grow={1} gap={em(0.5)}>
      <Text font-size={em(0.9)}>contain</Text>
      <Frame
        height={px(100)}
        padding={em(0.75)}
        border-color={blue}
      >
        <Text fit="contain" color={blue}>Size by fitting</Text>
      </Frame>
    </VStack>
    <VStack grow={1} gap={em(0.5)}>
      <Text font-size={em(0.9)}>shrink only</Text>
      <Frame
        width="fill"
        height={px(100)}
        padding={em(0.75)}
        border-color={red}
      >
        <Text fit color={red}>Size by fitting</Text>
      </Frame>
    </VStack>
  </HStack>
</Box>
