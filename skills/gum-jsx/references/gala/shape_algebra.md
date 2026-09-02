# Shape Algebra

This figure treats gum elements as first-class math atoms. A **MathText** row normally holds LaTeX strings and math elements, but an ordinary `Element` can be dropped in as well, where it counts as a single ordinary atom and is sized and spaced like one. Here that is used three times: a hand-built square sits on the right-hand side of a series, a `Circle` (the unit-aspect **Ellipse**) is the numerator of a **Frac** under a **Sqrt**, and two little matrices of colored swatches show a transpose you can see.

The nesting is what makes it work. Because the math constructors are just elements, the inline shapes participate in the layout at every level: the radical picks a surd tall enough to cover the fraction that contains the circle, the square **Bracket** stretches to the height of the swatch **MathArray** inside it, and the **SupSub** hangs its `\mathsf{T}` off the top corner of the bracket. Nothing about the shapes needs to know it is inside an equation.

`HalfSquare` is the one piece of real construction. It is a **Group** with `aspect={1}` holding six rectangles placed by explicit `rect` coordinates that halve at each step, colored along a `palette` from blue to red, with a bare **Rect** on top for the outline. The `Swatch` component wraps a rounded `Square` (the unit-aspect **Rect**) in a padded **Box** so the cells of the **MathArray** keep some air between them, and `SwatchMatrix` is a plain function that builds the bracketed array from a list of colors, so the two sides of the transpose differ only in the order of their arguments.

The three rows are separate **MathText** expressions stacked in an `even` **VStack** inside a **TitleFrame**, which gives each row the same height and centers it.

**Code**

```jsx
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
```