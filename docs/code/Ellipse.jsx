// Ellipses use independent radii along the allocated width and height.
<Svg>
  <Box padding={px(20)} background="#f7f8fa">
    <HStack gap={px(20)} align="center">
      <Ellipse width={px(160)} height={px(80)} fill="#2c7567" stroke="none" />
      <Ellipse width={px(80)} height={px(120)} fill="#486d9c" stroke="none" />
      <Ellipse width={px(160)} height={px(96)} radius={{ x: 0.4, y: px(24) }}
        fill="#bb6748" stroke="none" />
    </HStack>
  </Box>
</Svg>
