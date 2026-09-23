<Page
  number={2}
  topic="LAYOUT + UNITS"
  title="Compose, then measure."
  subtitle="Stacks arrange children. Frames add space. Text keeps its size and wraps to fit."
>
  <Panel x={64} width={480}>
    <Label>FIXED + FLEXIBLE</Label>
    <Code size={19}>{`<HStack gap={px(16)}>
  <Frame width={px(120)}>
    <Text>120 px</Text>
  </Frame>
  <Frame grow={1}>
    <Text>grow = 1</Text>
  </Frame>
  <Frame grow={1}>
    <Text>grow = 1</Text>
  </Frame>
</HStack>`}</Code>
  </Panel>
  <Panel x={576} width={640} background={mint}>
    <Label>A ROW SHARES ITS AVAILABLE WIDTH</Label>
    <HStack x={px(28)} y={px(86)} width={px(584)} gap={px(16)}>
      <Frame width={px(120)} height={px(118)} align="center" background={teal} border-width={0}>
        <Text font-size={px(21)} color="white">120 px</Text>
      </Frame>
      <Frame grow={1} height={px(118)} align="center" background="white" border-width={0}>
        <Text font-size={px(21)} color={teal}>grow = 1</Text>
      </Frame>
      <Frame grow={1} height={px(118)} align="center" background="white" border-width={0}>
        <Text font-size={px(21)} color={teal}>grow = 1</Text>
      </Frame>
    </HStack>
    <Text x={px(28)} y={px(238)} width={px(584)} font-size={px(23)}>
      <Span font-weight="bold">px(24)</Span> sets a pixel length.
    </Text>
    <Text x={px(28)} y={px(280)} width={px(584)} font-size={px(23)}>
      <Span font-weight="bold">em(1.5)</Span> follows the font size.
    </Text>
    <Text x={px(28)} y={px(322)} width={px(584)} font-size={px(20)} color={muted}>
      Use width="fill" to occupy a parent's offered width.
    </Text>
  </Panel>
</Page>
