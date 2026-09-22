// Mixed text styles and aligned baselines reflow; a preformatted block fits narrow cards.
<Box width={em(30)} font-size={px(14)} padding={em(1.2)} border-radius={em(0.75)}>
  <TextCol gap={em(1)}>
    <TextRow font-family={mono} font-size={em(0.7)}>
      <Text color={blue}>SPECIMEN / 01</Text>
      <Spacer />
      <Text>IBM PLEX</Text>
    </TextRow>
    <Text font-size={em(1.9)} font-weight={bold} line-height={em(1.15)}>Words are elements too.</Text>
    <Text line-height={em(1.4)}>
      A paragraph wraps to the width it is given, so a narrower box changes the <Span font-weight={bold} color={blue}>line breaks</Span> and never the font size. <Span font-style="italic">Emphasis</Span>, <Span font-family={mono} color={red}>code names</Span>, shapes like <Square width={em(0.7)} border-radius={em(0.15)} fill={blue} stroke={none} />, math like <Tex>{String.raw`e^{i\pi} + 1 = 0`}</Tex>, and even emoji 🚀 all ride along on the same baseline.
    </Text>
    <TextRow wrap gap={em(1.5)}>
      <Text font-size={em(2)} font-weight={bold}>Aa</Text>
      <Text font-size={em(1.5)} font-family={mono} color={red}>0123</Text>
      <Text font-style="italic" color={blue}>one shared baseline</Text>
    </TextRow>
    <TextBox font-family={mono} font-size={em(0.8)} line-height={em(1.5)} whitespace="pre" background={lightgray} padding={em(0.5)} border-radius={em(0.3)}>
      measure real glyph metrics
      wrap at the allocated width
      output plain SVG paths
    </TextBox>
    <Text font-style="italic" font-size={em(0.8)}>Glyph outlines travel with the SVG; font files stay at layout time.</Text>
  </TextCol>
</Box>
