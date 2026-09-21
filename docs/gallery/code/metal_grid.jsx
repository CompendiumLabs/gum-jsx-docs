// A 9-by-16 luminous tile grid with a layered spline across its surface.
const rows = 9
const cols = 16
const paint = palette(blue, purple, [0, cols - 1])
const points = [
  [0.12, 0.55],
  [0.25, 0.2],
  [0.42, 0.78],
  [0.6, 0.3],
  [0.78, 0.72],
  [0.88, 0.45],
]
return (
  <Box padding={em(1.5)}>
    <Frame padding={em(0.75)} background={darkgray} border-radius={em(1.25)} border-width={px(2)}>
      <Box padding={em(0.75)} background={black} border-radius={em(0.75)}>
        <Group aspect={cols/rows}>
          {range(rows * cols).map((i) => (
            <RoundedRect
              x={(i % cols) / cols}
              y={floor(i / cols) / rows}
              width={1 / cols - 0.007}
              height={1 / rows - 0.012}
              border-radius={em(0.3)}
              fill={paint(i % cols)}
              stroke={none}
              opacity={0.7}
            />
          ))}
          <Spline
            points={points}
            tension={1.2}
            stroke={white}
            stroke-width={px(15)}
            opacity={0.25}
            stroke-linecap="round"
          />
          <Spline
            points={points}
            tension={1.2}
            stroke={white}
            stroke-width={px(5)}
            stroke-linecap="round"
          />
        </Group>
      </Box>
    </Frame>
  </Box>
)
