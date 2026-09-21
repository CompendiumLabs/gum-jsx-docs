// Four economic sectors connected by explicit, boundary-aware flows.
const Sector = ({ id, x, y, color, children }) =>
  <Node
      id={id}
      x={x}
      y={y}
      width={em(8)}
      height={em(3.5)}
      text-justify="center"
      background={interp(white, color, 0.16)}
      border-color={color}
      border-width={px(1)}
      border-radius={em(0.5)}
    >{children}</Node>

const Linkage = ({ start, end, start_side, end_side, ...attr }) =>
  <Edge
    start={start}
    end={end}
    start-side={start_side}
    end-side={end_side}
    head-size={em(0.5)}
    head-open head-curve={0.7}
    {...attr}
  />

const Label = ({ x, y, children }) =>
  <TextBox
    x={x}
    y={y}
    anchor="center"
    padding={em(0.35)}
    font-size={em(0.8)}
  >{children}</TextBox>

return <Box fit font-size={px(12)} padding={em(1.6)}>
  <VStack gap={em(1.25)}>
    <Text font-size={em(1.7)} font-weight={bold}>Macroeconomic Flows</Text>
    <Network aspect={2} xlim={[0, 2]} ylim={[0, 1]} flip-y={false}>
      <Linkage start="prod" end="cons" start-side="right" end-side="left" start-loc={0.25} end-loc={0.25} curve={false} />
      <Linkage start="cons" end="prod" start-side="left" end-side="right" start-loc={0.75} end-loc={0.75} curve={false} />
      <Linkage start="govt" end="prod" start-side="left" end-side="bottom" radius={em(0.5)} points={[[0.4, 0.85]]} />
      <Linkage start="govt" end="cons" start-side="right" end-side="bottom" radius={em(0.5)} points={[[1.6, 0.85]]} />
      <Linkage start="trade" end="prod" start-side="left" end-side="top" radius={em(0.5)} points={[[0.4, 0.15]]} />
      <Linkage start="trade" end="cons" start-side="right" end-side="top" radius={em(0.5)} points={[[1.6, 0.15]]} />
      <Sector id="trade" x={1} y={0.15} color={yellow}>Foreign Trade</Sector>
      <Sector id="prod" x={0.4} y={0.5} color={blue}>Producers (Firms)</Sector>
      <Sector id="cons" x={1.6} y={0.5} color={green}>Consumers (Households)</Sector>
      <Sector id="govt" x={1} y={0.85} color={red}>Government</Sector>
      <Label x={1} y={0.42}>Goods + Services →</Label>
      <Label x={1} y={0.58}>← Wages, Rent, Profit</Label>
      <Label x={0.6} y={0.8}>Subsidies / Taxes</Label>
      <Label x={1.4} y={0.8}>Transfers / Taxes</Label>
      <Label x={0.6} y={0.2}>Imports / Exports</Label>
      <Label x={1.4} y={0.2}>Transfers</Label>
    </Network>
  </VStack>
</Box>
