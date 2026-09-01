// Shape Algebra: gum elements as first-class math atoms

// a unit square eaten by successive halves: 1/2 + 1/4 + 1/8 + ... = 1
const halves = [
  [0.5, 0, 1, 1], [0, 0.5, 0.5, 1], [0.25, 0, 0.5, 0.5],
  [0, 0.25, 0.25, 0.5], [0.125, 0, 0.25, 0.25], [0, 0.125, 0.125, 0.25],
]
const pal = palette(blue, red, [0, halves.length - 1])
const HalfSquare = (attr) => <Group aspect={1} {...attr}>
  {halves.map((r, i) => <Rect rect={r} fill={pal(i)} />)}
  <Rect />
</Group>

const Swatch = ({ fill, ...attr }) => <Box padding>
  <Square rounded fill={fill} {...attr} />
</Box>
const SwatchMatrix = (colors) => <Bracket delim="square">
  <MathArray ncol={2}>
    {colors.map(c => <Swatch fill={c} />)}
  </MathArray>
</Bracket>

// a diagram as the value of a series
const series = <MathText>
  <SupSub sup="\infty" sub="n=1"><MathOp>\sum</MathOp></SupSub>
  <Frac>{"1"}{"2^n"}</Frac>
  <MathSymbol>=</MathSymbol>
  <HalfSquare />
  <MathSymbol>=</MathSymbol>
  <MathSymbol>1</MathSymbol>
</MathText>

// a circle inside a fraction inside a radical
const radius = <MathText>
  <MathSymbol>r</MathSymbol>
  <MathSymbol>=</MathSymbol>
  <Sqrt>
    <Frac>
      <Circle fill={blue} fill-opacity={0.6} />
      <MathSymbol>\pi</MathSymbol>
    </Frac>
  </Sqrt>
</MathText>

// a matrix transpose you can see
const transpose = <MathText>
  <SupSub sup="\mathsf{T}">
    {SwatchMatrix([blue, red, green, yellow])}
  </SupSub>
  <MathSymbol>=</MathSymbol>
  {SwatchMatrix([blue, green, red, yellow])}
</MathText>

// stack 'em up evenly for a slide
return <TitleFrame title="Shape Algebra" padding margin border={2} title-border={2} rounded={0.02}>
  <VStack even spacing>
    {series}
    {radius}
    {transpose}
  </VStack>
</TitleFrame>
