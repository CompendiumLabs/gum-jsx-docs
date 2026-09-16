// The two bundled families provide light, regular, and bold faces without host setup.
const Family = ({ name, color }) => (
  <VStack gap={em(0.625)} font-family={name} color={color}>
    <Text font-size={em(0.875)}>{name}</Text>
    {[light, regular, bold].map((weight) => (
      <Text font-size={em(1.375)} font-weight={weight}>{weight} — Aa Bb 0123</Text>
    ))}
    <Text font-size={em(1.375)} font-style="italic">Italic request</Text>
  </VStack>
)
return (
  <Svg font-size={px(16)}>
    <Box padding={em(1.5)} background={lightgray}>
      <HStack gap={em(2.25)}>
        <Family name={sans} color={blue} />
        <Family name={mono} color={red} />
      </HStack>
    </Box>
  </Svg>
)
