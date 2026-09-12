// Reusable components, dashed JSX attributes, and text whitespace.
const Swatch = ({ color, label }) => (
  <VStack gap={px(8)}>
    <Square width={px(64)} fill={color} stroke={none} />
    <Text font-size={px(14)}>{label}</Text>
  </VStack>
);
const swatches = [
  { color: blue, label: "Blue" },
  { color: red, label: "Red" },
  { color: green, label: "Green" },
  { color: yellow, label: "Yellow" },
  { color: purple, label: "Purple" },
];
return (
  <Svg>
    <Box padding={px(20)} background={lightgray}>
      <VStack gap={px(20)}>
        <Text font-size={px(22)} font-weight={bold}>
          A label without surrounding blank lines
        </Text>
        <HStack gap={px(24)}>
          {swatches.map((swatch) => (
            <Swatch {...swatch} />
          ))}
        </HStack>
        <Text line-height={em(1.4)}>
          Hello <Span font-weight={bold} color={blue}>world</Span>
          This internal line break remains.
        </Text>
        <Frame padding={px(8)} border-color={blue} background={white}>
          <Text whitespace="pre" font-family={mono} wrap={false}>
            {'  Exact spaces  \n  and a final blank line.\n'}
          </Text>
        </Frame>
      </VStack>
    </Box>
  </Svg>
);
