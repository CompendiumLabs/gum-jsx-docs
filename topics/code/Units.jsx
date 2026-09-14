// Compare pixel, em, and fractional lengths under a definite 360px content width.
<Svg width={px(400)} font-size={px(20)}>
  <Box width={1} padding={em(1)} background={lightgray}>
    <VStack width={1} gap={em(0.5)}>
      <Text font-size={em(0.7)}>px(120): 120 pixels</Text>
      <Rect width={px(120)} height={px(24)} fill={blue} stroke={none} />
      <Text font-size={em(0.7)}>em(8): 160 pixels at a 20px font</Text>
      <Rect width={em(8)} height={px(24)} fill={red} stroke={none} />
      <Text font-size={em(0.7)}>0.5: half of the 360px content width</Text>
      <Rect width={0.5} height={px(24)} fill={green} stroke={none} />
    </VStack>
  </Box>
</Svg>
