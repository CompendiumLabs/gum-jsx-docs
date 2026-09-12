// Square preserves square geometry inside a nonsquare allocation; Rect fills it.
<Svg>
  <Box padding={px(20)} background="#f7f8fa">
    <HStack gap={px(20)}>
      <VStack gap={px(8)}>
        <Text>Square</Text>
        <Frame padding={px(8)} border_color="#a9b7c4">
          <Square width={px(160)} height={px(80)} fill="#2c7567" stroke="none" />
        </Frame>
      </VStack>
      <VStack gap={px(8)}>
        <Text>Rect, aspect = 1</Text>
        <Frame padding={px(8)} border_color="#a9b7c4">
          <Rect width={px(160)} height={px(80)} aspect={1} fill="#bb6748" stroke="none" />
        </Frame>
      </VStack>
    </HStack>
  </Box>
</Svg>
