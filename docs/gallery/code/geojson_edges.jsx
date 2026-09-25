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

return (
  <Svg width={px(1100)} height={px(620)}>
    <Group width={px(1100)} height={px(620)}>
      <Rect width={px(1100)} height={px(620)} fill={white} stroke={none} />
      <Text x={px(35)} y={px(24)} font-size={px(30)} font-weight="bold" color={slate}>
        GeoJSON edge cases
      </Text>
      <Text x={px(35)} y={px(66)} font-size={px(15)} color={interp(slate, white, 0.35)}>
        Local RFC 7946 fixtures · winding normalization · data fitting
      </Text>
      <Group x={px(35)} y={px(117)} width={px(495)} height={px(430)}>
        <Rect width={px(495)} height={px(430)} fill={interp(white, green, 0.06)} stroke={gray} />
        <Text x={px(19)} y={px(16)} font-size={px(20)} font-weight="bold" color={interp(slate, green, 0.3)}>
          Polygon with a hole
        </Text>
        <GeoMap
          x={px(16)}
          y={px(62)}
          width={px(463)}
          height={px(330)}
          source={donut}
          projection="equirectangular"
          fit-to="data"
          map-padding={px(16)}
          fill={interp(blue, green, 0.7)}
          border-color={interp(slate, green, 0.3)}
          border-width={px(1.5)}
          aria-label="GeoJSON island polygon with an empty lake"
        />
      </Group>
      <Group x={px(570)} y={px(117)} width={px(495)} height={px(430)}>
        <Rect width={px(495)} height={px(430)} fill={interp(white, green, 0.06)} stroke={gray} />
        <Text x={px(19)} y={px(16)} font-size={px(20)} font-weight="bold" color={interp(slate, green, 0.3)}>
          Antimeridian split
        </Text>
        <GeoMap
          x={px(16)}
          y={px(62)}
          width={px(463)}
          height={px(330)}
          source={dateline}
          projection="equirectangular"
          rotate={[180, 0, 0]}
          fit-to="data"
          map-padding={px(16)}
          fill={interp(red, yellow, 0.4)}
          border-color={interp(slate, red, 0.45)}
          border-width={px(1.5)}
          aria-label="Two GeoJSON polygons meeting at the antimeridian"
        />
      </Group>
      <Text x={px(35)} y={px(565)} font-size={px(14)} color={interp(slate, white, 0.35)}>
        The left ring uses RFC outer/inner winding; the right source cuts the shape at ±180°.
      </Text>
    </Group>
  </Svg>
)
