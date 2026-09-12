// Render the same source as SVG, PNG, kitty graphics, a tree, or JSON.
<Svg width={px(420)}>
  <Box width={1} padding={px(20)} background="#f7f8fa">
    <VStack gap={px(12)}>
      <Text font_size={px(24)} font_weight={700}>One source, several outputs</Text>
      <Rect aspect={3} radius={px(8)} fill="#317969" stroke="none" />
      <Text text="Change -W to reflow this paragraph. Change --ratio to sample more pixels without changing the layout." />
    </VStack>
  </Box>
</Svg>
