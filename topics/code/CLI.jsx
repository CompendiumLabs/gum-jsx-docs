// Render the same source as SVG, PNG, kitty graphics, a tree, or JSON.
<Svg width={px(420)} font-size={px(16)}>
  <Box padding={em(1.25)} background={lightgray}>
    <VStack gap={em(0.75)}>
      <Text font-size={em(1.5)} font-weight={bold}>One source, several outputs</Text>
      <Rect aspect={3} radius={px(8)} fill={blue} stroke={none} />
      <Text>Change -W to reflow this paragraph. Change --ratio to sample more pixels without changing the layout.</Text>
    </VStack>
  </Box>
</Svg>
