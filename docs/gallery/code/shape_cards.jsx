// Data-driven cards use equal outer flex allocation and fixed-size centered symbols.
const Card = ({ title, note, color, symbol }) => (
  <TextFrame
    grow={1}
    padding={em(1)}
    radius={em(0.75)}
    border-color={gray}
    background={white}
  >
    <TextCol gap={em(0.5)}>
      <Box height={em(10)} padding={em(1)} align-self="center">{symbol}</Box>
      <Text font-size={em(1.5)} font-weight={bold} color={color}>{title}</Text>
      <Text line-height={em(1.4)}>{note}</Text>
    </TextCol>
  </TextFrame>
)
const penta = [ [0.5, 0], [1, 0.35], [0.8, 1], [0.2, 1], [0, 0.35]]
const cards = [
  {
    title: "Circle",
    color: blue,
    note: "A circular outline inside its allocated rectangle.",
    symbol: <Circle fill={blue} stroke={none} />,
  },
  {
    title: "Square",
    color: red,
    note: "A square silhouette with gently rounded corners.",
    symbol: <Square radius={em(0.75)} fill={red} stroke={none} />,
  },
  {
    title: "Polygon",
    color: green,
    note: "Explicit points joined into a closed, filled path.",
    symbol: <Polygon aspect={1} points={penta} fill={green} stroke={none} />,
  },
]
return <TextBox width={px(760)} padding={em(2)} background={lightgray} color={slate}>
  <TextCol gap={em(1)}>
    <Text font-family={mono} font-size={em(1)} color={blue}>COMPOSITION / 02</Text>
    <Text font-size={em(2)} font-weight={bold}>One component, three shapes</Text>
    <HStack gap={em(1)} align="stretch">
      {cards.map((card) => (
        <Card {...card} />
      ))}
    </HStack>
  </TextCol>
</TextBox>
