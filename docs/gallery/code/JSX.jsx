// Reusable components, dashed JSX attributes, and text whitespace.
const Swatch = ({ color, label }) => (
  <VStack basis={em(3)} grow={1} shrink={1} gap={em(0.5)}>
    <Square fill={color} stroke={none} />
    <Text font-size={em(0.875)}>{label}</Text>
  </VStack>
)
const swatches = [
  { color: blue, label: "Blue" },
  { color: red, label: "Red" },
  { color: green, label: "Green" },
  { color: yellow, label: "Yellow" },
  { color: purple, label: "Purple" },
]
return (
  <Box padding={em(1.25)} background={lightgray}>
    <VStack width="fill" gap={em(1.25)}>
      <Text font-size={em(1.375)} font-weight={bold}>
        A label without surrounding blank lines
      </Text>
      <HStack wrap gap={em(0.75)}>
        {swatches.map((swatch) => (
          <Swatch {...swatch} />
        ))}
      </HStack>
      <Text line-height={em(1.4)}>
        Hello <Span font-weight={bold} color={blue}>world</Span>
        This internal line break remains.
      </Text>
      <Frame padding={em(0.5)} border-color={blue}>
        <Text fit whitespace="pre" font-family={mono} wrap={false}>
          {'  Exact spaces  \n  and a final blank line.\n'}
        </Text>
      </Frame>
    </VStack>
  </Box>
)
