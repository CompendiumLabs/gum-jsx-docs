// Sequences become categorical ticks, bars, and a reshaped text table.
const indices = range(1, 7)
const values = indices.map(n => pow(n, 2))
const rows = reshape(values, [2, 3])
return <Svg width={px(600)}>
  <Box padding={px(24)} background={lightgray}>
    <VStack gap={px(16)} align="stretch">
      <Text font-size={px(26)} font-weight={bold}>From a range to a figure</Text>
      <BarPlot height={px(260)} values={values} xticks={enumerate(indices.map(String))}
        xlabel="n" ylabel="n squared" fill={blue} />
      <HStack gap={px(24)} align="center">
        <Frame padding={px(12)}>
          <Text whitespace="pre" font-family={mono}>
            {rows.map(row => row.map(n => String(n).padStart(2)).join('  ')).join('\n')}
          </Text>
        </Frame>
        <Text>Sum: {sum(values)}. Mean: {rounder(mean(values))}.</Text>
      </HStack>
    </VStack>
  </Box>
</Svg>
