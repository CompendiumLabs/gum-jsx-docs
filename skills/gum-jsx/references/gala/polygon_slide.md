# Polygon Slide

This one is built in a nicely modular way. The key move is the local `RegularPolygon` component, which wraps **SymPoly** and hides the circle parameterization with `fx={cos}`, `fy={sin}`, and `tvals`. Once that helper exists, the slide can generate six examples by simply mapping over `[n, name]` pairs.

The overall composition is handled with layout elements rather than manual positioning. A **Slide** provides the title and sets the em with `em={0.045}`, and a **TextGrid** lays out the six cards in three columns. Each card is a **TextFrame** around a **TextFigure**: the polygon is three and a half ems tall and its label is a caption at the text size, so every card sizes from the same em and nothing needs a `stack-size`.

The color handling is also worth noting. `palette(blue, purple, [3, 8])` turns the side count into a smooth color ramp, so the sequence reads as a progression rather than a collection of unrelated fills. There is also a small `spin` adjustment in `RegularPolygon`, which helps each shape sit in a more natural upright orientation.

**Code**

```jsx
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

return <Slide title="Simple Regular Polygons" em={0.045} gap={1}>
  <Text>
    A regular polygon has equal side lengths and equal interior angles. Below are examples for
    <Tex>{"n \\in \\{3, \\ldots, 8\\}"}</Tex>
  </Text>
  <TextGrid cols={3} gap={[1, 0.75]} justify="center">
    { shapes.map(([n, s]) =>
      <TextFrame rounded fill padding={0.6}>
        <TextFigure height={3.5} caption={`${s} (${n})`}>
          <RegularPolygon n={n} fill={pal(n)} />
        </TextFigure>
      </TextFrame>
    ) }
  </TextGrid>
</Slide>
```