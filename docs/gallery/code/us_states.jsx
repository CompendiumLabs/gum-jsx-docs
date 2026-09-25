// Albers USA supplies the familiar Alaska and Hawaii insets; shared arcs draw interior lines once.
const usStates = us_states()
const regions = {
  '06': { fill: red }, // California
  '48': { fill: yellow }, // Texas
  '36': { fill: green }, // New York
  '12': { fill: blue }, // Florida
  '53': { fill: purple }, // Washington
}

return (
  <TextFigure
    width={em(44)} font-size={px(20)} color={slate} fit
    padding={em(1.5)} background={white} gap={em(1)}
    caption="The preset places Alaska and Hawaii as insets; other territories are clipped."
    caption-font-size={em(0.75)} caption-color={interp(slate, white, 0.35)}
  >
    <TextCol gap={em(0.3)}>
      <Text font-size={em(1.5)} font-weight={bold}>
        US states
      </Text>
      <Text font-size={em(0.75)} color={interp(slate, white, 0.35)}>
        Albers USA · state FIPS IDs · interior TopoJSON borders
      </Text>
    </TextCol>
    <GeoMap
      aspect={1.85}
      source={usStates}
      projection="albersUsa"
      fit-to="data"
      map-padding={em(0.8)}
      fill={interp(white, green, 0.3)}
      styles={regions}
      border-mode="interior"
      border-color={white}
      border-width={em(0.055)}
      aria-label="US states with California, Texas, New York, Florida, and Washington highlighted"
    />
  </TextFigure>
)
