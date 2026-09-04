# Scenic Route

This one shows off how far you can push custom arrow-like operators in math mode. The built-in stretchy arrows (`MathStretch` handles everything from `\xrightarrow` to the frankly whimsical `\xhookrightarrow`) are drawn shapes rather than font glyphs, and there is nothing stopping you from drawing your own. Here we build a "scenic route" arrow: a straight shaft with a figure-eight knot tied in the middle, and it drops right into a **MathText** row next to real symbols.

The key trick is that any plain element placed in a `MathText` is treated as a math atom: it gets a width equal to its aspect ratio and a one-em box centered on the math axis. So a `Group` with `aspect={w}` and `coord={[0, 0, w, 1]}` is a blank canvas that is exactly `w` ems wide and one em tall, with the shaft height at `0.5` sitting on the axis. Draw in it and you have a math operator. One refinement: a bare element is classed as an ordinary atom, which gets no breathing room against its neighbors, so we wrap the group in a `MathBox` with `klass="mrel"` — the row then spaces it exactly the way it spaces `\xrightarrow` and friends.

The knot is a single rope traced by one **Arrow** with a custom `points` path and a spline `curve`: in along the shaft, up and around the right lobe clockwise, backward through the middle, around the left lobe counterclockwise, and out along the shaft again. Passing the path to `Arrow` rather than drawing a bare spline lets it handle the head for us, trimming the shaft by half a stroke so the tip lands cleanly. The lobes are generated as sampled circle arcs (the same `map`-over-angles trick as the other gallery figures), and the connecting diagonals leave each lobe tangentially at 45 degrees, which packs the crossings into the tight central X of the classic flat figure-eight knot. The lobe size hangs off a single `knot` parameter for easy tweaking, and since the geometry is specified in ems relative to the midpoint, the arrow is extensible in the same way the `\x`-arrows are: the shaft stretches with `w` while the knot stays exactly the same size.

**Code**

```jsx
// The Scenic Route: a custom extensible arrow with a figure-eight knot

// circle arc samples: center (cx, 0), radius r, degrees th0 -> th1 (y up)
const arc = (cx, r, th0, th1) =>
  linspace(th0, th1, 7, true).map(th => polard(th, r, [cx, 0]))

// the diagonals leave the lobes tangentially at 45 degrees, so the crossings sit in a tight central X
const ropePath = (w, cx, r) =>
  [
    [ -w / 2, 0 ],
    [ -w / 4, 0 ],
    [ -0.36 * cx, 0.03 ],
    ...arc(cx, r, 135, -135),
    [ 0, 0 ],
    ...arc(-cx, r, 45, 315),
    [ 0.36 * cx, -0.03 ],
    [ w / 4, 0 ],
    [ w / 2, 0 ],
  ].map(([ x, y ]) => [ w / 2 + x, 0.5 - y ])

// the MathBox wrapper classes it as a relation so the row gives it real space.
const ScenicArrow = ({ w = 3, knot = 0.175, ...attr }) => {
  return <MathBox klass="mrel">
    <Group aspect={w} coord={[0, 0, w, 1]} {...attr}>
      <Arrow points={ropePath(w, 1.4 * knot, knot)} coord={[0, 0, w, 1]} stroke-width={4} stroke-linecap="round" curve={0.5} arrow-size={0.7} arrow-curve={0.7} arrow-arc={92} />
    </Group>
  </MathBox>
}

const CompareRow = ({ children, label }) =>
  <HStack>
    <Box>{children}</Box>
    <Box stack-size={0.4}><Text ysize={0.7}>{label}</Text></Box>
  </HStack>

return <TitleFrame title="From A to B" title-size={0.15} padding margin rounded>
  <VStack spacing={0.05}>
    <CompareRow label="the direct method">
      <Latex>{"A \\xrightarrow{\\quad\\quad} B"}</Latex>
    </CompareRow>
    <CompareRow label="the polite detour">
      <Latex>{"A \\xhookrightarrow{\\quad\\quad} B"}</Latex>
    </CompareRow>
    <CompareRow label="the scenic route">
      <MathText strut>
        <MathSymbol>A</MathSymbol>
        <ScenicArrow w={2.5} />
        <MathSymbol>B</MathSymbol>
      </MathText>
    </CompareRow>
  </VStack>
</TitleFrame>
```