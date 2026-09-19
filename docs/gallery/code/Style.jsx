// Inherit shape paint separately from text color, with local overrides.
<Box
  font-size={px(20)}
  padding={em(1)}
  background={lightgray}
  color={slate}
  fill={blue}
  stroke={none}
  font-family={sans}
>
  <VStack gap={em(0.7)}>
    <Text>Text uses <Span color={red} font-weight={bold}>color</Span>.</Text>
    <HStack gap={em(0.7)}>
      <Square width={px(64)} />
      <Circle width={px(64)} fill={red} />
      <RoundedRect
        width={px(100)}
        height={px(64)}
        fill={none}
        stroke={green}
        stroke-width={px(3)}
      />
    </HStack>
  </VStack>
</Box>
