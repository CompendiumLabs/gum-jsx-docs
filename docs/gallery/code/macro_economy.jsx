// Four economic sectors connected by explicit, boundary-aware flows.
const sectors = [
  { id: "trade", label: "Foreign Trade", x: 0.8, y: 0.12, color: yellow },
  { id: "prod", label: "Producers (Firms)", x: 0.28, y: 0.43, color: blue },
  { id: "cons", label: "Consumers\n(Households)", x: 1.32, y: 0.43, color: green },
  { id: "govt", label: "Government", x: 0.8, y: 0.75, color: red },
]
const Label = ({ x, y, children, color = slate }) => (
  <TextBox
    x={x}
    y={y}
    anchor="center"
    width="fit"
    background={white}
    padding={px(5)}
    color={color}
    font-size={px(15)}
  >
    {children}
  </TextBox>
)
return (
  <Svg width={px(960)} height={px(600)} font-size={px(19)}>
    <Box padding={px(30)}>
      <VStack width="fill" gap={px(24)}>
        <Text font-size={px(32)} font-weight={bold}>
          Macroeconomic Flows
        </Text>
        <Network
          width="fill"
          height={px(460)}
          xlim={[0, 1.6]}
          ylim={[0, 0.9]}
          flip-y={false}
          stroke={darkgray}
          stroke-width={px(2)}
        >
          <Edge
            start="prod"
            end="cons"
            start-side="right"
            end-side="left"
            start-loc={0.28}
            end-loc={0.28}
            curve={false}
          />
          <Edge
            start="cons"
            end="prod"
            start-side="left"
            end-side="right"
            start-loc={0.72}
            end-loc={0.72}
            curve={false}
          />
          <Edge start="govt" end="prod" end-side="bottom" />
          <Edge start="govt" end="cons" end-side="bottom" />
          <Edge start="trade" end="prod" end-side="top" />
          <Edge start="trade" end="cons" end-side="top" />
          {sectors.map(({ id, label, x, y, color }) => (
            <Node
              id={id}
              x={x}
              y={y}
              width={px(200)}
              height={px(64)}
              background={interp(white, color, 0.16)}
              border-color={color}
              border-width={px(2)}
              radius={px(9)}
            >
              {label}
            </Node>
          ))}
          <Label x={0.8} y={0.35} color={blue}>
            Goods + Services →
          </Label>
          <Label x={0.8} y={0.51} color={green}>
            ← Wages, Rent, Profit
          </Label>
          <Label x={0.28} y={0.73}>
            Subsidies / Taxes
          </Label>
          <Label x={1.32} y={0.73}>
            Transfers / Taxes
          </Label>
          <Label x={0.28} y={0.12}>
            Imports / Exports
          </Label>
          <Label x={1.32} y={0.12}>
            Transfers
          </Label>
        </Network>
      </VStack>
    </Box>
  </Svg>
)
