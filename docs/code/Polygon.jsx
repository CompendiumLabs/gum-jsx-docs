// Evenly spaced angles and polar coordinates generate regular polygons.
const regular = (count) =>
  linspace(-90, 270, count, false).map((angle) => polard(angle, 0.45, [0.5, 0.5]));
return (
  <Svg>
    <Box padding={px(20)} background={lightgray}>
      <HStack gap={px(20)}>
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
  </Svg>
);
