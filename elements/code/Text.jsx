// The same fixed-size paragraph reflows at two explicit widths.
const paragraph =
  "A paragraph keeps its font size while the available width changes its line breaks."
const Column = ({ width, color }) => (
  <VStack gap={px(10)}>
    <Text font-weight={bold} color={color}>{width} px</Text>
    <Frame
      width={px(width)}
      padding={px(12)}
      border-color={color}
      background={white}
    >
      <Text font-size={px(18)} line-height={em(1.4)}>{paragraph}</Text>
    </Frame>
  </VStack>
)
return (
  <Svg>
    <Box padding={px(20)} background={lightgray}>
      <HStack gap={px(20)}>
        <Column width={200} color={blue} />
        <Column width={300} color={red} />
      </HStack>
    </Box>
  </Svg>
)
