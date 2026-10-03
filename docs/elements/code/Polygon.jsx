// Regular polygons use ambient graph coordinates and close their paths.
const regular = (count) =>
  linspace(90, 450, count, false).map((angle) => polard(angle, 2))
return (
  <Box padding={em(1.25)} background={lightgray}>
    <HStack gap={em(1.25)}>
      {[[3, blue], [5, red], [6, green]].map(([count, color]) => (
        <Graph grow={1} aspect={1} xlim={[-2.25, 2.25]} ylim={[-2.25, 2.25]}>
          <Polygon points={regular(count)} fill={color} stroke={none} />
        </Graph>
      ))}
    </HStack>
  </Box>
)
