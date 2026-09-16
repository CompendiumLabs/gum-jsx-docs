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
  <Latex x={x} y={y} anchor="center" font-size={px(25)} color={color}>
    {children}
  </Latex>
)

return (
  <Svg width={px(640)} height={px(600)} font-size={px(18)} color={ink}>
    <Box padding={px(28)} background={white}>
      <VStack width="fill" gap={px(22)} align="center">
        <Text font-size={px(28)} font-weight={bold}>Simple Pendulum</Text>
        <Frame
          width="fill"
          height={px(420)}
          background={paper}
          border-color={ink}
          border-width={px(2)}
          radius={px(16)}
          clip
        >
          <Graph xlim={[0, 580]} ylim={[0, 416]} flip-y={false}>
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
              width={px(260)} height={px(84)}
              radius={px(10)} fill={support} stroke={ink} stroke-width={px(1.5)}
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
              width={px(9)} fill={darkgray} stroke={none}
            />
            <CoordLine points={[pivot, bob]} stroke={ink} stroke-width={px(3)} />
            <Label x={mid[0] - 22} y={mid[1] + 12}>
              {String.raw`\ell`}
            </Label>
            <Circle
              x={pivot[0]} y={pivot[1]} anchor="center"
              width={px(12)} fill={ink} stroke={none}
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
              width={px(2 * bobRadius)} fill={tension} stroke={ink} stroke-width={px(2)}
            />
            <Label x={bob[0]} y={bob[1]} color={white}>m</Label>
          </Graph>
        </Frame>
        <Latex font-size={px(27)}>
          {String.raw`\ddot{\theta}=-\frac{g}{\ell}\sin\theta`}
        </Latex>
      </VStack>
    </Box>
  </Svg>
)
