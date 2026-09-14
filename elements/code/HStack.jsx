// Align a fixed label and icon independently while a paragraph receives the remaining width.
<Svg width={px(480)} font-size={px(16)}>
  <Frame width={1} padding={em(1.25)} background={lightgray} border-color={gray}>
    <HStack gap={em(0.75)} align="center">
      <Text width={px(64)} font-weight={bold} align-self="start">Note</Text>
      <Text basis={0} grow={1}>
        This paragraph receives the remaining width and wraps without changing its font size.
      </Text>
      <Square width={px(40)} fill={blue} stroke={none} align-self="end" />
    </HStack>
  </Frame>
</Svg>
