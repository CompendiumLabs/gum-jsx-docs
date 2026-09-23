<Page title="Air is made of tiny pieces" prompt="These pieces are much too small for our eyes to see.">
  <HStack width="fill" height="fill" align="center" gap={em(1.6)}>
    <Group width={em(15)} aspect={1.2}>
      <Circle x={0.1} y={0.02} width={0.76} fill={airBlue} stroke="none" />
      {[[0.28,0.22],[0.57,0.18],[0.41,0.39],[0.67,0.46],[0.25,0.60],[0.51,0.66]].map(([x,y]) => (
        <Group x={x} y={y} width={0.09} aspect={1.5}>
          <Circle x={0} width={0.65} fill="#7EA6C3" stroke="none" />
          <Circle x={0.4} width={0.65} fill="#A9C7D9" stroke="none" />
        </Group>
      ))}
      <Text x={0.48} y={0.88} anchor="center" font-size={em(0.85)}>Pretend we can zoom in!</Text>
    </Group>
    <VStack grow={1} gap={em(0.65)}>
      <Text font-size={em(1.45)} font-weight="bold">Air is all around us.</Text>
      <Text font-size={em(1.45)}>Sunlight meets the tiny pieces of air.</Text>
    </VStack>
  </HStack>
</Page>
