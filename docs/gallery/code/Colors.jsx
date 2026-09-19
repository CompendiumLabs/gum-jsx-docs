// A data-domain palette and a white-to-blue interpolation ramp.
const paint = palette(blue, red, [0, 8])
return <Box padding={em(1.5)} background={lightgray}>
  <VStack width="fill" gap={em(1)}>
    <Text font-size={em(1.625)} font-weight={bold}>Numbers into colors</Text>
    <Text>palette(blue, red, [0, 8])</Text>
    <HStack gap={em(0.375)}>
      {range(9).map(value => <Box grow={1} height={px(48)} background={paint(value)} align="center">
        <Text color={white}>{value}</Text>
      </Box>)}
    </HStack>
    <Text>interp(white, blue, fraction)</Text>
    <HStack gap={em(0.875)}>
      {linspace(0, 1, 5).map(t => <VStack grow={1} gap={em(0.375)} align="center">
        <Square fill={interp(white, blue, t)} stroke={darkgray} />
        <Text font-family={mono} font-size={em(0.875)}>{rounder(t)}</Text>
      </VStack>)}
    </HStack>
  </VStack>
</Box>
