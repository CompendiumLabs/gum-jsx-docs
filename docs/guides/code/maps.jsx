// One source and style dictionary, with markers projected separately for two views.
const world = world_countries()
const prepared = prepare_geo_source(world)
const mapWidth = 400
const mapHeight = 280
const styles = {
  '840': { fill: green }, // United States
  '392': { fill: purple }, // Japan
}
const cities = [
  { name: 'San Francisco', coordinates: [-122.42, 37.77], color: green },
  { name: 'Tokyo', coordinates: [139.69, 35.68], color: purple },
]
const views = [
  {
    title: 'World overview',
    note: 'Natural Earth I fits the whole world.',
    projection: 'naturalEarth1',
  },
  {
    title: 'Across the Pacific',
    note: 'Rotation turns the globe toward 170° east, 25° north.',
    projection: 'orthographic',
    rotate: [-170, -25, 0],
  },
]

return (
  <TextBox
    width={em(46)} font-size={px(20)} color={slate} fit
    padding={em(1.2)} background={white}
  >
    <TextCol gap={em(1)}>
      <Text font-size={em(1.5)} font-weight={bold}>One map, two views</Text>
      <Text font-size={em(0.8)}>
        Country styles follow IDs. City markers follow each panel's projection.
      </Text>
      <Grid columns={2} gap={em(1.2)}>
        {views.map(({ title, note, ...options }) => {
          const view = { ...options, fit_to: 'sphere', map_padding: 12 }
          const markers = cities
            .map(city => ({
              ...city,
              point: project_geo_point(prepared, view, mapWidth, mapHeight, city.coordinates),
            }))
            .filter(city => city.point !== null)

          return (
            <TextCol gap={em(0.6)}>
              <Text font-weight={bold}>{title}</Text>
              <Group width={px(mapWidth)} height={px(mapHeight)} fit>
                <GeoMap
                  width={1} height={1} source={world}
                  projection={view.projection} rotate={view.rotate}
                  fit-to={view.fit_to} map-padding={px(view.map_padding)}
                  background={interp(white, blue, 0.15)}
                  fill={lightgray} styles={styles}
                  border-color={white} border-width={em(0.035)}
                  aria-label={title + ' with San Francisco and Tokyo marked'}
                />
                {markers.map(city => (
                  <Circle
                    x={px(city.point[0])} y={px(city.point[1])}
                    anchor="center" width={em(0.55)}
                    fill={city.color} stroke={white} stroke-width={em(0.1)}
                  />
                ))}
              </Group>
              <Text font-size={em(0.75)}>{note}</Text>
            </TextCol>
          )
        })}
      </Grid>
      <HStack gap={em(1.5)}>
        {cities.map(city => (
          <HStack gap={em(0.4)} align="center">
            <Circle width={em(0.45)} fill={city.color} stroke={none} />
            <Text font-size={em(0.75)}>{city.name}</Text>
          </HStack>
        ))}
      </HStack>
    </TextCol>
  </TextBox>
)
