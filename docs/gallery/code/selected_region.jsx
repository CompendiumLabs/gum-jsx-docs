// Fit to stable IDs, then use the exact same projection to place a custom route.
const world = world_countries()
const prepared = prepare_geo_source(world)
// Keep the projection and overlays in one local canvas, then fit it as a unit.
const mapWidth = 850
const mapHeight = 480
const view = {
  projection: 'equalEarth',
  fit_to: ['276', '616', '203', '040', '756'], // DE, PL, CZ, AT, CH
  padding: 25,
}
const projection = create_geo_projection(prepared, view, mapWidth, mapHeight)
const route = [
  ['Berlin', 13.405, 52.52],
  ['Prague', 14.421, 50.088],
  ['Vienna', 16.374, 48.208],
].map(([name, lon, lat]) => ({ name, xy: projection([lon, lat]) }))

return (
  <TextFigure
    width={em(44)} font-size={px(20)} color={slate} fit
    padding={em(1.5)} background={white} gap={em(1)}
    caption="A selected fit is stable even if unrelated countries are later added to the source."
    caption-font-size={em(0.75)} caption-color={interp(slate, white, 0.35)}
  >
    <TextCol gap={em(0.3)}>
      <Text font-size={em(1.5)} font-weight={bold}>
        Selected-region fit
      </Text>
      <Text font-size={em(0.75)} color={interp(slate, white, 0.35)}>
        Fit five country IDs · reuse the projection for a Berlin–Prague–Vienna route
      </Text>
    </TextCol>
    <Group width={px(mapWidth)} height={px(mapHeight)} fit>
      <GeoMap
        width={1} height={1}
        source={world}
        projection={view.projection}
        fit-to={view.fit_to}
        padding={px(view.padding)}
        fill={interp(white, green, 0.3)}
        border-color={white}
        border-width={em(0.06)}
      />
      <Polyline
        width={1} height={1}
        points={route.map(place => [px(place.xy[0]), px(place.xy[1])])}
        fill={none} stroke={red} stroke-width={em(0.15)}
      />
      {route.map(place => (
        <Circle
          x={px(place.xy[0])} y={px(place.xy[1])}
          anchor="center"
          width={em(0.6)}
          fill={red} stroke={white} stroke-width={em(0.1)}
        />
      ))}
    </Group>
  </TextFigure>
)
