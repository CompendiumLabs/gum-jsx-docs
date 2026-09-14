// A first diagram: a heading, two shapes, and a paragraph in a padded box.
<Svg width={px(400)}>
  <Box width={1} padding={px(20)} background={lightgray}>
    <VStack gap={px(12)}>
      <Text font_size={px(24)} font_weight={bold}>Hello, Gum.</Text>
      <HStack gap={px(12)}>
        <Square width={px(56)} fill={blue} stroke={none} />
        <Circle width={px(56)} fill={red} stroke={none} />
      </HStack>
      <Text text="Shapes resize. Text keeps its font size. Stacks arrange the result." />
    </VStack>
  </Box>
</Svg>
