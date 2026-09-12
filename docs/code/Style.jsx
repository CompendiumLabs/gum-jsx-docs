// Inherit shape paint separately from text color, with local overrides.
<Svg>
  <Box padding={px(20)} background="#f7f8fa"
    color="#24364b" fill="#317969" stroke="none" font_size={px(20)}>
    <VStack gap={px(14)}>
      <Text>Text uses <Span color="#d77c45" font_weight={700}>color</Span>.</Text>
      <HStack gap={px(14)}>
        <Square width={px(64)} />
        <Circle width={px(64)} fill="#d77c45" />
        <RoundedRect width={px(100)} height={px(64)}
          fill="none" stroke="#476c9b" stroke_width={px(3)} />
      </HStack>
    </VStack>
  </Box>
</Svg>
