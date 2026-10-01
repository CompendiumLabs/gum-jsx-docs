// A tiny rendering engine, drawn with the engine itself.
const ink = '#173B33'
const muted = '#587269'
const mint = '#087C57'
const blue = '#226EA7'
const gold = '#A26713'
const board = '#F7FAF8'
const panel = '#FFFFFF'
const grid = '#CEDFD6'
const point = (x, y) => [em(x), em(y)]
const chip = { x: 25, y: 9, size: 11 }
const half = chip.size / 2
const outputs = [
  { label: 'SVG', detail: 'Scalable vectors', color: mint, y: 3.6 },
  { label: 'PNG', detail: 'Ready-to-use pixels', color: blue, y: 9 },
  { label: 'PDF', detail: 'Print-ready pages', color: gold, y: 14.4 },
]
const Trace = ({ points, color = mint, arrow = false }) => (
  <Arrow
    points={points.map(([x, y]) => point(x, y))}
    end-head={arrow} radius={em(0.35)}
    stroke={color} stroke-width={em(0.1)} head-size={em(0.4)}
  />
)
const Card = ({ children, ...props }) => (
  <Frame
    padding={em(1)} background={panel}
    border-color={grid} border-width={em(0.06)} border-radius={em(0.5)}
    {...props}
  >
    {children}
  </Frame>
)

return (
  <Box fit font-size={px(20)} padding={em(2.5)} background={board} color={ink}>
    <VStack gap={em(1.4)}>
      <HStack width={em(50)} align="center" justify="space-between">
        <VStack gap={em(0.35)}>
          <Text font-size={em(0.7)} color={mint} font-weight="bold">GUM 2.0</Text>
          <Text font-size={em(2)} font-weight="bold">Small core. Big possibilities.</Text>
        </VStack>
        <Text color={muted} font-size={em(0.8)}>gum-jsx-cli</Text>
      </HStack>
      <Group width={em(50)} height={em(18)}>
        {range(1, 50).flatMap(x => range(1, 18).map(y => (
          <Circle pos={point(x, y)} width={em(0.055)} fill={grid} stroke={none} />
        )))}
        {range(-4, 5).flatMap(offset => [
          <Trace color={grid} points={[
            [chip.x + offset, chip.y - half - 1.3],
            [chip.x + offset, chip.y - half],
          ]} />,
          <Trace color={grid} points={[
            [chip.x + offset, chip.y + half],
            [chip.x + offset, chip.y + half + 1.3],
          ]} />,
          <Trace color={grid} points={[
            [chip.x - half - 1.3, chip.y + offset],
            [chip.x - half, chip.y + offset],
          ]} />,
          <Trace color={grid} points={[
            [chip.x + half, chip.y + offset],
            [chip.x + half + 1.3, chip.y + offset],
          ]} />,
        ])}
        <Trace arrow points={[[13, 5], [16, 5], [16, 7], [chip.x - half, 7]]} />
        <Trace arrow color={blue} points={[[13, 13], [16, 13], [16, 11], [chip.x - half, 11]]} />
        {outputs.map(({ color, y }, index) => (
          <Trace arrow color={color} points={[
            [chip.x + half, chip.y + (index - 1) * 3],
            [34 + index, chip.y + (index - 1) * 3],
            [34 + index, y], [39, y],
          ]} />
        ))}
        <Card pos={point(6.5, 5)} width={em(13)} height={em(6.5)}>
          <VStack gap={em(0.5)}>
            <Text font-weight={bold} color={mint}>Gum JSX</Text>
            <Text font-family={mono} font-size={em(0.75)} whitespace="pre">{`<Frame padding={em(1)}>
  <Circle fill={mint} />
</Frame>`}</Text>
          </VStack>
        </Card>
        <Card pos={point(6.5, 13)} width={em(13)} height={em(6.5)}>
          <VStack gap={em(0.5)}>
            <Text font-weight={bold} color={blue}>TeX math</Text>
            <Text font-family={mono} font-size={em(0.75)}>{String.raw`e^{i\pi} + 1 = 0`}</Text>
            <Text color={muted} font-size={em(0.7)}>Built right into your JSX</Text>
          </VStack>
        </Card>
        <Frame
          pos={point(chip.x, chip.y)} width={em(chip.size)} height={em(chip.size)}
          padding={em(0.5)} border-radius={em(0.65)}
          border-color={mint} border-width={em(0.1)} background={panel}
        >
          <Frame
            padding={em(0.8)} border-color={grid}
            border-width={em(0.06)} border-radius={em(0.3)}
          >
            <VStack width="fill" height="fill" align="center" justify="center" gap={em(0.7)}>
              <Text font-size={em(2.4)} font-weight="bold" color={mint}>gum</Text>
              <Text font-size={em(0.85)} font-weight="bold">RENDERING CORE</Text>
              <Text font-size={em(0.6)} color={muted}>Evaluate · Layout · Render</Text>
            </VStack>
          </Frame>
        </Frame>
        {outputs.map(({ label, detail, color, y }) => (
          <Card pos={point(44.5, y)} width={em(11)} height={em(4.7)}>
            <VStack gap={em(0.3)}>
              <Text font-size={em(1.2)} font-weight="bold" color={color}>{label}</Text>
              <Text font-size={em(0.75)} color={muted}>{detail}</Text>
            </VStack>
          </Card>
        ))}
      </Group>
      <HStack width={em(50)} align="center" justify="space-between">
        <Text font-size={em(0.85)} color={muted}>One compact engine. Zero dependencies.</Text>
        <HStack gap={em(0.6)} align="center">
          <Text font-weight="bold" color={mint}>0.9 MB code</Text>
          <Text color={muted}>+</Text>
          <Text font-weight="bold" color={blue}>0.7 MB fonts</Text>
        </HStack>
      </HStack>
    </VStack>
  </Box>
)
