// A decoder-only transformer: nested stacks place blocks; edges find their boundaries.
const tint = color => interp(white, color, 0.18)
// Local design dimensions are in em, including the repetition route below.
const blockWidth = 16.5
const blockHeight = 2.6
const gap = 1.3
const terminalHeight = 1.3
const layerPadding = 0.9
const layerBorder = 0.08
const layers = [
  { id: "norm2", label: "Add & Norm", color: yellow },
  { id: "feed", label: "Feed Forward", color: green },
  { id: "norm1", label: "Add & Norm", color: yellow },
  { id: "attention", label: "Masked Multi-Head Attention", color: blue },
]
const flow = ["input", "embedding", "attention", "norm1", "feed", "norm2", "linear", "softmax", "output"]
// Match the loop's horizontal arms to the first and last block centers.
const stackX = 1.1
const stackWidth = 23.4
const loopX = stackX + stackWidth / 2 + blockWidth / 2 + 4.7
const loopTop = terminalHeight + 3 * gap + 2 * blockHeight
  + layerPadding + layerBorder + blockHeight / 2
const loopBottom = loopTop + (layers.length - 1) * (blockHeight + gap)
const Block = ({ id, label, color }) => (
  <Node
    id={id} width={em(blockWidth)} height={em(blockHeight)}
    padding={em(0.45)} radius={em(0.4)} background={tint(color)}
    border-color={interp(white, color, 0.55)} border-width={em(0.08)}
    align="center"
  >
    {label}
  </Node>
)

return (
  <Box fit
    font-size={px(18)}
    color={slate}
    padding={em(1.3)}
    background={white}
  >
    <TitleFrame
      title="Transformer Architecture"
      title-font-size={em(1.1)}
      padding={em(1.1)} radius={em(0.9)}
      border-color={darkgray}
    >
      <Network
        width={em(29.5)} height={em(34)}
        stroke={slate} stroke-width={em(0.11)}
      >
        {flow.slice(0, -1).map((id, index) => (
          <Edge
            start={id} end={flow[index + 1]}
            start-side="top" end-side="bottom"
            curve={false} gap={em(0.17)}
            head-size={em(0.5)} head-curve={0.4}
          />
        ))}
        <VStack x={em(stackX)} width={em(stackWidth)} gap={em(gap)} align="center">
          <Node id="output" height={em(terminalHeight)} padding={0} border-width={0}>Output Probabilities</Node>
          <Block id="softmax" label="Softmax" color={red} />
          <Block id="linear" label="Linear" color={red} />
          <Frame
            padding={em(layerPadding)} border-color={interp(white, slate, 0.2)}
            border-width={em(layerBorder)} radius={em(0.65)}
          >
            <VStack gap={em(gap)} align="center">
              {layers.map(layer => (
                <Block {...layer} />
              ))}
            </VStack>
          </Frame>
          <Block id="embedding" label="Token + Positional Embedding" color={purple} />
          <Node id="input" height={em(terminalHeight)} padding={0} border-width={0}>Input Tokens</Node>
        </VStack>
        <Edge
          start="norm2" end="attention"
          start-side="right" end-side="right"
          points={[[em(loopX), em(loopTop)], [em(loopX), em(loopBottom)]]}
          curve={false} radius={em(0.65)} gap={em(0.33)}
          stroke={darkgray} stroke-dasharray={[em(0.28), em(0.28)]}
          head-size={em(0.55)} head-curve={0.4}
        />
        <TextBox
          x={em(loopX)} y={em((loopTop + loopBottom) / 2)} anchor="center"
          padding={em(0.35)} background={white}
        >
          <Text font-size={em(1.2)}>× N</Text>
        </TextBox>
      </Network>
    </TitleFrame>
  </Box>
)
