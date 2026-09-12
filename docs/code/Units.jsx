// Compare pixel, em, and fractional lengths under a definite 360px content width.
<Svg width={px(400)}>
  <Box width={1} padding={px(20)} font_size={px(20)} background="#f7f8fa">
    <VStack width={1} gap={px(10)}>
      <Text font_size={px(14)}>px(120): 120 pixels</Text>
      <Rect width={px(120)} height={px(24)} fill="#317969" stroke="none" />
      <Text font_size={px(14)}>em(8): 160 pixels at a 20px font</Text>
      <Rect width={em(8)} height={px(24)} fill="#d77c45" stroke="none" />
      <Text font_size={px(14)}>0.5: half of the 360px content width</Text>
      <Rect width={0.5} height={px(24)} fill="#476c9b" stroke="none" />
    </VStack>
  </Box>
</Svg>
