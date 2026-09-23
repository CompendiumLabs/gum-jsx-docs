<Page title="The sky’s color story" prompt="Blue days, red sunsets… and rainbows!">
  <HStack width="fill" gap={em(0.7)} align="center">
    {[['day', 'Day'], ['sunset', 'Sunset'], ['night', 'Night']].map(([mode, label]) => (
      <VStack grow={1} align="fill" gap={em(0.5)}>
        <Scene mode={mode} width="fill" />
        <Text width="fill" justify="center" font-size={em(1.2)} font-weight="bold">{label}</Text>
      </VStack>
    ))}
  </HStack>
</Page>
