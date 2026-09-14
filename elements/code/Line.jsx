// Stroke caps change the ends of otherwise identical horizontal line segments.
const Rule = ({ cap, color }) => (
  <HStack gap={px(16)} align="center">
    <Text width={px(64)}>{cap}</Text>
    <Line
      width={px(240)}
      height={px(24)}
      from={[0.05, 0.5]}
      to={[0.95, 0.5]}
      stroke={color}
      stroke_width={px(10)}
      stroke_linecap={cap}
    />
  </HStack>
)
return (
  <Svg>
    <Box padding={px(20)} background={lightgray}>
      <VStack gap={px(16)}>
        <Rule cap="butt" color={blue} />
        <Rule cap="round" color={red} />
        <Rule cap="square" color={green} />
      </VStack>
    </Box>
  </Svg>
)
