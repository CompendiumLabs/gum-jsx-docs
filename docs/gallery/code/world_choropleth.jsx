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
  <TextFigure
    width={em(44)} font-size={px(20)} color={slate} fit
    padding={em(1.5)} background={white} gap={em(1)}
    caption="Country colors are keyed by the atlas IDs, independent of feature order."
    caption-font-size={em(0.75)} caption-color={interp(slate, white, 0.35)}
  >
    <TextCol gap={em(0.3)}>
      <Text font-size={em(1.5)} font-weight={bold}>
        World countries
      </Text>
      <Text font-size={em(0.75)} color={interp(slate, white, 0.35)}>
        Equal Earth · 110m topology · country ID fills
      </Text>
    </TextCol>
    <GeoMap
      aspect={2.2}
      source={world}
      projection="equalEarth"
      fit-to="sphere"
      padding={em(0.4)}
      fill={interp(white, green, 0.25)}
      styles={id => ({ fill: highlights[id] })}
      border-color={white}
      border-width={em(0.03)}
    />
  </TextFigure>
)
