<Page
  number={1}
  topic="THE LANGUAGE"
  title="Figures are programs."
  subtitle="Describe a picture with JavaScript and JSX. Gum measures it and draws the result."
>
  <Panel x={64} width={560}>
    <Label>WRITE A FIGURE</Label>
    <Code>{`<HStack gap={px(24)} align="center">
  <Circle
    width={px(88)}
    fill="#167C73"
  />
  <Text>Hello, Gum</Text>
</HStack>`}</Code>
    <Text x={px(28)} y={px(326)} font-size={px(18)} color={muted}>
      Elements, units, and helpers are already in scope.
    </Text>
  </Panel>
  <Panel x={656} width={560} background={mint}>
    <Label>GET A DRAWING</Label>
    <HStack x={px(62)} y={px(136)} gap={px(24)} align="center">
      <Circle width={px(88)} fill="#167C73" />
      <Text>Hello, Gum</Text>
    </HStack>
    <Text x={px(28)} y={px(282)} width={px(504)} font-size={px(22)} color={muted}>
      Shapes, text, and layout are all part of the same element tree.
    </Text>
  </Panel>
</Page>
