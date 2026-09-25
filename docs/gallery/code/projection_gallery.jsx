// A shared grid and map aspect make projection differences easy to compare.
const world = world_countries()
const cards = [
  { name: 'Equal Earth', projection: 'equalEarth' },
  { name: 'Natural Earth', projection: 'naturalEarth1' },
  { name: 'Equirectangular', projection: 'equirectangular' },
  { name: 'Mercator', projection: 'mercator' },
]

return (
  <TextBox
    width={em(50)} font-size={px(20)} color={slate} fit
    padding={em(1.5)} background={lightgray}
  >
    <TextCol gap={em(1)}>
      <TextCol gap={em(0.3)}>
        <Text font-size={em(1.5)} font-weight={bold}>
          Projection gallery
        </Text>
        <Text font-size={em(0.75)} color={interp(slate, white, 0.35)}>
          One source · one viewport · {cards.length} projection presets
        </Text>
      </TextCol>
      <Grid columns={2} gap={em(1)} align="fill">
        {cards.map(card => (
          <Frame padding={em(0.75)} background={white} border-color={gray}>
            <TextCol gap={em(0.6)}>
              <Text font-weight={bold}>{card.name}</Text>
              <GeoMap
                aspect={2.1}
                source={world}
                projection={card.projection}
                fit-to="sphere"
                map-padding={em(0.2)}
                fill={interp(blue, green, 0.5)}
                border-color={white}
                border-width={em(0.02)}
                aria-label={card.name + ' world map'}
              />
            </TextCol>
          </Frame>
        ))}
      </Grid>
    </TextCol>
  </TextBox>
)
