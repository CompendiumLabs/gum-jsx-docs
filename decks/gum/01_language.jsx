<Page
  number={1}
  topic="THE LANGUAGE"
  title="Figures are programs."
  subtitle="Describe a picture with JavaScript and JSX. Gum measures it and draws the result."
>
  <HStack grow={1} gap={em(1)} align="fill">
    <Panel
      title="WRITE A FIGURE"
      note="Elements, units, and helpers are already in scope. This deck's prelude defines teal."
    >
      <Code>{`<HStack gap={em(1)} align="center">
  <Circle
    width={em(3)}
    fill={teal}
    stroke="none"
  />
  <Text>Hello, Gum</Text>
</HStack>`}</Code>
    </Panel>
    <Panel
      title="GET A DRAWING"
      note="Shapes, text, and layout are all part of the same element tree."
      background={mint}
    >
      <Box grow={1} align="center">
        <HStack gap={em(1)} align="center">
          <Circle width={em(3)} fill={teal} stroke="none" />
          <Text>Hello, Gum</Text>
        </HStack>
      </Box>
    </Panel>
  </HStack>
</Page>
