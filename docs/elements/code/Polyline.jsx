// Polyline and Points share the plot's ambient data coordinates.
const values = [0.25, 0.4, 0.3, 0.7, 0.55, 0.9, 0.8]
const points = values.map((value, index) => [index, value])
return (
  <Plot width="fill" aspect={16 / 7} grid>
    <Polyline
      points={points}
      fill={none}
      stroke={blue}
      stroke-width={px(4)}
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <Points points={points} point-size={px(8)} fill={blue} stroke={none} />
  </Plot>
)
