// Use the same view for GeoMap and project_geo_point, so overlays match the map exactly.
const world = world_countries()
const view = {
  projection: 'orthographic',
  rotate: [95, -20, 0],
  fit_to: 'sphere',
  map_padding: 14,
}
const places = [
  ['San Francisco', -122.42, 37.77],
  ['New York', -74.01, 40.71],
  ['São Paulo', -46.63, -23.55],
  ['Tokyo (back side)', 139.69, 35.68],
]
const visible = places
  .map(([name, lon, lat]) => ({ name, xy: project_geo_point(world, view, 570, 500, [lon, lat]) }))
  .filter(place => place.xy !== null)

return (
  <Svg width={px(1000)} height={px(640)}>
    <Group width={px(1000)} height={px(640)}>
      <Rect width={px(1000)} height={px(640)} fill={interp(white, blue, 0.06)} stroke={none} />
      <Text x={px(38)} y={px(25)} font-size={px(30)} font-weight="bold" color={slate}>
        Projected city markers
      </Text>
      <Text x={px(38)} y={px(66)} font-size={px(15)} color={interp(slate, white, 0.35)}>
        Orthographic globe · shared view settings · back-side clipping
      </Text>
      <Group x={px(34)} y={px(104)} width={px(570)} height={px(500)}>
        <Circle
          x={px(285)}
          y={px(250)}
          anchor="center"
          width={px(472)}
          height={px(472)}
          fill={interp(white, blue, 0.15)}
          stroke={interp(white, blue, 0.3)}
          stroke-width={px(1)}
        />
        <GeoMap
          width={px(570)}
          height={px(500)}
          source={world}
          projection={view.projection}
          rotate={view.rotate}
          fit-to={view.fit_to}
          map-padding={px(view.map_padding)}
          fill={interp(blue, green, 0.6)}
          border-color={interp(white, blue, 0.06)}
          border-width={px(0.7)}
          aria-label="Orthographic world map centered on the Americas"
        />
        {visible.map(place => (
          <Circle
            x={px(place.xy[0])}
            y={px(place.xy[1])}
            anchor="center"
            width={px(12)}
            height={px(12)}
            fill={red}
            stroke={white}
            stroke-width={px(2)}
          />
        ))}
      </Group>
      <Text x={px(634)} y={px(151)} font-size={px(19)} font-weight="bold" color={slate}>
        Visible locations
      </Text>
      {visible.map((place, index) => (
        <Text x={px(634)} y={px(192 + index * 38)} font-size={px(17)} color={slate}>
          {'-  ' + place.name}
        </Text>
      ))}
      <Text x={px(634)} y={px(358)} width={px(330)} font-size={px(15)} color={interp(slate, white, 0.35)}>
        Tokyo is on the far side. The helper returns null, so no marker is drawn.
      </Text>
    </Group>
  </Svg>
)
