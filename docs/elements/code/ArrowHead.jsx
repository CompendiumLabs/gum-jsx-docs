// Curvature on filled, open, and single-barbed heads, keeping their endpoints fixed.
<Box padding={em(1.5)}>
  <HStack gap={em(1.5)}>
    {[0, 0.35, 0.7, 1].map(curve =>
      <VStack gap={em(1)}>
        <Text align-self="center" font-family={mono}>curve={curve}</Text>
        <ArrowHead
          width={px(100)}
          height={px(70)}
          tip={[0.9, 0.5]}
          head-size={px(64)}
          head-width={1}
          curve={curve}
          fill={blue}
          stroke={none}
        />
        <ArrowHead
          width={px(100)}
          height={px(70)}
          tip={[0.9, 0.5]}
          head-size={px(64)}
          head-width={1}
          curve={curve}
          open
          stroke={blue}
          stroke-width={px(3)}
          stroke-linejoin="round"
        />
        <ArrowHead
          width={px(100)}
          height={px(70)}
          tip={[0.9, 0.5]}
          head-size={px(64)}
          head-width={1}
          curve={curve}
          open
          barb="left"
          stroke={blue}
          stroke-width={px(3)}
        />
      </VStack>
    )}
  </HStack>
</Box>
