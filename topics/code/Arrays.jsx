// Sequences become categorical ticks, bars, and a reshaped text table.
const indices = range(1, 7)
const values = indices.map(n => pow(n, 2))
const rows = reshape(values, [2, 3])
return <Svg width={px(600)} font-size={px(16)}>
  <Box padding={em(1.5)} background={lightgray}>
    <VStack gap={em(1)} align="stretch">
      <Text font-size={em(1.625)} font-weight={bold}>From a range to a figure</Text>
      <BarPlot font-size={em(0.75)} height={px(260)} values={values} xticks={enumerate(indices.map(String))}
        xlabel="n" ylabel="n squared" fill={blue} />
      <HStack gap={em(1.5)} align="center">
        <Frame padding={em(0.75)}>
          <Text whitespace="pre" font-family={mono}>
            {rows.map(row => row.map(n => String(n).padStart(2)).join('  ')).join('\n')}
          </Text>
        </Frame>
        <Text>Sum: {sum(values)}. Mean: {rounder(mean(values))}.</Text>
      </HStack>
    </VStack>
  </Box>
</Svg>
