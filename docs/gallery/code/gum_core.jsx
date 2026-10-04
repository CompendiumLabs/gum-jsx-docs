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
const area = { width: 50, height: 16 }
const input = { width: 13, height: 6.5 }
const output = { width: 11, height: 4.7 }
const inputTop = input.height / 2
const inputBottom = area.height - input.height / 2
const chip = { x: area.width / 2, y: area.height / 2, size: 11 }
const half = chip.size / 2

const outputs = [
  { label: 'SVG', detail: 'Scalable vectors', color: mint, y: output.height / 2 },
  { label: 'PNG / MP4', detail: 'Ready-to-use pixels', color: blue, y: area.height / 2 },
  { label: 'PDF / PPTX', detail: 'Print-ready pages', color: gold, y: area.height - output.height / 2 },
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
    <VStack gap={em(2)}>
      <Text font-size={em(2)} font-weight={bold}>Gum is a compact and versatile renderer</Text>
      <Group width={em(area.width)} height={em(area.height)}>
        {range(1, area.width).flatMap(x => range(1, area.height).map(y => (
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
        <Trace arrow points={[[input.width, inputTop], [15, inputTop], [15, 6], [chip.x - half, 6]]} />
        <Trace arrow color={blue} points={[[input.width, inputBottom], [16, inputBottom], [16, 10], [chip.x - half, 10]]} />
        {outputs.map(({ color, y }, index) => (
          <Trace arrow color={color} points={[
            [chip.x + half, chip.y + (index - 1) * 3],
            [34 + index, chip.y + (index - 1) * 3],
            [34 + index, y], [area.width - output.width, y],
          ]} />
        ))}
        <Card pos={point(input.width / 2, inputTop)} width={em(input.width)} height={em(input.height)}>
          <VStack gap={em(0.5)}>
            <Text font-weight={bold} color={mint}>Gum JSX</Text>
            <Text font-family={mono} font-size={em(0.75)} whitespace="pre">{`<Frame padding={em(1)}>
  <Circle fill={mint} />
</Frame>`}</Text>
          </VStack>
        </Card>
        <Card pos={point(input.width / 2, inputBottom)} width={em(input.width)} height={em(input.height)}>
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
            <VStack width="fill" height="fill" align="center" justify="center" gap={em(0.5)}>
              <Text font-size={em(2.4)} font-weight="bold" color={mint}>GUM</Text>
              <Text font-size={em(0.85)} font-weight="bold">RENDERING CORE</Text>
              <Text font-family={mono} font-size={em(0.9)} color={mint}>0.9 MB code</Text>
              <Text font-family={mono} font-size={em(0.9)} color={blue}>0.7 MB font</Text>
            </VStack>
          </Frame>
        </Frame>
        {outputs.map(({ label, detail, color, y }) => (
          <Card pos={point(area.width - output.width / 2, y)} width={em(output.width)} height={em(output.height)}>
            <VStack gap={em(0.3)}>
              <Text font-size={em(1.2)} font-weight="bold" color={color}>{label}</Text>
              <Text font-size={em(0.75)} color={muted}>{detail}</Text>
            </VStack>
          </Card>
        ))}
      </Group>
    </VStack>
  </Box>
)
