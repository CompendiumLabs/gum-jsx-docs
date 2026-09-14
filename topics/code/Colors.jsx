// A data-domain palette and a white-to-blue interpolation ramp.
const paint = palette(blue, red, [0, 8])
return <Svg font-size={px(16)}>
  <Box padding={em(1.5)} background={lightgray}>
    <VStack gap={em(1)}>
      <Text font-size={em(1.625)} font-weight={bold}>Numbers into colors</Text>
      <Text>palette(blue, red, [0, 8])</Text>
      <HStack gap={em(0.375)}>
        {range(9).map(value => <Box width={px(42)} height={px(48)} background={paint(value)} align="center">
          <Text color={white}>{value}</Text>
        </Box>)}
      </HStack>
      <Text>interp(white, blue, fraction)</Text>
      <HStack gap={em(0.875)}>
        {linspace(0, 1, 5).map(t => <VStack gap={em(0.375)} align="center">
          <Square width={px(60)} fill={interp(white, blue, t)} stroke={darkgray} />
          <Text font-family={mono} font-size={em(0.875)}>{rounder(t)}</Text>
        </VStack>)}
      </HStack>
    </VStack>
  </Box>
</Svg>
