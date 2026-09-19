// Evenly spaced angles and polar coordinates generate regular polygons.
const regular = (count) =>
  linspace(-90, 270, count, false).map((angle) => polard(angle, 0.45, [0.5, 0.5]))
return (
  <Box padding={em(1.25)} background={lightgray}>
    <HStack gap={em(1.25)}>
      <Polygon
        width={px(100)}
        height={px(100)}
        points={regular(3)}
        fill={blue}
        stroke={none}
      />
      <Polygon
        width={px(100)}
        height={px(100)}
        points={regular(5)}
        fill={red}
        stroke={none}
      />
      <Polygon
        width={px(100)}
        height={px(100)}
        points={regular(6)}
        fill={green}
        stroke={none}
      />
    </HStack>
  </Box>
)
