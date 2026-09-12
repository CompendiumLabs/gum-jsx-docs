// Ellipses use independent radii along the allocated width and height.
<Svg>
  <Box padding={px(20)} background={lightgray}>
    <HStack gap={px(20)} align="center">
      <Ellipse width={px(160)} height={px(80)} fill={blue} stroke={none} />
      <Ellipse width={px(80)} height={px(120)} fill={red} stroke={none} />
      <Ellipse width={px(160)} height={px(96)} radius={{ x: 0.4, y: px(24) }}
        fill={green} stroke={none} />
    </HStack>
  </Box>
</Svg>
