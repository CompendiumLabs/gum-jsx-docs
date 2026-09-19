// A decoder-only transformer: nested stacks place blocks; edges find their boundaries.
const tint = color => interp(white, color, 0.18)
const blockWidth = 300
const blockHeight = 46
const gap = 24
const terminalHeight = 24
const layerPadding = 16
const layerBorder = 1.5
const layers = [
  { id: "norm2", label: "Add & Norm", color: yellow },
  { id: "feed", label: "Feed Forward", color: green },
  { id: "norm1", label: "Add & Norm", color: yellow },
  { id: "attention", label: "Masked Multi-Head Attention", color: blue },
]
const flow = ["input", "embedding", "attention", "norm1", "feed", "norm2", "linear", "softmax", "output"]
// Match the loop's horizontal arms to the first and last block centers.
const loopX = 230 + blockWidth / 2 + 85
const loopTop = terminalHeight + 3 * gap + 2 * blockHeight
  + layerPadding + layerBorder + blockHeight / 2
const loopBottom = loopTop + (layers.length - 1) * (blockHeight + gap)
const Block = ({ id, label, color }) => (
  <Node
    id={id} width={px(blockWidth)} height={px(blockHeight)}
    padding={em(0.45)} radius={em(0.4)} background={tint(color)}
    border-color={interp(white, color, 0.55)} border-width={px(1.5)}
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
        width={px(530)} height={px(610)}
        xlim={[0, 530]} ylim={[0, 610]} flip-y={false}
        stroke={slate} stroke-width={px(2)}
      >
        {flow.slice(0, -1).map((id, index) => (
          <Edge
            start={id} end={flow[index + 1]}
            start-side="top" end-side="bottom"
            curve={false} gap={px(3)}
            head-size={px(9)} head-curve={0.4}
          />
        ))}
        <VStack x={px(20)} y={px(0)} width={px(420)} gap={px(gap)} align="center">
          <Node id="output" height={px(terminalHeight)} padding={0} border-width={0}>Output Probabilities</Node>
          <Block id="softmax" label="Softmax" color={red} />
          <Block id="linear" label="Linear" color={red} />
          <Frame
            padding={px(layerPadding)} border-color={interp(white, slate, 0.2)}
            border-width={px(layerBorder)} radius={em(0.65)}
          >
            <VStack gap={px(gap)} align="center">
              {layers.map(layer => (
                <Block {...layer} />
              ))}
            </VStack>
          </Frame>
          <Block id="embedding" label="Token + Positional Embedding" color={purple} />
          <Node id="input" height={px(terminalHeight)} padding={0} border-width={0}>Input Tokens</Node>
        </VStack>
        <Edge
          start="norm2" end="attention"
          start-side="right" end-side="right"
          points={[[loopX, loopTop], [loopX, loopBottom]]}
          curve={false} radius={em(0.65)} gap={px(6)}
          stroke={darkgray} stroke-dasharray={[px(5), px(5)]}
          head-size={px(10)} head-curve={0.4}
        />
        <TextBox
          x={loopX} y={(loopTop + loopBottom) / 2} anchor="center"
          padding={em(0.3)} background={white}
          font-size={em(1.2)}
        >
          × N
        </TextBox>
      </Network>
    </TitleFrame>
  </Box>
)
