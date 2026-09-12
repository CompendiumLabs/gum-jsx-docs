// Mixed text styles, aligned baselines, and a preformatted block remain at fixed font sizes.
<Svg width={px(680)}>
  <Box width={1} padding={px(32)} background={slate} color={gray} font_size={px(18)}>
    <VStack width={1} gap={px(20)}>
      <HStack width={1} align="baseline">
        <Text font_family={mono} font_size={px(14)} color={blue}>TYPE / 06</Text>
        <Spacer />
        <Text font_family={mono} font_size={px(14)} color={white}>IBM PLEX</Text>
      </HStack>
      <Text font_size={px(38)} font_weight={bold} line_height={em(1.1)}>Words stay readable.</Text>
      <Text line_height={em(1.5)}>A narrower box changes <Span font_weight={bold} color={blue}>line breaks</Span>, not font size. Inline <Span font_style="italic">emphasis</Span> and <Span font_family={mono} color={red}>code names</Span> remain part of one paragraph.</Text>
      <HStack width={1} gap={px(24)} align="baseline">
        <Text font_size={px(42)} font_weight={bold}>Aa</Text>
        <Text font_family={mono} font_size={px(30)} color={red}>0123</Text>
        <Text font_size={px(20)} font_style="italic" color={blue}>quiet emphasis</Text>
      </HStack>
      <Frame width={1} padding={px(16)} background={black} border_color={darkgray} radius={px(8)}>
        <Text font_family={mono} font_size={px(16)} line_height={em(1.5)} whitespace="pre" wrap={false}
          text={"source    immutable\nlayout    explicit\noutput    SVG paths"} />
      </Frame>
      <Text font_size={px(14)} color={white}>Glyph outlines travel with the SVG; font files stay at layout time.</Text>
    </VStack>
  </Box>
</Svg>
