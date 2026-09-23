<Page
  number={2}
  topic="LAYOUT + UNITS"
  title="Compose, then measure."
  subtitle="Stacks arrange children. Frames add space. Text keeps its size and wraps to fit."
>
  <HStack grow={1} gap={em(1)} align="fill">
    <Panel title="FIXED + FLEXIBLE">
      <Code>{`<HStack gap={em(0.5)}>
  <Frame width={em(5)}>
    <Text>5 em</Text>
  </Frame>
  <Frame grow={1}>
    <Text>grow = 1</Text>
  </Frame>
  <Frame grow={1}>
    <Text>grow = 1</Text>
  </Frame>
</HStack>`}</Code>
    </Panel>
    <Panel
      title="A ROW SHARES ITS AVAILABLE WIDTH"
      note={"Use width=\"fill\" to occupy a parent's offered width."}
      background={mint}
    >
      <Box grow={1} align="center">
        <HStack width="fill" gap={em(0.5)} align="fill">
          <Frame width={em(5)} padding={em(0.75)} background={teal} border-width={0}>
            <Text color="white">5 em</Text>
          </Frame>
          <Frame grow={1} padding={em(0.75)} background="white" border-width={0}>
            <Text color={teal}>grow = 1</Text>
          </Frame>
          <Frame grow={1} padding={em(0.75)} background="white" border-width={0}>
            <Text color={teal}>grow = 1</Text>
          </Frame>
        </HStack>
      </Box>
      <Text><Span font-weight="bold">px(24)</Span> sets a pixel length.</Text>
      <Text><Span font-weight="bold">em(1.5)</Span> follows the font size.</Text>
    </Panel>
  </HStack>
</Page>
