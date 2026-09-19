<Svg width={px(640)} height={px(270)} font_size={px(18)}>
  <Box padding={em(1.5)} border_width={px(2)} border_color={blue} radius={em(1)}>
    <VStack gap={em(1)}>
      <Text font_size={em(1.6)} font_weight={bold}>Make something 😊</Text>
      <Text line_height={em(1.45)}>
        Edit this gum JSX and the SVG updates as you type.
      </Text>
      <HStack gap={em(1)} grow={1} align="stretch">
        <RoundedRect grow={1} radius={em(1)} fill={blue} stroke={none} />
        <Circle fill={red} stroke={none} />
        <RoundedRect grow={1} radius={em(1)} fill={green} stroke={none} />
      </HStack>
    </VStack>
  </Box>
</Svg>
