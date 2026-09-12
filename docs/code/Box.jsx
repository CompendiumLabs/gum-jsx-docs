// A padded content box with independent background and inside border paint.
<Svg width={px(380)}>
  <Box
    width={1}
    padding={{ left: px(24), right: px(24), top: px(16), bottom: px(16) }}
    background={lightgray}
    border_width={px(2)}
    border_color={blue}
    radius={px(12)}
  >
    <VStack gap={px(8)}>
      <Text font_size={px(22)} font_weight={bold} color={blue}>A content box</Text>
      <Text text="The width includes its padding and border. This paragraph wraps inside the remaining content area." />
    </VStack>
  </Box>
</Svg>;
