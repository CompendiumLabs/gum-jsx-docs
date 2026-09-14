// Inherit shape paint separately from text color, with local overrides.
<Svg>
  <Box
    padding={px(20)}
    background={lightgray}
    color={slate}
    fill={blue}
    stroke={none}
    font-family={sans}
    font-size={px(20)}
  >
    <VStack gap={px(14)}>
      <Text>Text uses <Span color={red} font-weight={bold}>color</Span>.</Text>
      <HStack gap={px(14)}>
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
</Svg>
