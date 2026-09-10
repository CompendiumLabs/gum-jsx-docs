const messages = [
  { title: 'Message Alert!', body: 'There is a new message waiting in your inbox. You probably want to see it. But I\'m gonna make that really difficult for no reason.' },
  { title: 'Testing, Testing', body: 'What are we doing here?' },
]

const Window = ({ title, children, ...attr }) =>
  <Frame rounded={7} fill={white} {...attr}>
    <VStack justify="left">
      <Box padding fill={gray} align="stretch">
        <Text font-weight={bold}>{title}</Text>
      </Box>
      <HLine height={0} />
      <Box margin>
        {children}
      </Box>
    </VStack>
  </Frame>

const Visual = ({ ...attr }) =>
  <Plot aspect={2} margin={0.15} grid title="Sine Wave">
    <SymLine fy={sin} xlim={[0, 2*pi]} stroke={blue} stroke-width={2} />
  </Plot>

return <Frame rounded={15} clip border={2}>
  <Group em={0.03} aspect={1.5}>
    <Mesh2D opacity={0.1} xlocs={60} ylocs={40} />
    <Window title="Data Viz" pos={[0.45, 0.55]} width={30}>
      <Visual />
    </Window>
    <VStack gap={0.75} pos={[0.82, 0.22]}>{
      messages.map(({ title, body }) =>
        <Window width={16} title={title}>
          <Text gap={0.2}>{body}</Text>
        </Window>
      )
    }</VStack>
  </Group>
</Frame>
