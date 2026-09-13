// Render the same source as SVG, PNG, kitty graphics, a tree, or JSON.
<Svg width={px(420)}>
  <Box padding={px(20)} background={lightgray}>
    <VStack gap={px(12)}>
      <Text font_size={px(24)} font_weight={bold}>One source, several outputs</Text>
      <Rect aspect={3} radius={px(8)} fill={blue} stroke={none} />
      <Text text="Change -W to reflow this paragraph. Change --ratio to sample more pixels without changing the layout." />
    </VStack>
  </Box>
</Svg>;
