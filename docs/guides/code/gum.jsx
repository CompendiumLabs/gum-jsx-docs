// A first diagram: a heading, two shapes, and a paragraph in a padded box.
<TextBox width={em(20)} padding={em(1.25)} background={lightgray}>
  <TextCol gap={em(0.75)}>
    <Text font-size={em(1.5)} font-weight={bold}>Hello, Gum.</Text>
    <HStack gap={em(0.75)}>
      <Square width={px(56)} fill={blue} stroke={none} />
      <Circle width={px(56)} fill={red} stroke={none} />
    </HStack>
    <Text>Shapes resize. Text keeps its font size. Stacks arrange the result.</Text>
  </TextCol>
</TextBox>
