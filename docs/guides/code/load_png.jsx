// Load one PNG once, then reuse its embedded data at two different sizes.
const image = loadPNG('landscape.png')

return (
  <Box font-size={px(18)} padding={em(1)} fit>
    <VStack gap={em(1)}>
      <Text font-size={em(1.3)} font-weight={bold}>One PNG, two sizes</Text>
      <HStack gap={em(1)} align="center">
        <VStack gap={em(0.5)}>
          <PngImage data={image} width={em(14)} />
          <Text>Original proportions</Text>
        </VStack>
        <VStack gap={em(0.5)}>
          <Box width={em(9)} height={em(9)} border-color={gray} border-width={px(1)}>
            <PngImage data={image} width="fill" height="fill" />
          </Box>
          <Text>Centered in a square</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
)
