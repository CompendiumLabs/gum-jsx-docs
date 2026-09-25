// TopoJSON countries, stable numeric IDs, an equal-area projection, and one-pass borders.
const world = world_countries()
const highlights = {
  '840': blue, // United States
  '124': interp(blue, green, 0.5), // Canada
  '076': green, // Brazil
  '356': interp(red, yellow, 0.65), // India
  '036': red, // Australia
}

return (
  <Svg width={px(1000)} height={px(600)}>
    <Group width={px(1000)} height={px(600)}>
      <Rect width={px(1000)} height={px(600)} fill={white} stroke={none} />
      <Text x={px(40)} y={px(28)} font-size={px(30)} font-weight="bold" color={slate}>
        World countries
      </Text>
      <Text x={px(40)} y={px(69)} font-size={px(15)} color={interp(slate, white, 0.35)}>
        Equal Earth · 110m topology · country ID fills
      </Text>
      <GeoMap
        x={px(30)}
        y={px(109)}
        width={px(940)}
        height={px(430)}
        source={world}
        projection="equalEarth"
        fit-to="sphere"
        map-padding={px(8)}
        fill={interp(white, green, 0.25)}
        fill-by-id={highlights}
        border-color={white}
        border-width={px(0.6)}
        aria-label="World countries with five countries highlighted"
      />
      <Text x={px(40)} y={px(552)} font-size={px(14)} color={interp(slate, white, 0.35)}>
        Country colors are keyed by the atlas IDs, independent of feature order.
      </Text>
    </Group>
  </Svg>
)
