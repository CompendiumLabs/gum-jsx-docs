// Map a sequence of values into a polyline's own rectangle, with y increasing down.
const values = [0.25, 0.4, 0.3, 0.7, 0.55, 0.9, 0.8]
const points = values.map((value, index) => [
  0.05 + (0.9 * index) / (values.length - 1),
  0.95 - 0.9 * value,
])
return (
  <Frame padding={em(1.25)} border-color={gray} background={lightgray}>
    <Polyline
      width="fill"
      aspect={16 / 7}
      points={points}
      fill={none}
      stroke={blue}
      stroke-width={px(4)}
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </Frame>
)
