// Shared design and components. The CLI evaluates this file once per deck.
const ink = '#162F36'
const muted = '#536C70'
const paper = '#F5F3EC'
const line = '#D6DFD9'
const teal = '#167C73'
const mint = '#DDECE4'
const orange = '#CF582E'
const peach = '#F6E4D7'

function Page({ number, topic, title, subtitle, children }) {
  return (
    <Svg width={px(1280)} height={px(720)} font-size={px(24)} color={ink} background={paper}>
      <Group>
        <Rect x={px(64)} y={px(45)} width={px(24)} height={px(5)} fill={teal} stroke="none" />
        <Text x={px(100)} y={px(35)} font-size={px(17)} font-weight="bold" color={teal}>
          GUM / {topic}
        </Text>
        <Text x={px(64)} y={px(85)} width={px(1152)} font-size={px(52)} font-weight="bold">
          {title}
        </Text>
        <Text x={px(66)} y={px(160)} width={px(1130)} font-size={px(24)} color={muted}>
          {subtitle}
        </Text>
        {children}
        <Rect x={px(64)} y={px(652)} width={px(1152)} height={px(1)} fill={line} stroke="none" />
        <Text x={px(64)} y={px(672)} font-size={px(15)} color={muted}>
          GUM / A LANGUAGE FOR FIGURES
        </Text>
        <Text x={px(1216)} y={px(670)} anchor={['end', 'start']} font-size={px(17)} color={teal}>
          {number} / 5
        </Text>
      </Group>
    </Svg>
  )
}

function Panel({ x, y = 230, width, height = 382, background = '#FFFFFF', children }) {
  return (
    <Group x={px(x)} y={px(y)} width={px(width)} height={px(height)}>
      <RoundedRect width="fill" height="fill" border-radius={px(16)} fill={background} stroke="none" />
      {children}
    </Group>
  )
}

function Label({ x = 28, y = 24, children, ...props }) {
  return (
    <Text x={px(x)} y={px(y)} font-size={px(15)} font-weight="bold" color={teal} {...props}>
      {children}
    </Text>
  )
}

function Code({ x = 28, y = 68, size = 20, children }) {
  return (
    <Text
      x={px(x)}
      y={px(y)}
      font-family={mono}
      font-size={px(size)}
      line-height={em(1.45)}
      whitespace="pre"
      wrap={false}
      color={ink}
    >
      {children}
    </Text>
  )
}

function Metric({ value, label, ...props }) {
  return (
    <Frame padding={px(20)} background={mint} border-width={0} border-radius={px(12)} {...props}>
      <VStack gap={px(14)}>
        <Text font-size={px(42)} font-weight="bold" color={teal}>{value}</Text>
        <Text font-size={px(19)} color={muted}>{label}</Text>
      </VStack>
    </Frame>
  )
}
