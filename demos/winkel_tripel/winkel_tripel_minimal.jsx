// Minimal custom projection demo. Run with the Gum CLI:
// gum winkel_tripel_minimal.jsx -o winkel_tripel_minimal.svg

// Input tuples expand to {x: longitude, y: latitude}, in degrees.
// Output: {x, y} on a unit sphere, with y increasing northward.
function winkelTripel({x: longitude, y: latitude}) {
  const lambda = longitude * Math.PI / 180
  const phi = latitude * Math.PI / 180
  const alpha = Math.acos(Math.max(-1, Math.min(1,
    Math.cos(phi) * Math.cos(lambda / 2))))
  const k = alpha < 1e-8 ? 1 : alpha / Math.sin(alpha)
  const aitoffX = 2 * k * Math.cos(phi) * Math.sin(lambda / 2)
  const aitoffY = k * Math.sin(phi)
  const plateX = lambda * (2 / Math.PI) // cos(standard parallel)
  return {x: (aitoffX + plateX) / 2, y: (aitoffY + phi) / 2}
}

const halfWidth = (Math.PI + 2) / 2
const halfHeight = Math.PI / 2
const meridians = linspace(-180, 180, 13).map(lon =>
  linspace(-90, 90, 121).map(lat => [lon, lat]))
const parallels = linspace(-90, 90, 7).map(lat =>
  linspace(-180, 180, 181).map(lon => [lon, lat]))

return (
  <TextBox width={px(900)} font-size={px(22)} padding={em(1.5)}
    background="#071E28" color="#F0F4E9">
    <TextCol gap={em(1)}>
      <Text font-size={em(1.7)}>Winkel Tripel · custom projection</Text>
      <Graph
        projection={winkelTripel}
        xlim={[-halfWidth * 1.04, halfWidth * 1.04]}
        ylim={[-halfHeight * 1.04, halfHeight * 1.04]}
        aspect={halfWidth / halfHeight}
      >
        {[...meridians, ...parallels].map(points => (
          <CoordLine points={points} fill={none}
            stroke="#68959D" stroke-width={em(0.045)} />
        ))}
        <Points points={[[0, 0]]} point-size={em(0.4)} fill="#F4B66B" />
        <TextBox pos={[0, 0]} anchor={['start', 'end']} padding={em(0.5)}
          font-size={em(0.75)} color="#F4B66B">
          0°, 0°
        </TextBox>
      </Graph>
      <Text font-size={em(0.8)}>
        Sample in longitude / latitude. Let Graph project every point.
      </Text>
    </TextCol>
  </TextBox>
)
