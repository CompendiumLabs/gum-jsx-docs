// A cubic curve and a closed shape made from quadratic curves share normalized coordinates.
<Box padding={em(1.25)} background={lightgray}>
  <HStack gap={em(1.5)}>
    <Path
      grow={2.2}
      aspect={2.2}
      commands={[
        move_to(0.05, 0.8),
        curve_to(0.3, 0.05, 0.7, 0.95, 0.95, 0.2),
      ]}
      fill={none}
      stroke={blue}
      stroke-width={px(4)}
      stroke-linecap="round"
    />
    <Path
      grow={1.4}
      aspect={1.4}
      commands={[
        move_to(0.1, 0.5),
        quad_to(0.5, 0, 0.9, 0.5),
        quad_to(0.5, 1, 0.1, 0.5),
        close_path(),
      ]}
      fill={red}
      stroke={none}
    />
  </HStack>
</Box>
