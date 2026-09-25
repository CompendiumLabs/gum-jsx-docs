// Use the same view for GeoMap and project_geo_point, so overlays match the map exactly.
const world = world_countries()
// Only the geographic canvas needs a fixed size; the surrounding text is measured.
const mapSize = 500
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
  .map(([name, lon, lat]) => ({ name, xy: project_geo_point(world, view, mapSize, mapSize, [lon, lat]) }))
  .filter(place => place.xy !== null)

return (
  <TextBox
    width={em(44)} font-size={px(20)} color={slate} fit
    padding={em(1.5)} background={interp(white, blue, 0.06)}
  >
    <TextCol gap={em(1)}>
      <TextCol gap={em(0.3)}>
        <Text font-size={em(1.5)} font-weight={bold}>
          Projected city markers
        </Text>
        <Text font-size={em(0.75)} color={interp(slate, white, 0.35)}>
          Orthographic globe · shared view settings · back-side clipping
        </Text>
      </TextCol>
      <HStack gap={em(1.5)} align="center">
        <Group width={px(mapSize)} height={px(mapSize)} grow={1.6} basis={0} fit>
          <GeoMap
            width={1} height={1}
            source={world}
            projection={view.projection}
            rotate={view.rotate}
            fit-to={view.fit_to}
            map-padding={px(view.map_padding)}
            background={interp(white, blue, 0.15)}
            fill={interp(blue, green, 0.6)}
            border-color={interp(white, blue, 0.06)}
            border-width={em(0.035)}
            aria-label="Orthographic world map centered on the Americas"
          />
          {visible.map(place => (
            <Circle
              x={px(place.xy[0])} y={px(place.xy[1])}
              anchor="center"
              width={em(0.6)}
              fill={red} stroke={white} stroke-width={em(0.1)}
            />
          ))}
        </Group>
        <TextCol grow={1} gap={em(1)}>
          <Text font-weight={bold}>Visible locations</Text>
          <Bullets font-size={em(0.85)} gap={em(0.6)}>
            {visible.map(place => <Text>{place.name}</Text>)}
          </Bullets>
          <Text font-size={em(0.75)} color={interp(slate, white, 0.35)}>
            Tokyo is on the far side. The helper returns null, so no marker is drawn.
          </Text>
        </TextCol>
      </HStack>
    </TextCol>
  </TextBox>
)
