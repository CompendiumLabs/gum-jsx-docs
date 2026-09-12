// Data-driven cards use equal outer flex allocation and fixed-size centered symbols.
const Card = ({ title, note, color, symbol }) => (
  <Frame basis={0} grow={1} padding={px(16)} radius={px(12)}
    border_color="#ccd7df" background="white">
    <VStack width={1} gap={px(14)}>
      <Group width={1} height={px(124)}>{symbol}</Group>
      <Text font_size={px(22)} font_weight={700} color={color}>{title}</Text>
      <Text line_height={em(1.4)}>{note}</Text>
    </VStack>
  </Frame>
);
const cards = [
  {
    title: 'Circle', color: '#2c7567', note: 'A circular outline inside its allocated rectangle.',
    symbol: <Circle x={0.5} y={0.5} anchor="center" width={px(88)} fill="#2c7567" stroke="none" />,
  },
  {
    title: 'Square', color: '#486d9c', note: 'A square silhouette with gently rounded corners.',
    symbol: <Square x={0.5} y={0.5} anchor="center" width={px(88)} radius={px(12)} fill="#486d9c" stroke="none" />,
  },
  {
    title: 'Polygon', color: '#bb6748', note: 'Explicit points joined into a closed, filled path.',
    symbol: <Polygon x={0.5} y={0.5} anchor="center" width={px(88)} height={px(88)}
      points={[{ x: 0.5, y: 0 }, { x: 1, y: 0.35 }, { x: 0.8, y: 1 }, { x: 0.2, y: 1 }, { x: 0, y: 0.35 }]}
      fill="#bb6748" stroke="none" />,
  },
];
return (
  <Svg width={px(760)}>
    <Box width={1} padding={px(28)} background="#f7f8fa" color="#24364b">
      <VStack width={1} gap={px(20)}>
        <Text font_family="IBM Plex Mono" font_size={px(14)} color="#2c7567">COMPOSITION / 02</Text>
        <Text font_size={px(30)} font_weight={700}>One component, three shapes</Text>
        <HStack width={1} gap={px(16)} align="stretch">
          {cards.map(card => <Card {...card} />)}
        </HStack>
      </VStack>
    </Box>
  </Svg>
);
