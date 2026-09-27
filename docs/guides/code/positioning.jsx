// The same position meets three different points on an equally sized rectangle.
const Panel = ({ title, anchor, note }) => (
  <VStack align="center" gap={em(0.65)}>
    <Text font-weight={bold}>{title}</Text>
    <Group width={em(9)} height={em(7)}>
      <Rect fill={lightgray} stroke={none} border-radius={em(0.4)} />
      <Line from={[0, 0.5]} to={[1, 0.5]} stroke={darkgray} stroke-dasharray={em(0.2)} />
      <Line from={[0.5, 0]} to={[0.5, 1]} stroke={darkgray} stroke-dasharray={em(0.2)} />
      <Rect
        pos={[0.5, 0.5]}
        anchor={anchor}
        width={0.44}
        height={0.34}
        fill={blue}
        stroke={none}
        opacity={0.7}
        border-radius={em(0.2)}
      />
      <Dot pos={[0.5, 0.5]} width={em(0.5)} fill={black} stroke={white} />
    </Group>
    <Text font-size={em(0.8)}>{note}</Text>
  </VStack>
)

return (
  <Box fit font-size={px(18)} padding={em(1.25)}>
    <VStack gap={em(1)}>
      <Text font-size={em(1.4)} font-weight={bold}>One position, three anchors</Text>
      <Text>The dot marks the same position in each canvas.</Text>
      <HStack gap={em(1)}>
        <Panel title="start" anchor="start" note="Top-left at pos" />
        <Panel title="center (default)" note="Center at pos" />
        <Panel title="end" anchor="end" note="Bottom-right at pos" />
      </HStack>
      <Text font-family={mono} font-size={em(0.85)}>{'pos={[0.5, 0.5]}'}</Text>
    </VStack>
  </Box>
)
