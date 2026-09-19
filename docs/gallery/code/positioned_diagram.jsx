// Group positions nodes and explicit arrow geometry in a shared pixel canvas.
const Node = ({ title, detail, color, ...attr }) => (
  <Frame
    align="center"
    align-self="stretch"
    border-width={px(2)}
    border-color={color}
    radius={em(0.75)}
    background={black}
    padding={[em(0.5), em(1.5)]}
    {...attr}
  >
    <VStack gap={em(0.5)} align="center">
      <Text font-size={em(1.4)} font-weight={bold} color={white}>{title}</Text>
      <Text font-size={em(0.9)} color={white}>{detail}</Text>
    </VStack>
  </Frame>
)

const ArrowBox = ({ text = "", color = white, ...attr }) => <Group {...attr}>
  <Arrow stroke={color} from={[0, 0.5]} to={[1, 0.5]} />
  <Text x={0.5} y={1} anchor="center" color={color}>{text}</Text>
</Group>

const Diagram = ({ ...attr }) => <HStack align="center" {...attr}>
  <Node title="Source" detail="JSX + data" color={blue} width={0.7/3} />
  <ArrowBox text="measure" width={0.15} height={em(2)} />
  <Node title="Layout" detail="pixel fragments" color={red} width={0.7/3} />
  <ArrowBox text="serialize" width={0.15} height={em(2)} />
  <Node title="Render" detail="SVG paths" color={green} width={0.7/3} />
</HStack>

return <TextBox fit width={px(760)} height={px(400)} background={slate} padding={em(2)}>
  <TextCol gap={em(1.5)} height={1}>
    <Text font-family={mono} font-size={em(0.9)} color={blue}>POSITIONING / 03</Text>
    <Text font-size={em(2)} font-weight={bold} color={white}>A tiny processing pipeline</Text>
    <Spacer />
    <Diagram width={0.9} align-self="center" />
    <Spacer />
    <Text font-size={em(1)} color={white}>Positions are explicit. Text remains text-sized. The renderer receives finished geometry.</Text>
  </TextCol>
</TextBox>
