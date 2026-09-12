// Use next's explicit units, decoration props, and flex on the allocated wrapper.
<Svg width={px(420)}>
  <Frame padding={px(18)} radius={px(12)}
    border_width={px(2)} border_color={blue} background={lightgray}>
    <HStack gap={px(16)} align="center">
      <RoundedRect width={px(72)} height={px(72)}
        radius={px(10)} fill={blue} stroke={none} />
      <VStack basis={0} grow={1} gap={px(6)}>
        <Text font_weight={bold}>The next API</Text>
        <Text text="Explicit sizing and small, composable elements." />
      </VStack>
    </HStack>
  </Frame>
</Svg>
