// Both canvases query the same immutable artwork. The second clips painted ink;
// its fragment tree still records the full positioned allocations and overflow.
const artwork = [
  <Rect fill={lightgray} stroke={none} />,
  <Rect x={-0.1} y={0.3} width={0.45} height={0.45} fill={blue} stroke={none} />,
  <Circle x={0.9} y={0.5} anchor="center" width={0.5} fill={red} stroke={none} />,
]

return <Box fit color={slate} padding={em(2)}>
  <HStack gap={em(2.5)}>
    {[false, true].map(clip => <VStack gap={em(0.5)}>
      <Text font-weight={bold}>{`clip = ${clip}`}</Text>
      <Box border-width={px(2)} border-color={slate}>
        <Group width={em(10)} aspect={1.6} clip={clip}>
          {artwork}
        </Group>
      </Box>
    </VStack> )}
  </HStack>
</Box>
