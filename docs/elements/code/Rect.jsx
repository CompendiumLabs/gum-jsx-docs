// Rectangles with explicit dimensions, an aspect ratio, and elliptical corners.
<Box padding={em(1.25)} background={lightgray}>
  <HStack gap={em(1)}>
    <Rect width={px(120)} height={px(80)} fill={blue} stroke={none} />
    <Rect width={px(160)} aspect={2} fill={red} stroke={none} />
    <Rect
      width={px(120)}
      height={px(80)}
      radius={[px(24), px(12)]}
      fill={green}
      stroke={none}
    />
  </HStack>
</Box>
