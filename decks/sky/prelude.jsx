// Gum JSX: measured slide layout, reusable diagrams, and local geometric canvases.
const ink = '#24324B'
const paper = '#FFF8E9'
const blueLight = '#338BD0'
const airBlue = '#DCEFFA'
const gold = '#F5C547'
const coral = '#F16F5D'
const green = '#4DAE91'
const night = '#17263F'
const spectrum = ['#ED665E', '#F39942', '#F4CB48', '#61B77B', '#419BDD', '#6474C5', '#A37AC8']

function Page({ title, prompt, children, background = paper, color = ink }) {
  return (
    <Svg width={px(1280)} height={px(720)} font-size={px(32)} color={color}>
      <Slide width="fill" height="fill" background={background} padding={em(1.5)} gap={em(0.6)}
        title={<Text font-size={em(1.85)} font-weight="bold">{title}</Text>}>
        <VStack height="fill" width="fill" gap={em(0.55)} align="fill">
          <Box grow={1} width="fill" align="center">{children}</Box>
          <Text font-size={em(1.08)} font-weight="bold">{prompt}</Text>
        </VStack>
      </Slide>
    </Svg>
  )
}

function Sun({ paint = gold, ...props }) {
  return (
    <Group aspect={1} {...props}>
      {Array.from({length: 12}, (_, i) => {
        const a = i * Math.PI / 6
        return <Line width={1} height={1}
          from={[0.5 + 0.36 * Math.cos(a), 0.5 + 0.36 * Math.sin(a)]}
          to={[0.5 + 0.46 * Math.cos(a), 0.5 + 0.46 * Math.sin(a)]}
          stroke={paint} stroke-width={em(0.13)} stroke-linecap="round" />
      })}
      <Circle x={0.23} y={0.23} width={0.54} fill={paint} stroke="none" />
    </Group>
  )
}

function Ray({ paint = blueLight, ...props }) {
  return <Arrow width={1} height={1} stroke={paint} stroke-width={em(0.17)}
    head-size={em(0.43)} stroke-linecap="round" {...props} />
}

function Eyes({ ...props }) {
  return (
    <Group aspect={2} {...props}>
      {[0.04, 0.55].map(x => (
        <Group x={x} width={0.41} height={1}>
          <Ellipse width={1} height={1} fill="white" stroke={ink} stroke-width={em(0.06)} />
          <Circle x={0.24} y={0.28} width={0.46} fill={ink} stroke="none" />
        </Group>
      ))}
    </Group>
  )
}

function Scene({ mode, ...props }) {
  const bg = mode === 'day' ? '#A6D8F2' : mode === 'sunset' ? '#F5B59B' : night
  return (
    <Group aspect={1.25} clip {...props}>
      <Rect width={1} height={1} fill={bg} stroke="none" />
      {mode !== 'night' && <Sun x={0.55} y={mode === 'day' ? 0.07 : 0.51} width={0.37} paint={mode === 'day' ? gold : coral} />}
      {mode === 'night' && [[0.16, 0.2], [0.4, 0.35], [0.78, 0.15], [0.65, 0.48], [0.3, 0.58]].map(([x,y]) => (
        <Circle x={x} y={y} width={0.018} fill={paper} stroke="none" />
      ))}
      <Path width={1} height={1} fill={mode === 'night' ? '#274B50' : green} stroke="none"
        commands={[move_to(0,0.84), curve_to(0.35,0.62,0.60,0.94,1,0.76), line_to(1,1), line_to(0,1), close_path()]} />
    </Group>
  )
}

function Rainbow({ ...props }) {
  // Concentric semicircular bands: red outside, violet inside.
  return (
    <Group aspect={2} {...props}>
      {spectrum.map((paint, i) => {
        const outer = 0.47 - i * 0.034, inner = outer - 0.035
        const arc = (r, reverse) => Array.from({length:65}, (_, j) => {
          const a = Math.PI * (reverse ? j / 64 : 1 - j / 64)
          return [0.5 + r * Math.cos(a), 0.96 - 2 * r * Math.sin(a)]
        })
        return <Polygon width={1} height={1} points={[...arc(outer, false), ...arc(inner, true)]} fill={paint} stroke="none" />
      })}
    </Group>
  )
}
