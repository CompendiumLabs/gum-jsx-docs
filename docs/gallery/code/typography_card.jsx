// Mixed text styles and aligned baselines reflow; a preformatted block fits narrow cards.
<TextBox
  width="fill"
  font-size={px(18)}
  padding={em(1.7)}
  background={slate}
  color={gray}
>
  <TextCol gap={em(1.2)}>
    <HStack font-family={mono} font-size={em(0.75)}>
      <Text color={blue}>TYPE / 06</Text>
      <Spacer />
      <Text color={white}>IBM PLEX</Text>
    </HStack>
    <Text font-size={em(2)} font-weight={bold} line-height={em(1.1)}>Words stay readable.</Text>
    <Text line-height={em(1.5)}>A narrower box changes <Span font-weight={bold} color={blue}>line breaks</Span>, not font size. Inline <Span font-style={italic}>emphasis</Span> and <Span font-family={mono} color={red}>code names</Span> remain part of one paragraph.</Text>
    <HStack wrap gap={em(1.5)} align="baseline">
      <Text font-size={em(2)} font-weight={bold}>Aa</Text>
      <Text font-size={em(1.5)} font-family={mono} color={red}>0123</Text>
      <Text basis={em(6)} grow={1} shrink={1} font-style="italic" color={blue}>quiet emphasis</Text>
    </HStack>
    <Frame
      padding={em(0.75)}
      background={black}
      border-color={darkgray}
      radius={em(0.3)}
    >
      <Text fit
        font-family={mono}
        font-size={em(0.85)}
        line-height={em(1.5)}
        whitespace="pre"
        wrap={false}
      >
        source    immutable
        layout    explicit
        output    SVG paths
      </Text>
    </Frame>
    <Text font-size={em(0.8)}>Glyph outlines travel with the SVG; font files stay at layout time.</Text>
  </TextCol>
</TextBox>
