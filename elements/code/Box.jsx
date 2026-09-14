// A padded content box with independent background and inside border paint.
<Svg width={px(380)} font-size={px(16)}>
  <Box
    width={1}
    padding={{ left: em(1.5), right: em(1.5), top: em(1), bottom: em(1) }}
    background={lightgray}
    border-width={px(2)}
    border-color={blue}
    radius={px(12)}
  >
    <VStack gap={em(0.5)}>
      <Text font-size={em(1.375)} font-weight={bold} color={blue}>A content box</Text>
      <Text>The width includes its padding and border. This paragraph wraps inside the remaining content area.</Text>
    </VStack>
  </Box>
</Svg>
