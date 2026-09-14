// Immutable source becomes a pixel fragment, then self-contained SVG output.
const Stage = ({ label, color }) => (
  <Frame
    width={px(120)}
    padding={px(14)}
    border_color={color}
    background={white}
    radius={px(8)}
  >
    <Text text_align="center" width={1} color={color} font_weight={bold}>{label}</Text>
  </Frame>
)
return (
  <Svg>
    <Box padding={px(20)} background={lightgray}>
      <HStack gap={px(12)} align="center">
        <Stage label="Source" color={blue} />
        <Text>→</Text>
        <Stage label="Fragment" color={red} />
        <Text>→</Text>
        <Stage label="SVG" color={green} />
      </HStack>
    </Box>
  </Svg>
)
