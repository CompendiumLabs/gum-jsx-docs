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
