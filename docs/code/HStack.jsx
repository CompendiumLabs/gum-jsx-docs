// Keep an icon and label fixed while a paragraph receives the remaining width.
<Svg width={px(480)}>
  <Frame width={1} padding={px(20)} background="#f7f8fa" border_color="#ccd7df">
    <HStack width={1} gap={px(12)} align="center">
      <Text width={px(64)} font_weight={700}>Note</Text>
      <Text basis={0} grow={1}
        text="This paragraph receives the remaining width and wraps without changing its font size." />
      <Square width={px(40)} fill="#317969" stroke="none" />
    </HStack>
  </Frame>
</Svg>
