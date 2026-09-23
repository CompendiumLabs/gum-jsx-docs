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
    <HStack grow={1} gap={em(1)} align="fill">
      <Panel title="MAP DATA TO COMPONENTS">
        <Code>{
`const metrics = [
  { value: '12', label: 'samples' },
  { value: '3', label: 'series' },
  { value: '1', label: 'figure' },
]
return (
  <HStack gap={em(0.5)}>
    {metrics.map(metric => (
      <Metric grow={1} {...metric} />
    ))}
  </HStack>
)`
        }</Code>
      </Panel>
      <Panel
        title="ONE COMPONENT, THREE INSTANCES"
        note="Metric is a functional component in prelude.jsx. Every slide can use it."
      >
        <Box grow={1} align="center">
          <HStack width="fill" gap={em(0.5)}>
            {metrics.map(metric => (
              <Metric grow={1} {...metric} />
            ))}
          </HStack>
        </Box>
      </Panel>
    </HStack>
  </Page>
)
