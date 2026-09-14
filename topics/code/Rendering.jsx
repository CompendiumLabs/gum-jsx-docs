// Immutable source becomes a pixel fragment, then self-contained SVG output.
const Stage = ({ label, color }) => (
  <Frame
    width={px(120)}
    padding={em(0.875)}
    border-color={color}
    background={white}
    radius={px(8)}
  >
    <Text text-align="center" width={1} color={color} font-weight={bold}>{label}</Text>
  </Frame>
)
return (
  <Svg font-size={px(16)}>
    <Box padding={em(1.25)} background={lightgray}>
      <HStack gap={em(0.75)} align="center">
        <Stage label="Source" color={blue} />
        <Text>→</Text>
        <Stage label="Fragment" color={red} />
        <Text>→</Text>
        <Stage label="SVG" color={green} />
      </HStack>
    </Box>
  </Svg>
)
