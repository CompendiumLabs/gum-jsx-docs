// Keep an icon and label fixed while a paragraph receives the remaining width.
<Svg width={px(480)}>
  <Frame width={1} padding={px(20)} background={lightgray} border_color={gray}>
    <HStack gap={px(12)} align="center">
      <Text width={px(64)} font_weight={bold}>Note</Text>
      <Text basis={0} grow={1}
        text="This paragraph receives the remaining width and wraps without changing its font size." />
      <Square width={px(40)} fill={blue} stroke={none} />
    </HStack>
  </Frame>
</Svg>
