// Compare equal flex shares with a naturally sized item and a flexible Spacer.
<Svg width={px(480)}>
  <Box width={1} padding={px(20)} background="#f7f8fa">
    <VStack width={1} gap={px(12)}>
      <Text font_weight={700}>Equal shares after the gap</Text>
      <HStack width={1} height={px(64)} gap={px(12)}>
        <Rect basis={0} grow={1} fill="#317969" stroke="none" />
        <Rect basis={0} grow={1} fill="#d77c45" stroke="none" />
      </HStack>
      <Text font_weight={700}>Content plus remaining space</Text>
      <HStack width={1} align="center">
        <Square width={px(48)} fill="#476c9b" stroke="none" />
        <Spacer />
        <Text>At the far edge</Text>
      </HStack>
    </VStack>
  </Box>
</Svg>
