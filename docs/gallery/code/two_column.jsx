// A damped oscillation beside explanatory prose and a formula-bearing list.
const envelope = (t) => exp(-0.3 * t)
return (
  <Box fit font-size={px(20)} padding={em(1.6)}>
    <VStack gap={em(1.5)}>
      <Text font-size={em(1.7)} font-weight={bold}>
        Damped Oscillation
      </Text>
      <HStack gap={em(1.6)} align="start">
        <VStack grow={1} shrink={1} basis={em(20)} gap={em(0.6)} align="center">
          <Plot aspect={1.5} xlim={[0, 8]} ylim={[-1.2, 1.2]} font-size={em(0.8)}>
            <SymLine
              fy={envelope}
              xlim={[0, 8]}
              stroke={darkgray}
              stroke-dasharray={[px(5), px(4)]}
            />
            <SymLine
              fy={(t) => -envelope(t)}
              xlim={[0, 8]}
              stroke={darkgray}
              stroke-dasharray={[px(5), px(4)]}
            />
            <SymLine
              fy={(t) => envelope(t) * cos(2 * t)}
              xlim={[0, 8]}
              samples={301}
              stroke={blue}
              stroke-width={px(2.5)}
            />
          </Plot>
          <Text font-size={em(0.8)}>A damped oscillation and its envelope</Text>
        </VStack>
        <TextCol grow={1} shrink={1} basis={em(16)} gap={em(1)}>
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
    </VStack>
  </Box>
)
