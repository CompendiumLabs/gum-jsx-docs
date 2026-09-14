// Compare a title enlarged by contain with the same title kept at its original size.
<Svg font-size={px(16)}>
  <Box padding={em(1.25)} background={lightgray}>
    <HStack gap={em(1.25)}>
      <VStack gap={em(0.5)}>
        <Text font-size={em(0.875)}>contain</Text>
        <Frame
          width={px(220)}
          height={px(100)}
          padding={em(0.75)}
          border-color={blue}
        >
          <Fit mode="contain">
            <Text color={blue}>Size by fitting</Text>
          </Fit>
        </Frame>
      </VStack>
      <VStack gap={em(0.5)}>
        <Text font-size={em(0.875)}>scale_down</Text>
        <Frame
          width={px(220)}
          height={px(100)}
          padding={em(0.75)}
          border-color={red}
        >
          <Fit mode="scale_down">
            <Text color={red}>Size by fitting</Text>
          </Fit>
        </Frame>
      </VStack>
    </HStack>
  </Box>
</Svg>
