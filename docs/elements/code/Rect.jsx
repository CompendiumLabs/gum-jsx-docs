// Flexible rectangles with different aspect ratios and elliptical corners.
<Box padding={em(1.25)} background={lightgray}>
  <HStack gap={em(1)}>
    <Rect grow={3} aspect={1.5} fill={blue} stroke={none} />
    <Rect grow={4} aspect={2} fill={red} stroke={none} />
    <Rect
      grow={3}
      aspect={1.5}
      radius={[px(24), px(12)]}
      fill={green}
      stroke={none}
    />
  </HStack>
</Box>
