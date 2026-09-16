// Four wavefunctions in an infinite square well, vertically offset for comparison.
const levels = [1, 2, 3, 4]
const amplitude = 0.75
const spacing = 2.5
const ymin = -0.5
const ymax = levels.length * spacing + 0.5
const baseline = index => (index + 0.5) * spacing
const ticks = [
  [0, <Tex>0</Tex>],
  [0.5, <Tex>L/2</Tex>],
  [1, <Tex>L</Tex>],
]

return (
  <Svg width={px(800)} height={px(650)} font-size={px(19)} color={black}>
    <Box padding={px(28)} background={white}>
      <VStack width="fill" gap={px(18)} align="center">
        <Text font-size={px(29)} font-weight={bold}>Particle in a Box</Text>
        <Plot
          width="fill" height={px(480)}
          xlim={[-0.45, 1.45]} ylim={[ymin, ymax]}
          xticks={ticks} yaxis={false} grid={false}
          font-size={px(18)} margin={px(12)}
          xaxis-stroke={black} xaxis-stroke-width={px(1.5)}
          xaxis-tick-side="outer" xaxis-label-color={black}
        >
          {linspace(ymin, ymax - 0.5, 24).map(y => (
            <CoordLine
              points={[[-0.065, y], [0, y + 0.5]]}
              stroke={black} stroke-width={px(0.7)}
            />
          ))}
          {linspace(ymin, ymax - 0.5, 24).map(y => (
            <CoordLine
              points={[[1, y], [1.065, y + 0.5]]}
              stroke={black} stroke-width={px(0.7)}
            />
          ))}
          <CoordLine points={[[0, ymin], [0, ymax]]} stroke={black} stroke-width={px(2.5)} />
          <CoordLine points={[[1, ymin], [1, ymax]]} stroke={black} stroke-width={px(2.5)} />
          {levels.map((n, index) => (
            <>
              <CoordLine
                points={[[0, baseline(index)], [1, baseline(index)]]}
                stroke={black} opacity={0.25} stroke-width={px(1)}
              />
              <SymLine
                fy={x => baseline(index) + amplitude * sin(n * pi * x)}
                xlim={[0, 1]} samples={241}
                stroke={black} stroke-width={px(2.5)}
              />
              <Tex x={-0.25} y={baseline(index)} anchor="center" font-size={px(23)} color={black}>
                {`n=${n}`}
              </Tex>
              <Tex x={1.23} y={baseline(index)} anchor="center" font-size={px(23)} color={black}>
                {`E_{${n}}`}
              </Tex>
            </>
          ))}
        </Plot>
        <Latex font-size={px(27)}>
          {String.raw`\psi_n(x)=\sqrt{\frac{2}{L}}\sin\!\left(\frac{n\pi x}{L}\right)`}
        </Latex>
      </VStack>
    </Box>
  </Svg>
)
