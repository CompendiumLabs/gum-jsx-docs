// Each nested Group has its own local 0–1 reference rectangle. The same position
// meets a different point of the Box: its top-left, center, or bottom-right.
<Box fit padding={em(1)}>
  <HStack gap={em(2)}>
    {['start', 'center', 'end'].map(anchor =>
      <VStack align="center" gap={em(1.5)}>
        <Text font-weight={bold}>{anchor}</Text>
        <Group width={em(9.375)} height={em(9.375)}>
          <Mesh2D xticks={10} yticks={10} />
          <HLine />
          <VLine />
          <Rect x={0.5} y={0.5} anchor={anchor} width={0.4} height={0.3}
            fill={blue} stroke={none} opacity={0.75} radius={em(0.3)} />
          <Circle x={0.5} y={0.5} anchor="center" width={em(0.5)}
            fill={black} stroke={white} />
        </Group>
        <Text font-size={em(0.9)}>x = 0.5, y = 0.5</Text>
      </VStack>
    )}
  </HStack>
</Box>
