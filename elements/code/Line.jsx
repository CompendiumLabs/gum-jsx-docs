// Stroke caps change the ends of otherwise identical horizontal line segments.
const Rule = ({ cap, color }) => (
  <HStack gap={em(1)} align="center">
    <Text width={px(64)}>{cap}</Text>
    <Line
      width={px(240)}
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
  <Svg font-size={px(16)}>
    <Box padding={em(1.25)} background={lightgray}>
      <VStack gap={em(1)}>
        <Rule cap="butt" color={blue} />
        <Rule cap="round" color={red} />
        <Rule cap="square" color={green} />
      </VStack>
    </Box>
  </Svg>
)
