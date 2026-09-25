// A shared height lets each projection and fit target determine its framed width.
const source = world_countries()
const views = [
  { label: 'Globe', projection: 'orthographic', fit_to: 'sphere' },
  { label: 'Region', bounds: [4, 44, 25, 56] },
  { label: 'Sliver', bounds: [9, 40, 11, 60] },
]

return (
  <TextBox padding={px(24)} background={white} color={slate} font-size={px(18)} fit>
    <TextCol gap={px(18)}>
      <Text font-size={px(28)} font-weight={bold}>Let the map set its shape</Text>
      <Text>Each map sets only its height. Frames hug the resulting widths.</Text>
      <HStack gap={px(24)} align="start">
        {views.map(view => (
          <TextCol gap={px(10)}>
            <Text font-weight={bold}>{view.label}</Text>
            <Frame padding={px(6)} border-color={gray} border-width={px(1)}>
              <GeoMap
                source={source} projection={view.projection} fit-to={view.fit_to}
                bounds={view.bounds}
                height={px(240)} padding={px(8)}
                fill={interp(white, green, 0.4)} background={interp(white, blue, 0.15)}
                border-color={white} border-width={px(0.7)}
              />
            </Frame>
          </TextCol>
        ))}
      </HStack>
    </TextCol>
  </TextBox>
)
