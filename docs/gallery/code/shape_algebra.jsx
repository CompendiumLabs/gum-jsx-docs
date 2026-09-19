// Ordinary shapes become operands in a series, a radical, and a matrix transpose.
const halves = [
  [0.5, 0, 1, 1],
  [0, 0.5, 0.5, 1],
  [0.25, 0, 0.5, 0.5],
  [0, 0.25, 0.25, 0.5],
  [0.125, 0, 0.25, 0.25],
  [0, 0.125, 0.125, 0.25],
]
const paint = palette(blue, red, [0, halves.length - 1])
const HalfSquare = () => (
  <Group width={em(2.2)} height={em(2.2)}>
    {halves.map(([x0, y0, x1, y1], i) => (
      <Rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={paint(i)} stroke={none} />
    ))}
    <Rect fill={none} stroke={slate} stroke-width={em(0.03)} />
  </Group>
)
const Matrix = ({ colors }) => (
  <Bracket delim="square">
    <MathArray ncol={2} colsep={em(0.12)}>
      {colors.map((color) => (
        <Square width={em(0.75)} fill={color} stroke={none} />
      ))}
    </MathArray>
  </Bracket>
)
return (
  <TitleFrame
    font-size={px(34)}
    title="Shape Algebra"
    title-font-size={em(0.6)}
    padding={em(0.7)}
    border-width={em(0.03)}
    radius={em(0.4)}
    align="center"
  >
    <VStack gap={em(0.8)} align="center">
      <MathText style="display">
        <SupSub sup={String.raw`\infty`} sub="n=1">
          <MathOp>{String.raw`\sum`}</MathOp>
        </SupSub>
        <Frac>
          1
          <SupSub sup="n">2</SupSub>
        </Frac>
        =
        <HalfSquare />
        = 1
      </MathText>
      <MathText style="display">
        r =
        <Sqrt>
          <Frac>
            <Circle width={em(1.1)} fill={interp(white, blue, 0.7)} stroke={none} />
            <MathSymbol>{String.raw`\pi`}</MathSymbol>
          </Frac>
        </Sqrt>
      </MathText>
      <MathText style="display">
        <SupSub sup={String.raw`\mathsf{T}`}>
          <Matrix colors={[blue, red, green, yellow]} />
        </SupSub>
        =
        <Matrix colors={[blue, green, red, yellow]} />
      </MathText>
    </VStack>
  </TitleFrame>
)
