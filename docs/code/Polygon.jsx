// Generate regular polygons with plain JavaScript and normalized coordinates.
const regular = (count) =>
  Array.from({ length: count }, (_, index) => {
    const angle = -pi / 2 + (2 * pi * index) / count;
    return { x: 0.5 + 0.45 * Math.cos(angle), y: 0.5 + 0.45 * Math.sin(angle) };
  });
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
