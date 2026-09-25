// Albers USA supplies the familiar Alaska and Hawaii insets; shared arcs draw interior lines once.
const usStates = us_states()
const regions = {
  '06': red, // California
  '48': yellow, // Texas
  '36': green, // New York
  '12': blue, // Florida
  '53': purple, // Washington
}

return (
  <Svg width={px(1000)} height={px(680)}>
    <Group width={px(1000)} height={px(680)}>
      <Rect width={px(1000)} height={px(680)} fill={white} stroke={none} />
      <Text x={px(40)} y={px(26)} font-size={px(30)} font-weight="bold" color={slate}>
        US states
      </Text>
      <Text x={px(40)} y={px(67)} font-size={px(15)} color={interp(slate, white, 0.35)}>
        Albers USA · state FIPS IDs · interior TopoJSON borders
      </Text>
      <GeoMap
        x={px(35)}
        y={px(102)}
        width={px(930)}
        height={px(500)}
        source={usStates}
        projection="albersUsa"
        fit-to="data"
        map-padding={px(16)}
        fill={interp(white, green, 0.3)}
        fill-by-id={regions}
        border-mode="interior"
        border-color={white}
        border-width={px(1.1)}
        aria-label="US states with California, Texas, New York, Florida, and Washington highlighted"
      />
      <Text x={px(40)} y={px(622)} font-size={px(14)} color={interp(slate, white, 0.35)}>
        The preset places Alaska and Hawaii as insets; other territories are clipped.
      </Text>
    </Group>
  </Svg>
)
