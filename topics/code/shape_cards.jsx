// Data-driven cards use equal outer flex allocation and fixed-size centered symbols.
const Card = ({ title, note, color, symbol }) => (
  <Frame
    basis={0}
    grow={1}
    padding={px(16)}
    radius={px(12)}
    border_color={gray}
    background={white}
  >
    <VStack width={1} gap={px(14)}>
      <Group height={px(124)}>{symbol}</Group>
      <Text font_size={px(22)} font_weight={bold} color={color}>{title}</Text>
      <Text line_height={em(1.4)}>{note}</Text>
    </VStack>
  </Frame>
);
const cards = [
  {
    title: "Circle",
    color: blue,
    note: "A circular outline inside its allocated rectangle.",
    symbol: (
      <Circle
        x={0.5}
        y={0.5}
        anchor="center"
        width={px(88)}
        fill={blue}
        stroke={none}
      />
    ),
  },
  {
    title: "Square",
    color: red,
    note: "A square silhouette with gently rounded corners.",
    symbol: (
      <Square
        x={0.5}
        y={0.5}
        anchor="center"
        width={px(88)}
        radius={px(12)}
        fill={red}
        stroke={none}
      />
    ),
  },
  {
    title: "Polygon",
    color: green,
    note: "Explicit points joined into a closed, filled path.",
    symbol: (
      <Polygon
        x={0.5}
        y={0.5}
        anchor="center"
        width={px(88)}
        height={px(88)}
        points={[
          [0.5, 0],
          [1, 0.35],
          [0.8, 1],
          [0.2, 1],
          [0, 0.35],
        ]}
        fill={green}
        stroke={none}
      />
    ),
  },
];
return (
  <Svg width={px(760)}>
    <Box width={1} padding={px(28)} background={lightgray} color={slate}>
      <VStack width={1} gap={px(20)}>
        <Text font_family={mono} font_size={px(14)} color={blue}>COMPOSITION / 02</Text>
        <Text font_size={px(30)} font_weight={bold}>One component, three shapes</Text>
        <HStack width={1} gap={px(16)} align="stretch">
          {cards.map((card) => (
            <Card {...card} />
          ))}
        </HStack>
      </VStack>
    </Box>
  </Svg>
);
