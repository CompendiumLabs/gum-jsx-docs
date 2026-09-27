<Page title="Sunset: a longer trip through air" prompt="More blue spreads away. We see more reds and oranges." background="#FFF0E6">
  <VStack width="fill" height="fill" align="fill" justify="center" gap={em(0.5)}>
    <Group width="fill" height={em(10)}>
      <Rect pos={[0.18, 0.16]} anchor="start" width={0.77} height={0.70} fill="#F4D6C9" stroke="none" />
      <Sun pos={[0.01, 0.29]} anchor="start" width={0.16} paint={coral} />
      <Ray from={[0.17,0.59]} to={[0.86,0.67]} paint={coral} stroke-width={em(0.3)} />
      {[0.3,0.5,0.7].map(x => <Ray from={[x,0.59+(x-0.17)*0.116]} to={[x+0.05,0.21]} />)}
      <Eyes pos={[0.87, 0.59]} anchor="start" width={0.09} />
      <Text pos={[0.52, 0.03]} anchor={[0.5,0]} font-weight="bold">more air to travel through</Text>
      <Text pos={[0.015, 0.91]} anchor="start" font-size={em(0.9)}>Sun low in the sky</Text>
    </Group>
    <Text font-size={em(1.17)} width="fill" justify="center">These colors happen around sunset, before night.</Text>
  </VStack>
</Page>
