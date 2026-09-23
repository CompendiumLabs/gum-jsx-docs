<Page title="Air spreads blue light around" prompt="Blue light reaches our eyes from all across the sky." background="#EAF5FC">
  <HStack width="fill" height="fill" gap={em(1)} align="center">
    <Group width={em(22)} height={em(12)}>
      <Sun x={0} y={0.19} width={0.24} />
      <Ray from={[0.23,0.4]} to={[0.49,0.4]} paint="#D4B86A" />
      <Circle x={0.48} y={0.32} width={0.085} fill="#9BB8CF" stroke="none" />
      <Ray from={[0.55,0.4]} to={[0.84,0.4]} paint={coral} />
      {[[0.60,0.07],[0.86,0.13],[0.75,0.76],[0.30,0.73]].map(to => (
        <Ray from={[0.53,0.4]} to={to} />
      ))}
      <Eyes x={0.69} y={0.79} width={0.15} />
      <Text x={0.34} y={0.90} font-size={em(0.85)}>a tiny piece of air</Text>
    </Group>
    <Text grow={1} font-size={em(1.4)} font-weight="bold">Air spreads blue light more than red light.</Text>
  </HStack>
</Page>
