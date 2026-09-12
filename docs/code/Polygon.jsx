// Generate regular polygons with plain JavaScript and normalized coordinates.
const regular = count => Array.from({ length: count }, (_, index) => {
  const angle = -Math.PI / 2 + 2 * Math.PI * index / count;
  return { x: 0.5 + 0.45 * Math.cos(angle), y: 0.5 + 0.45 * Math.sin(angle) };
});
return (
  <Svg>
    <Box padding={px(20)} background="#f7f8fa">
      <HStack gap={px(20)}>
        <Polygon width={px(100)} height={px(100)} points={regular(3)} fill="#2c7567" stroke="none" />
        <Polygon width={px(100)} height={px(100)} points={regular(5)} fill="#486d9c" stroke="none" />
        <Polygon width={px(100)} height={px(100)} points={regular(6)} fill="#bb6748" stroke="none" />
      </HStack>
    </Box>
  </Svg>
);
