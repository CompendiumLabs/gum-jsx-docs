// Overlapping windows combine clipped frames, wrapped text, and a live plot.
const messages = [
  {
    title: "Message Alert!",
    body: "There is a new message waiting in your inbox. You probably want to see it. But I'm gonna make that really difficult for no reason.",
  },
  { title: "Testing, Testing", body: "What are we doing here?" },
]
const Window = ({ title, children, padding = em(0.5), ...props }) => (
  <Frame border-radius={em(0.45)} background={white} border-color={darkgray} clip {...props}>
    <VStack>
      <TextBox width="fill" padding={em(0.5)} background={gray} font-weight={bold}>
        {title}
      </TextBox>
      <HLine height={0} stroke={darkgray} />
      <Box padding={padding}>
        {children}
      </Box>
    </VStack>
  </Frame>
)
return <Slide fit font-size={px(10)} aspect={1.5} padding={em(1.1)}>
  <Frame border-radius={em(0.85)} clip border-width={em(0.1)} background={lightgray}>
    <Group>
      <Window title="Data Viz" x={0.06} y={0.31} width={0.67} padding={0}>
        <Plot aspect={1.9} xlim={[0, tau]} ylim={[-1.2, 1.2]}>
          <SymLine fy={sin} xlim={[0, tau]} stroke={blue} stroke-width={em(0.15)} />
        </Plot>
      </Window>
      <VStack x={0.64} y={0.05} width={0.33} gap={em(0.75)}>
        {messages.map(({ title, body }) => (
          <Window title={title}>
            <Text>{body}</Text>
          </Window>
        ))}
      </VStack>
    </Group>
  </Frame>
</Slide>
