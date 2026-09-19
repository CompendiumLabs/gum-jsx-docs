// Ellipses use independent radii along the allocated width and height.
<Box padding={em(1.25)} background={lightgray}>
  <HStack gap={em(1.25)} align="center">
    <Ellipse width={px(160)} height={px(80)} fill={blue} stroke={none} />
    <Ellipse width={px(80)} height={px(120)} fill={red} stroke={none} />
    <Ellipse
      width={px(160)}
      height={px(96)}
      radius={[0.4, px(24)]}
      fill={green}
      stroke={none}
    />
  </HStack>
</Box>
