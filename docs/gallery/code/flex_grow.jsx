// The shape row grows into the height left under the text; the rounded
// rectangles then split the width the circle leaves.
<Box
  font-size={px(18)}
  padding={em(1.5)}
  border-width={px(2)}
  border-color={blue}
  border-radius={em(1)}
>
  <VStack gap={em(1)}>
    <Text font-size={em(1.6)} font-weight={bold}>Make something 😊</Text>
    <Text line-height={em(1.45)}>
      Edit this gum JSX and the SVG updates as you type.
    </Text>
    <HStack height={em(8)} gap={em(1)}>
      <RoundedRect grow={1} border-radius={em(1)} fill={blue} stroke={none} />
      <Circle fill={red} stroke={none} />
      <RoundedRect grow={1} border-radius={em(1)} fill={green} stroke={none} />
    </HStack>
  </VStack>
</Box>
