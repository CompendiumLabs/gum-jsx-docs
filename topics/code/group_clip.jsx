// Both canvases query the same immutable artwork. The second clips painted ink;
// its fragment tree still records the full positioned allocations and overflow.
const artwork = [
  <Rect fill={lightgray} stroke={none} />,
  <Rect x={px(-14)} y={0.28} width={px(76)} height={px(44)} fill={blue} stroke={none} />,
  <Circle x={0.88} y={0.5} anchor="center" width={px(88)} fill={red} stroke={none} />,
]

return <Svg color={slate} font-size={px(16)}>
  <Box padding={em(1.5)}>
    <HStack gap={em(2.25)}>
      {[false, true].map(clip => <VStack gap={em(0.625)}>
        <Text font-size={em(0.875)} font-weight={bold}>clip = {String(clip)}</Text>
        <Box border-width={px(2)} border-color={slate}>
          <Group width={px(180)} height={px(100)} clip={clip}>{artwork}</Group>
        </Box>
      </VStack>)}
    </HStack>
  </Box>
</Svg>
