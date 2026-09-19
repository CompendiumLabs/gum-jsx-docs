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
    padding={em(1)}
    radius={em(0.5)}
    background={lightgray}
    border-color={gray}
  >
    <VStack align="center" gap={em(0.5)}>
      <Graph aspect={1} xlim={[-1, 1]} ylim={[-1, 1]}>
        <SymPoly
          tvals={linspace(0, tau, n, false)}
          f={(t) => polar(t + ((pi / 2) * (n - 2)) / n, -1)}
          fill={paint(n)}
        />
      </Graph>
      <Text>{`${label} (${n})`}</Text>
    </VStack>
  </Frame>
)
return <Box font-size={px(22)} padding={em(2)}>
  <VStack gap={em(1)}>
    <Text font-size={em(1.35)} font-weight={bold}>Simple Regular Polygons</Text>
    <Text>Equal side lengths and equal interior angles, from three sides to eight.</Text>
    {[0, 3].map((offset) => (
      <HStack gap={em(1)}>
        {shapes.slice(offset, offset + 3).map(([n, label]) => (
          <Cell n={n} label={label} />
        ))}
      </HStack>
    ))}
  </VStack>
</Box>
