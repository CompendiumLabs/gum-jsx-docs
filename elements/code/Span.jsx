// Inline styles share paragraph wrapping and do not introduce word breaks.
<Svg width={px(460)}>
  <Box width={1} padding={px(24)} background={lightgray}>
    <VStack gap={px(16)}>
      <Text font-size={px(24)}>A <Span font-weight={bold} color={blue}>small</Span> style change</Text>
      <Text font-size={px(18)} line-height={em(1.4)}>Use <Span font-style="italic">emphasis</Span>, a <Span font-family={mono} color={red}>code name</Span>, or a different <Span color={green}>color</Span> without splitting the paragraph.</Text>
      <Text font-size={px(18)}>un<Span font-weight={bold} color={blue}>break</Span>able</Text>
    </VStack>
  </Box>
</Svg>
