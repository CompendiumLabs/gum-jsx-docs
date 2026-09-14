// Map a sequence of values into a polyline's own rectangle, with y increasing down.
const values = [0.25, 0.4, 0.3, 0.7, 0.55, 0.9, 0.8]
const points = values.map((value, index) => [
  0.05 + (0.9 * index) / (values.length - 1),
  0.95 - 0.9 * value,
])
return (
  <Svg>
    <Frame padding={px(20)} border_color={gray} background={lightgray}>
      <Polyline
        width={px(320)}
        height={px(140)}
        points={points}
        fill={none}
        stroke={blue}
        stroke_width={px(4)}
        stroke_linejoin="round"
        stroke_linecap="round"
      />
    </Frame>
  </Svg>
)
