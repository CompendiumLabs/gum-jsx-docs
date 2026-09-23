const metrics = [
  { value: '12', label: 'samples' },
  { value: '3', label: 'series' },
  { value: '1', label: 'figure' },
]
return (
  <Page
    number={3}
    topic="FUNCTIONS + DATA"
    title="JavaScript is the glue."
    subtitle="Turn data into elements. Reuse ordinary functions as components."
  >
    <Panel x={64} width={560}>
      <Label>MAP DATA TO COMPONENTS</Label>
      <Code size={18}>{`const metrics = [
  { value: '12', label: 'samples' },
  { value: '3', label: 'series' },
  { value: '1', label: 'figure' },
]
return (
  <HStack gap={px(16)}>
    {metrics.map(m => <Metric {...m} />)}
  </HStack>
)`}</Code>
    </Panel>
    <Panel x={656} width={560}>
      <Label>ONE COMPONENT, THREE INSTANCES</Label>
      <HStack x={px(28)} y={px(94)} width={px(504)} gap={px(16)}>
        {metrics.map(metric => (
          <Metric grow={1} {...metric} />
        ))}
      </HStack>
      <Text x={px(28)} y={px(280)} width={px(504)} font-size={px(22)} color={muted}>
        Metric is a function in prelude.jsx. Every slide can use it.
      </Text>
    </Panel>
  </Page>
)
