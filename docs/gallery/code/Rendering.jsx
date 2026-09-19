// Immutable source becomes a pixel fragment, then self-contained SVG output.
const Stage = ({ label, color, debug }) => (
  <TextFrame
    debug={debug}
    grow={1}
    padding={em(0.4)}
    border-color={color}
    background={white}
    radius={em(0.5)}
  >
    <Text text-align="center" color={color} font-weight={bold}>{label}</Text>
  </TextFrame>
)
return (
  <Box padding={em(1.25)} background={lightgray}>
    <HStack gap={em(0.75)} align="center">
      <Stage label="Source" color={blue} />
      <Text>→</Text>
      <Stage label="Fragment" color={red} debug />
      <Text>→</Text>
      <Stage label="SVG" color={green} />
    </HStack>
  </Box>
)
