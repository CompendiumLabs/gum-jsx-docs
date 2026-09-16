// Six regular polygons arranged in two explicit rows.
const shapes = [
  [3, "Triangle"],
  [4, "Square"],
  [5, "Pentagon"],
  [6, "Hexagon"],
  [7, "Heptagon"],
  [8, "Octagon"],
]
const paint = palette(blue, purple, [3, 8])
const Cell = ({ n, label }) => (
  <Frame
    width={px(220)}
    padding={px(14)}
    radius={px(12)}
    background={lightgray}
    border-color={gray}
  >
    <VStack gap={px(12)} align="center">
      <Graph width={px(180)} height={px(160)} xlim={[-1.2, 1.2]} ylim={[-1.2, 1.2]}>
        <SymPoly
          tvals={linspace(0, tau, n, false)}
          f={(t) => polar(t + ((pi / 2) * (n - 2)) / n)}
          fill={paint(n)}
          stroke={slate}
          stroke-width={px(2)}
        />
      </Graph>
      <Text>{label + " (" + n + ")"}</Text>
    </VStack>
  </Frame>
)
return (
  <Svg width={px(780)} height={px(650)} font-size={px(18)}>
    <Box padding={px(30)}>
      <VStack width="fill" gap={px(22)}>
        <Text font-size={px(30)} font-weight={bold}>
          Simple Regular Polygons
        </Text>
        <Text width="fill">
          Equal side lengths and equal interior angles, from three sides to eight.
        </Text>
        {[0, 3].map((offset) => (
          <HStack gap={px(20)}>
            {shapes.slice(offset, offset + 3).map(([n, label]) => (
              <Cell n={n} label={label} />
            ))}
          </HStack>
        ))}
      </VStack>
    </Box>
  </Svg>
)
