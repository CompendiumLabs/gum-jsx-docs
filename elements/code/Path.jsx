// A cubic curve and a closed shape made from quadratic curves share normalized coordinates.
<Svg>
  <Box padding={px(20)} background={lightgray}>
    <HStack gap={px(24)}>
      <Path
        width={px(220)}
        height={px(100)}
        commands={[
          move_to(0.05, 0.8),
          curve_to(0.3, 0.05, 0.7, 0.95, 0.95, 0.2),
        ]}
        fill={none}
        stroke={blue}
        stroke_width={px(4)}
        stroke_linecap="round"
      />
      <Path
        width={px(140)}
        height={px(100)}
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
</Svg>
