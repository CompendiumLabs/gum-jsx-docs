// Rectangles with explicit dimensions, an aspect ratio, and elliptical corners.
<Svg>
  <Box padding={px(20)} background={lightgray}>
    <HStack gap={px(16)}>
      <Rect width={px(120)} height={px(80)} fill={blue} stroke={none} />
      <Rect width={px(160)} aspect={2} fill={red} stroke={none} />
      <Rect width={px(120)} height={px(80)} radius={{ x: px(24), y: px(12) }}
        fill={green} stroke={none} />
    </HStack>
  </Box>
</Svg>
