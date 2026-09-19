// Thick shafts stay behind arrow tips for every cap style and route shape.
const caps = ['butt', 'round', 'square']
const CapColumn = ({ cap }) => <VStack gap={em(0.75)}>
  <Text width={px(224)} text-align="center" font-family={mono}>{cap}</Text>
  <Group width={px(224)} height={px(140)}>
    {[24, 200].map(x => <Line from={[px(x), px(12)]} to={[px(x), px(128)]}
      stroke={gray} stroke-width={px(1)} stroke-dasharray={[px(3), px(4)]} />)}
    <Arrow from={[px(24), px(40)]} to={[px(200), px(40)]}
      stroke={slate} stroke-width={px(8)} stroke-linecap={cap}
      head-size={px(28)} head-width={0.8} head-style={{fill: blue}} />
    <Arrow from={[px(24), px(100)]} to={[px(200), px(100)]} start-head
      stroke={slate} stroke-width={px(8)} stroke-linecap={cap}
      head-size={px(28)} head-width={0.8} head-style={{fill: green}} />
  </Group>
</VStack>
return <TextBox width={px(760)} padding={em(1.5)} color={slate}>
  <TextCol gap={em(1.25)}>
    <Text font-size={em(1.75)} font-weight={bold}>Arrow tips, clean at every cap</Text>
    <Text font-size={em(0.875)}>The dashed guides mark the requested endpoints.</Text>
    <HStack gap={em(1.25)}>{caps.map(cap => <CapColumn cap={cap} />)}</HStack>
    <HStack gap={em(1.25)}>
      <VStack gap={em(0.75)}>
        <Text width={px(346)} text-align="center" font-family={mono}>curved / square caps</Text>
        <Group width={px(346)} height={px(180)}>
          <Arrow points={[[0.08, 0.75], [0.4, 0.2], [0.66, 0.8], [0.92, 0.25]]}
            curve start-head stroke={slate} stroke-width={px(8)} stroke-linecap="square"
            head-size={px(28)} head-width={0.8} head-style={{fill: blue}} />
        </Group>
      </VStack>
      <VStack gap={em(0.75)}>
        <Text width={px(346)} text-align="center" font-family={mono}>rounded / round caps</Text>
        <Group width={px(346)} height={px(180)}>
          <Arrow points={[[0.08, 0.8], [0.08, 0.25], [0.65, 0.25], [0.65, 0.8], [0.92, 0.8]]}
            radius={em(1.125)} start-head stroke={slate} stroke-width={px(8)} stroke-linecap="round"
            head-size={px(28)} head-width={0.8} head-style={{fill: green}} />
        </Group>
      </VStack>
    </HStack>
  </TextCol>
</TextBox>
