// Generate reusable swatch components from ordinary JavaScript data.
const Swatch = ({ color, label }) =>
  <VStack gap={px(8)}>
    <Square width={px(64)} fill={color} stroke={none} />
    <Text font_size={px(14)}>{label}</Text>
  </VStack>;
const swatches = [
  { color: blue, label: "Blue" },
  { color: red, label: "Red" },
  { color: green, label: "Green" },
  { color: yellow, label: "Yellow" },
  { color: purple, label: "Purple" },
];
return <Svg>
  <Box padding={px(20)} background={lightgray}>
    <HStack gap={px(24)}>
      {swatches.map(swatch => <Swatch {...swatch} />)}
    </HStack>
  </Box>
</Svg>;
