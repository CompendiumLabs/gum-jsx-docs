const pal = palette(blue, purple, [3, 8])
const shapes = [
  [3, 'Triangle'], [4, 'Square'  ], [5, 'Pentagon'],
  [6, 'Hexagon' ], [7, 'Heptagon'], [8, 'Octagon' ],
]

const RegularPolygon = ({ n, ...args }) =>
  <SymPoly {...args} aspect
    xlim={[-1, 1]} ylim={[-1, 1]}
    tvals={linspace(0, 2*pi, n, false)}
    f={t => polar(t+pi/2*(n-2)/n)}
  />

return <Slide title="Simple Regular Polygons" gap={1.5} aspect={1.2} em={0.045}>
  <Text width={20}>
    A regular polygon has equal side lengths and equal interior angles. Below are examples for
    <Tex>{"n \\in \\{3, \\ldots, 8\\}"}</Tex>
  </Text>
  <TextGrid cols={3} gap={[1, 0.75]} align="center">
    { shapes.map(([n, s]) =>
      <Frame rounded fill padding aspect>
        <TextFigure caption={`${s} (${n})`}>
          <RegularPolygon n={n} fill={pal(n)} />
        </TextFigure>
      </Frame>
    ) }
  </TextGrid>
</Slide>
