// Five cards share three columns, with content-sized rows and an incomplete final row.
const cards = [
  ["Flow", "Follow a path through the diagram.", blue],
  ["Orbit", "Arrange the parts around a common center.", purple],
  ["Signal", "Compare the changes over time.", green],
  ["Field", "Show how direction varies across a region.", red],
  ["Form", "Build a figure from simple shapes.", slate],
]
return (
  <Grid
    columns={3}
    width={em(28)}
    font-size={px(18)}
    gap={em(0.8)}
    align="fill"
    fit
  >
    {cards.map(([title, description, color]) => (
      <Frame
        padding={em(0.7)}
        border-color={color}
        border-radius={em(0.35)}
      >
        <TextCol gap={em(0.5)}>
          <Rect aspect={4} fill={color} stroke={none} />
          <Text font-weight={bold} color={color}>{title}</Text>
          <Text font-size={em(0.85)}>{description}</Text>
        </TextCol>
      </Frame>
    ))}
  </Grid>
)
