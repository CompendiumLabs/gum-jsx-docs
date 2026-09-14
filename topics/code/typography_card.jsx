// Mixed text styles, aligned baselines, and a preformatted block remain at fixed font sizes.
<Svg width={px(680)} font-size={px(18)}>
  <Box
    width={1}
    padding={em(1.7)}
    background={slate}
    color={gray}
  >
    <VStack width={1} gap={em(1.2)}>
      <HStack width={1} font-family={mono} font-size={em(0.75)}>
        <Text color={blue}>TYPE / 06</Text>
        <Spacer />
        <Text color={white}>IBM PLEX</Text>
      </HStack>
      <Text font-size={em(2)} font-weight={bold} line-height={em(1.1)}>Words stay readable.</Text>
      <Text line-height={em(1.5)}>A narrower box changes <Span font-weight={bold} color={blue}>line breaks</Span>, not font size. Inline <Span font-style={italic}>emphasis</Span> and <Span font-family={mono} color={red}>code names</Span> remain part of one paragraph.</Text>
      <HStack width={1} gap={em(1.5)} align="baseline">
        <Text font-size={em(2)} font-weight={bold}>Aa</Text>
        <Text font-size={em(1.5)} font-family={mono} color={red}>0123</Text>
        <Text font-style="italic" color={blue}>quiet emphasis</Text>
      </HStack>
      <Frame
        width={1}
        padding={em(0.75)}
        background={black}
        border-color={darkgray}
        radius={px(5)}
      >
        <Text
          font-family={mono}
          font-size={em(0.85)}
          line-height={em(1.5)}
          whitespace="pre"
        >
          source    immutable
          layout    explicit
          output    SVG paths
        </Text>
      </Frame>
      <Text font-size={em(0.8)}>Glyph outlines travel with the SVG; font files stay at layout time.</Text>
    </VStack>
  </Box>
</Svg>
