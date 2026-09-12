// Compare equal flex shares with a naturally sized item and a flexible Spacer.
<Svg width={px(480)}>
  <Box width={1} padding={px(20)} background={lightgray}>
    <VStack width={1} gap={px(12)}>
      <Text font_weight={bold}>Equal shares after the gap</Text>
      <HStack height={px(64)} gap={px(12)}>
        <Rect basis={0} grow={1} fill={blue} stroke={none} />
        <Rect basis={0} grow={1} fill={red} stroke={none} />
      </HStack>
      <Text font_weight={bold}>Content plus remaining space</Text>
      <HStack align="center">
        <Square width={px(48)} fill={blue} stroke={none} />
        <Spacer />
        <Text>At the far edge</Text>
      </HStack>
    </VStack>
  </Box>
</Svg>;
