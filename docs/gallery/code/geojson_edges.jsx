// RFC 7946 polygon winding keeps the lake empty; split antimeridian parts stay local.
const donut = geojson({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'ring',
      properties: { name: 'Island with a lake' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[-30, -20], [30, -20], [30, 20], [-30, 20], [-30, -20]],
          [[-11, -8], [-11, 8], [11, 8], [11, -8], [-11, -8]],
        ],
      },
    },
  ],
})
const dateline = geojson({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'east',
      properties: { name: 'East of the antimeridian' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[170, -18], [180, -18], [180, 18], [170, 18], [170, -18]],
        ],
      },
    },
    {
      type: 'Feature',
      id: 'west',
      properties: { name: 'West of the antimeridian' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[-180, -18], [-170, -18], [-170, 18], [-180, 18], [-180, -18]],
        ],
      },
    },
  ],
})
const panels = [
  {
    title: 'Polygon with a hole',
    source: donut,
    fill: interp(blue, green, 0.7),
    border_color: interp(slate, green, 0.3),
  },
  {
    title: 'Antimeridian split',
    source: dateline,
    rotate: [180, 0, 0],
    fill: interp(red, yellow, 0.4),
    border_color: interp(slate, red, 0.45),
  },
]

return (
  <TextFigure
    width={em(48)} font-size={px(20)} color={slate} fit
    padding={em(1.5)} background={white} gap={em(1)}
    caption="The left ring uses RFC outer/inner winding; the right source cuts the shape at ±180°."
    caption-font-size={em(0.75)} caption-color={interp(slate, white, 0.35)}
  >
    <TextCol gap={em(0.3)}>
      <Text font-size={em(1.5)} font-weight={bold}>
        GeoJSON edge cases
      </Text>
      <Text font-size={em(0.75)} color={interp(slate, white, 0.35)}>
        Local RFC 7946 fixtures · winding normalization · data fitting
      </Text>
    </TextCol>
    <Grid columns={2} gap={em(1)} align="fill">
      {panels.map(({ title, ...mapProps }) => (
        <Frame padding={em(0.9)} background={interp(white, green, 0.06)} border-color={gray}>
          <TextCol gap={em(0.6)}>
            <Text font-weight={bold} color={interp(slate, green, 0.3)}>{title}</Text>
            <GeoMap
              aspect={1.4}
              projection="equirectangular"
              fit-to="data"
              padding={em(0.8)}
              border-width={em(0.075)}
              {...mapProps}
            />
          </TextCol>
        </Frame>
      ))}
    </Grid>
  </TextFigure>
)
