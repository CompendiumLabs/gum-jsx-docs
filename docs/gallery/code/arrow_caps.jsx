// Thick shafts stay behind arrow tips for every cap style and route shape.
const caps = ['butt', 'round', 'square']
const CapColumn = ({ cap }) => <VStack shrink={1} basis={em(14)} gap={em(0.75)} align="fill">
  <Text text-align="center" font-family={mono}>{cap}</Text>
  <Group aspect={1.6}>
    {[0.1, 0.9].map(x => <Line from={[x, 0.08]} to={[x, 0.92]}
      stroke={gray} stroke-width={em(0.0625)} stroke-dasharray={[em(0.2), em(0.25)]} />)}
    <Arrow from={[0.1, 0.28]} to={[0.9, 0.28]}
      stroke={slate} stroke-width={em(0.5)} stroke-linecap={cap}
      head-size={em(1.75)} head-width={0.8} head-style={{fill: blue}} />
    <Arrow from={[0.1, 0.72]} to={[0.9, 0.72]} start-head
      stroke={slate} stroke-width={em(0.5)} stroke-linecap={cap}
      head-size={em(1.75)} head-width={0.8} head-style={{fill: green}} />
  </Group>
</VStack>
return <TextBox fit padding={em(1.5)} color={slate}>
  <TextCol gap={em(1.25)}>
    <Text font-size={em(1.75)} font-weight={bold}>Arrow tips, clean at every cap</Text>
    <Text font-size={em(0.875)}>The dashed guides mark the requested endpoints.</Text>
    <HStack gap={em(1.25)}>{caps.map(cap => <CapColumn cap={cap} />)}</HStack>
    <HStack gap={em(1.25)}>
      <VStack grow={1} basis={em(14)} gap={em(0.75)}>
        <Text width="fill" text-align="center" font-family={mono}>curved / square caps</Text>
        <Group aspect={1.92}>
          <Arrow points={[[0.08, 0.75], [0.4, 0.2], [0.66, 0.8], [0.92, 0.25]]}
            curve start-head stroke={slate} stroke-width={em(0.5)} stroke-linecap="square"
            head-size={em(1.75)} head-width={0.8} head-style={{fill: blue}} />
        </Group>
      </VStack>
      <VStack grow={1} basis={em(14)} gap={em(0.75)}>
        <Text width="fill" text-align="center" font-family={mono}>rounded / round caps</Text>
        <Group aspect={1.92}>
          <Arrow points={[[0.08, 0.8], [0.08, 0.25], [0.65, 0.25], [0.65, 0.8], [0.92, 0.8]]}
            radius={em(1.125)} start-head stroke={slate} stroke-width={em(0.5)} stroke-linecap="round"
            head-size={em(1.75)} head-width={0.8} head-style={{fill: green}} />
        </Group>
      </VStack>
    </HStack>
  </TextCol>
</TextBox>
