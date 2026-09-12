// Generate reusable swatch components from ordinary JavaScript data.
const Swatch = ({ color, label }) =>
  <VStack gap={px(8)}>
    <Square width={px(64)} fill={color} stroke="none" />
    <Text font_size={px(14)}>{label}</Text>
  </VStack>;
const swatches = [
  { color: "#317969", label: "Forest" },
  { color: "#d77c45", label: "Clay" },
  { color: "#476c9b", label: "Lake" },
];
return <Svg>
  <Box padding={px(20)} background="#f7f8fa">
    <HStack gap={px(24)}>
      {swatches.map(swatch => <Swatch {...swatch} />)}
    </HStack>
  </Box>
</Svg>;
