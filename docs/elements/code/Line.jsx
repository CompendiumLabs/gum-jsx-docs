// Stroke caps change the ends of otherwise identical horizontal line segments.
const Rule = ({ cap, color }) => (
  <HStack gap={em(1)} align="center">
    <Text width={px(64)}>{cap}</Text>
    <Line
      grow={1}
      height={px(24)}
      from={[0.05, 0.5]}
      to={[0.95, 0.5]}
      stroke={color}
      stroke-width={px(10)}
      stroke-linecap={cap}
    />
  </HStack>
)
return (
  <Box padding={em(1.25)} background={lightgray}>
    <VStack gap={em(1)}>
      <Rule cap="butt" color={blue} />
      <Rule cap="round" color={red} />
      <Rule cap="square" color={green} />
    </VStack>
  </Box>
)
