// Thick shafts stay behind arrow tips for every cap style and route shape.
const CapColumn = ({ cap, ...attr }) =>
  <VStack gap={em(1.5)} align="center" {...attr}>
    <Text justify="center" font-family={mono}>{cap}</Text>
    <VStack gap={em(2.5)}>
      <Arrow from={[0, 0.5]} to={[1, 0.5]}
        stroke={slate} stroke-width={em(0.5)} stroke-linecap={cap}
        head-size={em(1.75)} head-width={1} head-fill={blue} />
      <Arrow from={[0, .5]} to={[1, .5]} start-head
        stroke={slate} stroke-width={em(0.5)} stroke-linecap={cap}
        head-size={em(1.75)} head-width={1} head-fill={green} />
    </VStack>
  </VStack>

const SplineArrow = ({ ...attr }) =>
  <VStack gap={em(0.5)} {...attr}>
    <Text width="fill" justify="center" font-family={mono}>curved / square caps</Text>
    <Box padding={em(1)}>
      <Arrow aspect={2} points={[[0, 1], [0.3, 0.1], [0.7, 0.9], [1, 0]]}
        curve start-head stroke={slate} stroke-width={em(0.5)} stroke-linecap="square"
        head-size={em(1.75)} head-width={0.8} head-style={{fill: blue}} />
    </Box>
  </VStack>

const RoundedArrow = ({ ...attr }) =>
  <VStack gap={em(0.5)} {...attr}>
    <Text width="fill" justify="center" font-family={mono}>rounded / round caps</Text>
    <Box padding={em(1)}>
      <Arrow aspect={2} points={[[0, 1], [0, 0], [0.5, 0], [0.5, 1], [1, 1]]}
        radius={em(1)} start-head stroke={slate} stroke-width={em(0.5)} stroke-linecap="round"
        head-size={em(1.75)} head-width={0.8} head-style={{fill: green}} />
    </Box>
  </VStack>

return <Box fit padding={em(1.5)} color={slate}>
  <VStack gap={em(2)}>
    <VStack gap={em(0.5)}>
      <Text font-size={em(1.75)} font-weight={bold}>Arrow tips, clean at every cap</Text>
      <Text font-size={em(0.9)}>The dashed guides mark the requested endpoints.</Text>
    </VStack>
    <VStack gap={em(3)} align="center">
      <HStack gap={em(2)}>{['butt', 'round', 'square'].map(cap =>
        <CapColumn cap={cap} shrink={1} basis={em(12)} />
      )}</HStack>
      <HStack gap={em(2)}>
        <SplineArrow  grow={1} basis={em(14)} />
        <RoundedArrow grow={1} basis={em(14)} />
      </HStack>
    </VStack>
  </VStack>
</Box>
