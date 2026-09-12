// Rectangles with explicit dimensions, an aspect ratio, and elliptical corners.
<Svg>
  <Box padding={px(20)} background="#f7f8fa">
    <HStack gap={px(16)}>
      <Rect width={px(120)} height={px(80)} fill="#2c7567" stroke="none" />
      <Rect width={px(160)} aspect={2} fill="#bb6748" stroke="none" />
      <Rect width={px(120)} height={px(80)} radius={{ x: px(24), y: px(12) }}
        fill="#486d9c" stroke="none" />
    </HStack>
  </Box>
</Svg>
