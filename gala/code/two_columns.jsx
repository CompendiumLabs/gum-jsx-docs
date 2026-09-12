// Equal flexible columns give a figure and a wrapping explanation the same allocation.
<Svg width={px(720)}>
  <Box width={1} padding={px(28)} background="#f7f8fa" color="#24364b">
    <VStack width={1} gap={px(20)}>
      <Text font_family="IBM Plex Mono" font_size={px(14)} color="#2c7567">LAYOUT / 01</Text>
      <Text font_size={px(30)} font_weight={700}>A figure beside its explanation</Text>
      <HStack width={1} gap={px(24)}>
        <Frame basis={0} grow={1} padding={px(20)} radius={px(12)}
          border_color="#ccd7df" background="white">
          <VStack width={1} gap={px(16)}>
            <Text font_size={px(14)} font_weight={700}>ONE SHARED WIDTH</Text>
            <HStack width={1} height={px(160)} gap={px(12)} align="end">
              <Rect basis={0} grow={1} height={px(64)} fill="#89b9ab" stroke="none" />
              <Rect basis={0} grow={1} height={px(112)} fill="#4d9583" stroke="none" />
              <Rect basis={0} grow={1} height={px(160)} fill="#24594e" stroke="none" />
            </HStack>
            <Text font_size={px(14)} color="#607184">Fixed heights, flexible widths.</Text>
          </VStack>
        </Frame>
        <VStack basis={0} grow={1} gap={px(14)}>
          <Text font_size={px(24)} font_weight={700}>Two columns, one allocation</Text>
          <Text font_size={px(18)} line_height={em(1.4)}>Both columns start with a zero basis and grow equally into the remaining row width.</Text>
          <Text font_size={px(18)} line_height={em(1.4)}>The paragraph reflows. The bars keep their heights. Nothing needs to infer a combined aspect ratio.</Text>
          <Text font_size={px(14)} color="#2c7567">Change the canvas width and render again.</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</Svg>
