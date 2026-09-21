// A parameter-driven pendulum with force arrows, an angle arc, and a math caption.
const ink = slate
const support = interp(white, yellow, 0.28)
const paper = interp(white, yellow, 0.07)
const gravity = interp(slate, red, 0.65)
const tension = interp(slate, green, 0.6)

const pivot = [280, 42]
const angle = 25
const length = 285
const bobRadius = 27
const alongRod = distance => [
  pivot[0] + distance * sin(angle * pi / 180),
  pivot[1] + distance * cos(angle * pi / 180),
]
const bob = alongRod(length)
const mid = alongRod(length * 0.5)
const tip = alongRod(length * 0.72)
const Label = ({ x, y, color = ink, children }) => (
  <Latex x={x} y={y} anchor="center" font-size={em(1.4)} color={color}>
    {children}
  </Latex>
)

return (
  <Box color={ink} padding={em(1.55)} background={white}>
    <VStack gap={em(1.2)} align="center">
      <Text font-size={em(1.55)} font-weight={bold}>Simple Pendulum</Text>
      <Frame
        background={paper}
        border-color={ink}
        border-width={px(2)}
        border-radius={em(0.9)}
        clip
      >
        <Graph aspect={580 / 416} xlim={[0, 580]} ylim={[0, 416]} flip-y={false}>
          <Mesh2D
            xlim={[0, 580]} ylim={[0, 416]}
            xticks={range(0, 581, 25)}
            yticks={range(0, 417, 25)}
            stroke={ink}
            opacity={0.09}
            stroke-width={px(1)}
          />
          <RoundedRect
            x={pivot[0]} y={0} anchor="center"
            width={0.45} height={0.2}
            border-radius={px(10)} fill={support} stroke={ink} stroke-width={px(1.5)}
          />
          <Arc
            center={pivot} radius={95} start={90 - angle} end={90}
            stroke={gravity} stroke-width={px(2)}
          />
          <Label x={pivot[0] + 23} y={pivot[1] + 118} color={gravity}>
            {String.raw`\theta`}
          </Label>
          <CoordLine
            points={[pivot, [pivot[0], pivot[1] + length]]}
            stroke={darkgray} stroke-width={px(2)} stroke-dasharray={[px(5), px(5)]}
          />
          <Circle
            x={pivot[0]} y={pivot[1] + length} anchor="center"
            width={0.016} fill={darkgray} stroke={none}
          />
          <CoordLine points={[pivot, bob]} stroke={ink} stroke-width={px(3)} />
          <Label x={mid[0] - 22} y={mid[1] + 12}>
            {String.raw`\ell`}
          </Label>
          <Circle
            x={pivot[0]} y={pivot[1]} anchor="center"
            width={0.02} fill={ink} stroke={none}
          />
          <Arrow
            from={alongRod(length - bobRadius)} to={tip}
            stroke={tension} stroke-width={px(3)} head-size={px(12)}
          />
          <Label x={tip[0] + 28} y={tip[1]} color={tension}>T</Label>
          <Arrow
            from={[bob[0], bob[1] + bobRadius]} to={[bob[0], bob[1] + 95]}
            stroke={gravity} stroke-width={px(3)} head-size={px(12)}
          />
          <Label x={bob[0] + 38} y={bob[1] + 72} color={gravity}>mg</Label>
          <Circle
            x={bob[0]} y={bob[1]} anchor="center"
            width={(2 * bobRadius) / 580} fill={tension} stroke={ink} stroke-width={px(2)}
          />
          <Label x={bob[0]} y={bob[1]} color={white}>m</Label>
        </Graph>
      </Frame>
      <Latex font-size={em(1.5)}>
        {String.raw`\ddot{\theta}=-\frac{g}{\ell}\sin\theta`}
      </Latex>
    </VStack>
  </Box>
)
