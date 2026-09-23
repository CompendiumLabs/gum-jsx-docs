<Page title="Sunlight holds many colors" prompt="Mixed together, these colors look white.">
  <VStack width="fill" height="fill" align="fill" justify="center" gap={em(0.4)}>
    <Group width="fill" height={em(10)}>
      <Sun x={0.01} y={0.16} width={0.2} />
      <Line width={1} height={1} from={[0.18,0.53]} to={[0.47,0.53]} stroke="#B7C6D1" stroke-width={em(0.55)} />
      <Line width={1} height={1} from={[0.18,0.53]} to={[0.47,0.53]} stroke="white" stroke-width={em(0.36)} />
      <Polygon x={0.4} y={0.13} width={0.21} height={0.8} points={[[0.5,0],[1,1],[0,1]]}
        fill={airBlue} stroke="#719AB5" stroke-width={em(0.08)} />
      <Line width={1} height={1} from={[0.4525,0.53]} to={[0.5654,0.59]} stroke="white" stroke-width={em(0.24)} />
      {spectrum.map((paint,i) => <Line width={1} height={1} from={[0.5654+i*0.0013125,0.59+i*0.01]}
        to={[0.94,0.64+i*0.05]} stroke={paint} stroke-width={em(0.2)} />)}
    </Group>
    <HStack width="fill" justify="space-around">
      <Text>sunlight</Text><Text>a glass prism</Text><Text>colors!</Text>
    </HStack>
  </VStack>
</Page>
