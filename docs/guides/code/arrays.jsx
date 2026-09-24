// Sequences become categorical ticks, bars, and a reshaped text table.
const indices = range(1, 7)
const values = indices.map(n => pow(n, 2))
const rows = reshape(values, [2, 3])
return <TextBox width="fill" padding={em(1.5)} background={lightgray}>
  <TextCol gap={em(1)}>
    <Text font-size={em(1.625)} font-weight={bold}>From a range to a figure</Text>
    <BarPlot font-size={em(0.75)} aspect={2} values={values} xticks={enumerate(indices.map(String))}
      xlabel="n" ylabel="n squared" fill={blue} />
    <HStack gap={em(1.5)} align="center">
      <Frame padding={em(0.75)}>
        <Text whitespace="pre" font-family={mono}>
          {rows.map(row => row.map(n => String(n).padStart(2)).join('  ')).join('\n')}
        </Text>
      </Frame>
      <Text grow={1}>Sum: {sum(values)}. Mean: {rounder(mean(values))}.</Text>
    </HStack>
  </TextCol>
</TextBox>
