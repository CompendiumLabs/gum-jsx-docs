// Align a fixed label and icon independently while a paragraph receives the remaining width.
<TextFrame width="fill" padding={em(1.25)} background={lightgray} border-color={gray}>
  <HStack gap={em(0.75)} align="center">
    <Text width={px(64)} font-weight={bold} align-self="start">Note</Text>
    <Text grow={1}>
      This paragraph receives the remaining width and wraps without changing its font size.
    </Text>
    <Square width={px(40)} fill={blue} stroke={none} align-self="end" />
  </HStack>
</TextFrame>
