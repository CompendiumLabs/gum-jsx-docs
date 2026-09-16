// A figure-eight spline acts as a relation between two math atoms.
const arc = (cx, radius, a, b) =>
  linspace(a, b, 13).map((angle) => {
    const point = polard(angle, radius, [cx, 0])
    return [point.x, point.y]
  })
const rope = (width, cx, radius) =>
  [
    [-width / 2, 0],
    [-width / 4, 0],
    [-0.36 * cx, 0.03],
    ...arc(cx, radius, 135, -135),
    [0, 0],
    ...arc(-cx, radius, 45, 315),
    [0.36 * cx, -0.03],
    [width / 4, 0],
    [width / 2, 0],
  ].map(([x, y]) => [width / 2 + x, 0.5 - y])
const ScenicArrow = () => (
  <MathBox klass="mrel">
    <Graph width={em(4)} height={em(1.2)} xlim={[0, 2.5]} ylim={[0, 1]} flip-y={false}>
      <Arrow
        points={rope(2.5, 0.245, 0.175)}
        curve
        tension={0.5}
        stroke={slate}
        stroke-width={px(2.5)}
        head-size={px(12)}
        head-curve={0.7}
      />
    </Graph>
  </MathBox>
)
const Row = ({ label, children }) => (
  <HStack gap={px(32)} align="center">
    <Box width={px(310)}>{children}</Box>
    <Text font-size={px(20)}>{label}</Text>
  </HStack>
)
return (
  <Svg width={px(800)} height={px(400)} font-size={px(32)}>
    <Box padding={px(30)}>
      <TitleFrame
        title="From A to B"
        title-font-size={px(30)}
        padding={px(24)}
        radius={px(14)}
        gap={px(28)}
      >
        <VStack gap={px(32)}>
          <Row label="the direct method">
            <Latex>{String.raw`A\xrightarrow{\quad\quad}B`}</Latex>
          </Row>
          <Row label="the polite detour">
            <Latex>{String.raw`A\xhookrightarrow{\quad\quad}B`}</Latex>
          </Row>
          <Row label="the scenic route">
            <MathText>
              A
              <ScenicArrow />B
            </MathText>
          </Row>
        </VStack>
      </TitleFrame>
    </Box>
  </Svg>
)
