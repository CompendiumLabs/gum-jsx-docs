// Mixed text styles, aligned baselines, and a preformatted block remain at fixed font sizes.
<Svg width={px(680)}>
  <Box width={1} padding={px(32)} background="#182737" color="#e7eff5" font_size={px(18)}>
    <VStack width={1} gap={px(20)}>
      <HStack width={1} align="baseline">
        <Text font_family="IBM Plex Mono" font_size={px(14)} color="#8ec8b4">TYPE / 06</Text>
        <Spacer />
        <Text font_family="IBM Plex Mono" font_size={px(14)} color="#b4c6d5">IBM PLEX</Text>
      </HStack>
      <Text font_size={px(38)} font_weight={700} line_height={em(1.1)}>Words stay readable.</Text>
      <Text line_height={em(1.5)}>A narrower box changes <Span font_weight={700} color="#8ec8b4">line breaks</Span>, not font size. Inline <Span font_style="italic">emphasis</Span> and <Span font_family="IBM Plex Mono" color="#a9c4e7">code names</Span> remain part of one paragraph.</Text>
      <HStack width={1} gap={px(24)} align="baseline">
        <Text font_size={px(42)} font_weight={700}>Aa</Text>
        <Text font_family="IBM Plex Mono" font_size={px(30)} color="#a9c4e7">0123</Text>
        <Text font_size={px(20)} font_style="italic" color="#d99a7c">quiet emphasis</Text>
      </HStack>
      <Frame width={1} padding={px(16)} background="#233a4f" border_color="#3e576d" radius={px(8)}>
        <Text font_family="IBM Plex Mono" font_size={px(16)} line_height={em(1.5)} whitespace="pre" wrap={false}
          text={"source    immutable\nlayout    explicit\noutput    SVG paths"} />
      </Frame>
      <Text font_size={px(14)} color="#b4c6d5">Glyph outlines travel with the SVG; font files stay at layout time.</Text>
    </VStack>
  </Box>
</Svg>
