// A damped oscillation beside explanatory prose and a formula-bearing list.
const envelope = (t) => exp(-0.3 * t)
return (
  <Svg width={px(1000)} height={px(560)} font-size={px(20)}>
    <Box padding={px(32)}>
      <VStack width="fill" gap={px(30)}>
        <Text font-size={px(34)} font-weight={bold}>
          Damped Oscillation
        </Text>
        <HStack width="fill" gap={px(32)} align="start">
          <VStack width={px(500)} gap={px(12)} align="center">
            <Plot width="fill" height={px(330)} xlim={[0, 8]} ylim={[-1.2, 1.2]} font-size={px(16)}>
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
            <Text font-size={px(16)}>A damped oscillation and its envelope</Text>
          </VStack>
          <TextCol width={px(400)} gap={px(20)}>
            <Text font-size={px(25)} font-weight={bold}>
              What the plot shows
            </Text>
            <Text>
              The oscillation loses energy to friction, so each swing is smaller than the last while
              the period stays the same.
            </Text>
            <Bullets gap={px(14)}>
              <Text>
                The envelope <Tex>{String.raw`e^{-0.3t}`}</Tex> bounds every peak.
              </Text>
              <Text>Zero crossings stay evenly spaced.</Text>
            </Bullets>
          </TextCol>
        </HStack>
      </VStack>
    </Box>
  </Svg>
)
