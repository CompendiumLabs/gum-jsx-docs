// A first diagram: a heading, two shapes, and a paragraph in a padded box.
<Svg width={px(400)}>
  <Box width={1} padding={px(20)} background="#f7f8fa">
    <VStack gap={px(12)}>
      <Text font_size={px(24)} font_weight={700}>Hello, Gum.</Text>
      <HStack gap={px(12)}>
        <Square width={px(56)} fill="#317969" stroke="none" />
        <Circle width={px(56)} fill="#d77c45" stroke="none" />
      </HStack>
      <Text text="Shapes resize. Text keeps its font size. Stacks arrange the result." />
    </VStack>
  </Box>
</Svg>
