// A document panel carries its offered width through a column, row, and frame.
<Svg width={px(460)} font-size={px(16)}>
  <TextBox padding={em(1)} background={lightgray}>
    <TextCol gap={em(0.75)}>
      <HStack>
        <Text>Left</Text>
        <Spacer />
        <Text>Right</Text>
      </HStack>
      <Frame padding={em(0.5)}>
        <Text>Content fills the column without repeating its width.</Text>
      </Frame>
    </TextCol>
  </TextBox>
</Svg>
