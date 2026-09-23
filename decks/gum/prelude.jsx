// Shared theme and components. Slide measures the header and allocates its body;
// stacks and frames handle the rest. Only the outer viewport and base type use px.
const ink = '#162F36'
const muted = '#536C70'
const paper = '#F5F3EC'
const line = '#D6DFD9'
const teal = '#167C73'
const mint = '#DDECE4'
const peach = '#F6E4D7'

function Page({ number, topic, title, subtitle, children }) {
  return (
    <Svg width={px(1280)} height={px(720)} font-size={px(24)} color={ink} background={paper}>
      <Slide
        width="fill"
        height="fill"
        title={
          <VStack gap={em(0.4)}>
            <Label>GUM / {topic}</Label>
            <Text font-size={em(2)} font-weight="bold">{title}</Text>
          </VStack>
        }
      >
        <TextCol gap={em(1)}>
          <Text color={muted}>{subtitle}</Text>
          {children}
          <HStack font-size={em(0.65)} color={muted}>
            <Text grow={1}>GUM / A LANGUAGE FOR FIGURES</Text>
            <Text>{number} / 5</Text>
          </HStack>
        </TextCol>
      </Slide>
    </Svg>
  )
}

function Panel({ title, note, background = 'white', children, ...props }) {
  return (
    <Frame
      grow={1}
      padding={em(1)}
      border-width={0}
      border-radius={em(0.6)}
      background={background}
      {...props}
    >
      <TextCol height="fill" gap={em(1)}>
        <Label>{title}</Label>
        <TextCol grow={1} gap={em(1)}>
          {children}
        </TextCol>
        {note && (
          <Text font-size={em(0.95)} color={muted}>
            {note}
          </Text>
        )}
      </TextCol>
    </Frame>
  )
}

function Label({ children }) {
  return (
    <Text font-size={em(0.65)} font-weight="bold" color={teal}>
      {children}
    </Text>
  )
}

function Code({ children }) {
  return (
    <Text
      font-family={mono}
      font-size={em(0.75)}
      line-height={em(1.4)}
      whitespace="pre"
      wrap={false}
    >
      {children}
    </Text>
  )
}

function Metric({ value, label, ...props }) {
  return (
    <Frame padding={em(0.75)} background={mint} border-width={0} border-radius={em(0.5)} {...props}>
      <VStack gap={em(0.5)}>
        <Text font-size={em(1.75)} font-weight="bold" color={teal}>{value}</Text>
        <Text font-size={em(0.8)} color={muted}>{label}</Text>
      </VStack>
    </Frame>
  )
}
