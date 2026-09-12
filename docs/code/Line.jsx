// Stroke caps change the ends of otherwise identical horizontal line segments.
const Rule = ({ cap, color }) => (
  <HStack gap={px(16)} align="center">
    <Text width={px(64)}>{cap}</Text>
    <Line width={px(240)} height={px(24)} from={{ x: 0.05, y: 0.5 }} to={{ x: 0.95, y: 0.5 }}
      stroke={color} stroke_width={px(10)} stroke_linecap={cap} />
  </HStack>
);
return (
  <Svg>
    <Box padding={px(20)} background="#f7f8fa">
      <VStack gap={px(16)}>
        <Rule cap="butt" color="#2c7567" />
        <Rule cap="round" color="#486d9c" />
        <Rule cap="square" color="#bb6748" />
      </VStack>
    </Box>
  </Svg>
);
