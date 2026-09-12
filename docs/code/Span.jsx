// Inline styles share paragraph wrapping and do not introduce word breaks.
<Svg width={px(460)}>
  <Box width={1} padding={px(24)} background="#f7f8fa">
    <VStack gap={px(16)}>
      <Text font_size={px(24)}>A <Span font_weight={700} color="#2c7567">small</Span> style change</Text>
      <Text font_size={px(18)} line_height={em(1.4)}>Use <Span font_style="italic">emphasis</Span>, a <Span font_family="IBM Plex Mono" color="#486d9c">code name</Span>, or a different <Span color="#bb6748">color</Span> without splitting the paragraph.</Text>
      <Text font_size={px(18)}>un<Span font_weight={700} color="#2c7567">break</Span>able</Text>
    </VStack>
  </Box>
</Svg>
