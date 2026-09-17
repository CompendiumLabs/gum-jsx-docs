// Overlapping windows combine clipped frames, wrapped text, and a live plot.
const messages = [
  {
    title: "Message Alert!",
    body: "There is a new message waiting in your inbox. You probably want to see it. But I'm gonna make that really difficult for no reason.",
  },
  { title: "Testing, Testing", body: "What are we doing here?" },
]
const Window = ({ title, children, ...props }) => (
  <Frame radius={px(8)} background={white} border-color={darkgray} clip {...props}>
    <VStack width="fill">
      <TextBox width="fill" padding={em(0.5)} background={gray} font-weight={bold}>
        {title}
      </TextBox>
      <HLine height={0} stroke={darkgray} />
      <Box width="fill" padding={em(0.5)}>
        {children}
      </Box>
    </VStack>
  </Frame>
)
return (
  <Svg width={px(900)} height={px(600)} font-size={px(18)}>
    <Box padding={px(20)}>
      <Frame radius={px(15)} clip border-width={px(2)} background={lightgray}>
        <Group>
          <Graph>
            <Mesh2D xlim={[0, 1]} ylim={[0, 1]} xticks={40} yticks={30} opacity={0.1} />
          </Graph>
          <Window title="Data Viz" x={px(55)} y={px(175)} width={px(570)}>
            <Plot
              width="fill"
              height={px(260)}
              title="Sine Wave"
              xlim={[0, tau]}
              ylim={[-1.2, 1.2]}
              font-size={px(14)}
            >
              <SymLine fy={sin} xlim={[0, tau]} stroke={blue} stroke-width={px(2.5)} />
            </Plot>
          </Window>
          <VStack x={px(540)} y={px(35)} width={px(285)} gap={px(18)}>
            {messages.map(({ title, body }) => (
              <Window title={title} width="fill">
                <Text width="fill">{body}</Text>
              </Window>
            ))}
          </VStack>
        </Group>
      </Frame>
    </Box>
  </Svg>
)
