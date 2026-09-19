// Compare equal flex shares with a naturally sized item and a flexible Spacer.
<TextBox width="fill" padding={em(1.25)} background={lightgray}>
  <TextCol gap={em(0.75)}>
    <Text font-weight={bold}>Equal shares after the gap</Text>
    <HStack height={px(64)} gap={em(0.75)}>
      <Rect grow={1} fill={blue} stroke={none} />
      <Rect grow={1} fill={red} stroke={none} />
    </HStack>
    <Text font-weight={bold}>Content plus remaining space</Text>
    <HStack align="center">
      <Square width={px(48)} fill={blue} stroke={none} />
      <Spacer />
      <Text>At the far edge</Text>
    </HStack>
  </TextCol>
</TextBox>
