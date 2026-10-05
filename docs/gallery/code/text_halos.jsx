// The same label positions show how a halo separates text from crossing lines.
const Panel = ({ halo, title }) => (
  <VStack gap={em(0.7)}>
    <Text font-weight={bold}>{title}</Text>
    <Box background={white} border-color={gray} border-width={px(1)}>
      <Graph
        width={em(14)}
        aspect={1.4}
        xlim={[0, 10]}
        ylim={[0, 10]}
        halo-color={halo}
      >
        {[2, 4, 6, 8].map(y => (
          <Line
            from={[0, y]}
            to={[10, y]}
            stroke={gray}
            stroke-width={px(1)}
          />
        ))}
        <Line from={[0, 2]} to={[10, 8]} stroke={blue} stroke-width={em(0.18)} />
        <Line from={[0, 8]} to={[10, 2]} stroke={red} stroke-width={em(0.18)} />
        <Line from={[0, 5]} to={[10, 5]} stroke={green} stroke-width={em(0.12)} />
        <Text pos={[3.2, 7.5]} font-size={em(0.85)}>River Thames</Text>
        <Text pos={[5, 5]} font-weight={bold}>Central station</Text>
        <Text pos={[6.8, 2.5]} font-size={em(0.85)}>
          {"South "}<Span color={blue}>bank</Span>
        </Text>
      </Graph>
    </Box>
  </VStack>
)

return (
  <Box fit padding={em(1.5)} background={lightgray} color={slate} font-size={px(22)}>
    <HStack gap={em(1.5)}>
      <Panel title="Plain text" halo={none} />
      <Panel title="Text with halo" halo={white} />
    </HStack>
  </Box>
)
