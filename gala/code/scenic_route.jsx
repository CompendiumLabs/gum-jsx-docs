// The Scenic Route: a custom extensible arrow with a figure-eight knot

// circle arc samples: center (cx, 0), radius r, degrees th0 -> th1 (y up)
const arc = (cx, r, th0, th1) =>
  linspace(th0, th1, 7, true).map(th => [cx + r * cos(th * d2r), r * sin(th * d2r)])

// one rope, relative to the knot center: in along the shaft, up and around
// the right lobe clockwise, back through the middle, around the left lobe
// counterclockwise, and out along the shaft. The diagonals leave the lobes
// tangentially at 45 degrees, so the crossings sit in a tight central X
const ropePath = (w, cx, r) => {
  const [ run, h ] = [ w / 2, r * sin(45 * d2r) ]
  const bend = 0.36 * cx
  const knot = [
    [ -bend, 0.02 ],
    ...arc(cx, r, 135, -135),
    [ 0, 0 ],
    ...arc(-cx, r, 45, 315),
    [ bend, -0.02 ],
  ]
  const shaft = x => [ [ x, 0 ], [ 2 * x / 3, 0 ], [ x / 3, 0 ] ]
  const points = [ ...shaft(-run + 0.05), ...knot, ...shaft(run - 0.05).reverse() ]
  return points.map(([ x, y ]) => [ w / 2 + x, 0.5 - y ])
}

// the arrow is an ordinary Group posing as a math atom: a plain element in a
// MathText gets advance = aspect and a 1em line box on the axis; leaving the
// stroke unset lets it inherit the theme ink like any other element. The
// knot parameter scales the whole figure eight relative to the shaft
const ScenicArrow = ({ w = 3, knot = 0.5, color, ...attr }) => {
  const ink = color != null ? { stroke: color } : {}
  return <Group aspect={w} coord={[0, 0, w, 1]} {...attr}>
    <Arrow points={ropePath(w, 0.55 * knot, 0.4 * knot)} curve={0.5} coord={[0, 0, w, 1]} arrow-size={0.6} stroke-width={3.5} stroke-linecap="round" arrow-curve={0.75} {...ink} />
  </Group>
}

//
// the figure
//

const CompareRow = ({ children, label }) =>
  <HStack>
    <Box>{children}</Box>
    <Box stack-size={0.4}><Text ysize={0.7}>{label}</Text></Box>
  </HStack>

return <TitleFrame title="The Scenic Route" title-size={0.15} padding margin rounded>
  <VStack spacing={0.05}>
    <CompareRow label="the direct route"><Latex>{"A \\xrightarrow{\\quad\\quad} B"}</Latex></CompareRow>
    <CompareRow label="the polite detour"><Latex>{"A \\xhookrightarrow{\\quad\\quad} B"}</Latex></CompareRow>
    <CompareRow label="the scenic route">
      <MathText strut>
        <MathSymbol>A</MathSymbol>
        <ScenicArrow w={2.5} />
        <MathSymbol>B</MathSymbol>
      </MathText>
    </CompareRow>
  </VStack>
</TitleFrame>
