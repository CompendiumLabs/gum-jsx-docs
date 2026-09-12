// Compare a title enlarged by contain with the same title kept at its original size.
<Svg>
  <Box padding={px(20)} background="#f7f8fa">
    <HStack gap={px(20)}>
      <VStack gap={px(8)}>
        <Text font_size={px(14)}>contain</Text>
        <Frame width={px(220)} height={px(100)} padding={px(12)} border_color="#317969">
          <Fit mode="contain">
            <Text color="#24594e">Size by fitting</Text>
          </Fit>
        </Frame>
      </VStack>
      <VStack gap={px(8)}>
        <Text font_size={px(14)}>scale_down</Text>
        <Frame width={px(220)} height={px(100)} padding={px(12)} border_color="#476c9b">
          <Fit mode="scale_down">
            <Text color="#304e75">Size by fitting</Text>
          </Fit>
        </Frame>
      </VStack>
    </HStack>
  </Box>
</Svg>
