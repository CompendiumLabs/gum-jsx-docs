// A damped oscillation beside explanatory prose and a formula-bearing list.
const envelope = (t) => exp(-0.3 * t)
return (
  <Slide fit font-size={px(14)} aspect={1.65} padding={em(1.6)} title="Damped Oscillation">
    <HStack gap={em(1.6)} align="center">
      <VStack grow={1.15} gap={em(0.6)} align="fill">
        <Plot aspect={1.5} xlim={[0, 8]} ylim={[-1.2, 1.2]} font-size={em(0.8)}>
          <SymLine
            fy={envelope}
            xlim={[0, 8]}
            stroke={darkgray}
            stroke-dasharray={[em(0.3), em(0.25)]}
          />
          <SymLine
            fy={(t) => -envelope(t)}
            xlim={[0, 8]}
            stroke={darkgray}
            stroke-dasharray={[em(0.3), em(0.25)]}
          />
          <SymLine
            fy={(t) => envelope(t) * cos(2 * t)}
            xlim={[0, 8]}
            samples={301}
            stroke={blue}
            stroke-width={em(0.16)}
          />
        </Plot>
        <Text font-size={em(0.8)}>A damped oscillation and its envelope</Text>
      </VStack>
      <TextCol grow={1} gap={em(1)}>
        <Text font-size={em(1.25)} font-weight={bold}>
          What the plot shows
        </Text>
        <Text>
          The oscillation loses energy to friction, so each swing is smaller than the last while
          the period stays the same.
        </Text>
        <Bullets gap={em(0.7)}>
          <Text>
            The envelope <Tex>{String.raw`e^{-0.3t}`}</Tex> bounds every peak.
          </Text>
          <Text>Zero crossings stay evenly spaced.</Text>
        </Bullets>
      </TextCol>
    </HStack>
  </Slide>
)
