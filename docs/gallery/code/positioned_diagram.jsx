// Flex weights allocate the pipeline; each connector uses its own relative coordinates.
const Node = ({ title, detail, color, ...attr }) => (
  <Frame
    align="center"
    align-self="stretch"
    border-width={em(0.125)}
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
  <Node title="Source" detail="JSX + data" color={blue} grow={1} />
  <ArrowBox text="measure" grow={0.65} height={em(2)} />
  <Node title="Layout" detail="pixel fragments" color={red} grow={1} />
  <ArrowBox text="serialize" grow={0.65} height={em(2)} />
  <Node title="Render" detail="SVG paths" color={green} grow={1} />
</HStack>

return <Slide fit font-size={px(12)} aspect={1.5} background={slate} padding={em(2)}>
  <TextCol gap={em(1)}>
    <Text font-family={mono} font-size={em(0.9)} color={blue}>POSITIONING / 03</Text>
    <Text font-size={em(2)} font-weight={bold} color={white}>A tiny processing pipeline</Text>
    <Spacer />
    <Diagram width={0.9} align-self="center" />
    <Spacer />
    <Text font-size={em(1)} color={white}>Positions are explicit. Text remains text-sized. The renderer receives finished geometry.</Text>
  </TextCol>
</Slide>
