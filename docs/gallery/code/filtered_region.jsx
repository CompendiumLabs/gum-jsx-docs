// Keep the same coordinate box while changing which countries are drawn.
const ids = ['276', '616', '203', '040', '756'] // Germany, Poland, Czechia, Austria, Switzerland
const bounds = [4, 44, 25, 56]
const panels = [
  { title: 'All countries', source: world_countries() },
  { title: 'Five selected IDs', source: world_countries({ ids }) },
]
const route = [[13.405, 52.52], [14.421, 50.088], [16.374, 48.208]]

return (
  <TextBox width={em(46)} font-size={px(20)} color={slate} padding={em(1.3)} background={white} fit>
    <TextCol gap={em(0.9)}>
      <Text font-size={em(1.5)} font-weight={bold}>Choose geography, then frame it</Text>
      <Text font-size={em(0.8)}>Both panels fit the same longitude/latitude bounds.</Text>
      <Grid columns={2} gap={em(1)}>
        {panels.map(panel => (
          <TextCol gap={em(0.6)}>
            <Text font-weight={bold}>{panel.title}</Text>
            <GeoMap
              source={panel.source} fit-to={{ bounds }}
              width={px(380)} height={px(280)} fit map-padding={px(12)}
              background={interp(white, blue, 0.12)} fill={interp(white, green, 0.3)}
              border-color={white} border-width={px(0.8)}
            >
              <Polyline space="data" points={route} fill={none} stroke={red} stroke-width={px(2.5)} />
              <Points points={route} point-size={px(7)} fill={red} stroke={white} stroke-width={px(1)} />
            </GeoMap>
          </TextCol>
        ))}
      </Grid>
      <Text font-size={em(0.75)}>
        The Berlin–Prague–Vienna route stays in place. Source IDs change the geography; bounds keep the view fixed.
      </Text>
    </TextCol>
  </TextBox>
)
