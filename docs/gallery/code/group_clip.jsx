// Both canvases query the same immutable artwork. The second clips painted ink;
// its fragment tree still records the full positioned allocations and overflow.
const artwork = [
  <Rect fill={lightgray} stroke={none} />,
  <Rect x={-0.08} y={0.28} width={0.42} height={0.44} fill={blue} stroke={none} />,
  <Circle x={0.88} y={0.5} anchor="center" width={0.49} fill={red} stroke={none} />,
]

return (
  <Box fit color={slate} padding={em(1.5)}>
    <HStack gap={em(2.25)}>
      {[false, true].map(clip => (
        <VStack gap={em(0.625)}>
          <Text font-size={em(0.875)} font-weight={bold}>clip = {String(clip)}</Text>
          <Box border-width={em(0.125)} border-color={slate}>
            <Group width={em(11.25)} aspect={1.8} clip={clip}>
              {artwork}
            </Group>
          </Box>
        </VStack>
      ))}
    </HStack>
  </Box>
)
