// The same fixed-size paragraph reflows at two explicit widths.
const paragraph =
  "A paragraph keeps its font size while the available width changes its line breaks."
const Column = ({ width, color }) => (
  <VStack shrink={1} basis={px(width)} gap={em(0.625)}>
    <Text font-weight={bold} color={color}>{width} px</Text>
    <Frame
      width="fill"
      padding={em(0.75)}
      border-color={color}
      background={white}
    >
      <Text font-size={em(1.125)} line-height={em(1.4)}>{paragraph}</Text>
    </Frame>
  </VStack>
)
return (
  <Box padding={em(1.25)} background={lightgray}>
    <HStack wrap gap={em(1.25)}>
      <Column width={200} color={blue} />
      <Column width={300} color={red} />
    </HStack>
  </Box>
)
