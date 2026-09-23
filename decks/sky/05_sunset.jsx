<Page title="Sunset: a longer trip through air" prompt="More blue spreads away. We see more reds and oranges." background="#FFF0E6">
  <VStack width="fill" height="fill" align="fill" justify="center" gap={em(0.5)}>
    <Group width="fill" height={em(10)}>
      <Rect x={0.18} y={0.16} width={0.77} height={0.70} fill="#F4D6C9" stroke="none" />
      <Sun x={0.01} y={0.29} width={0.16} paint={coral} />
      <Ray from={[0.17,0.59]} to={[0.86,0.67]} paint={coral} stroke-width={em(0.3)} />
      {[0.3,0.5,0.7].map(x => <Ray from={[x,0.59+(x-0.17)*0.116]} to={[x+0.05,0.21]} />)}
      <Eyes x={0.87} y={0.59} width={0.09} />
      <Text x={0.52} y={0.03} anchor={[0.5,0]} font-weight="bold">more air to travel through</Text>
      <Text x={0.015} y={0.91} font-size={em(0.9)}>Sun low in the sky</Text>
    </Group>
    <Text font-size={em(1.17)} width="fill" justify="center">These colors happen around sunset, before night.</Text>
  </VStack>
</Page>
